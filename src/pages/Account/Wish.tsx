import { Button, Empty, List, Card } from 'antd'
import { LightFilter, ProFormSelect } from '@ant-design/pro-form'
import { FilterOutlined } from '@ant-design/icons'
import type { FC } from 'react'
import { useState, useEffect } from 'react'
import { connect, Link } from 'umi'
import type { ResourceType } from '@/models/resource'
import ResourceCard from '@/components/ResourceCard'
import { searchResourcesByPage } from '@/services/resource'
import type { CurrentUser } from '@/models/user'
import type { ConnectState } from '@/models/connect'

interface MyWishProps {
  currentUser?: CurrentUser
}

interface MyWishState {
  resources?: ResourceType[]
  total: number
  reviewStatus: number | undefined
}

const listGrid = {
  gutter: 16,
  xs: 1,
  sm: 1,
  md: 2,
  lg: 2,
  xl: 2,
  xxl: 3
}

const DEFAULT_PAGE_SIZE = 6

const MyWish: FC<MyWishProps> = props => {
  const { currentUser } = props
  const [loading, setLoading] = useState(true)
  const [state, setState] = useState<MyWishState>({
    resources: [],
    total: 0,
    reviewStatus: undefined
  })

  /**
   * 加载我推荐的资源
   */
  const loadMyWish = (pageNum: number, pageSize: number) => {
    if (currentUser && currentUser._id) {
      setLoading(true)
      searchResourcesByPage({
        userId: currentUser._id,
        pageNum,
        pageSize
      })
        .then(res => {
          setState({
            ...state,
            total: res.total,
            resources: res.data
          })
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }

  useEffect(() => {
    loadMyWish(1, DEFAULT_PAGE_SIZE)
  }, [])

  const handleValuesChange = async (values: any) => {
    setState({
      ...state,
      ...values
    })
  }

  return (
    <Card title="心愿">
      <LightFilter
        initialValues={{ reviewStatus: state.reviewStatus }}
        bordered
        collapseLabel={<FilterOutlined />}
        onFinish={handleValuesChange}
      >
        <ProFormSelect
          name="reviewStatus"
          valueEnum={{
            0: '审核中',
            1: '已发布',
            2: '拒绝'
          }}
          placeholder="资源状态"
        />
      </LightFilter>
      <div style={{ marginTop: '16px' }} />
      <List<ResourceType>
        grid={listGrid}
        loading={loading}
        pagination={{
          defaultPageSize: DEFAULT_PAGE_SIZE,
          total: state.total,
          onChange: (pageNum, pageSize) => {
            if (pageSize) {
              loadMyWish(pageNum, pageSize)
            }
          }
        }}
        dataSource={[]}
        renderItem={item => {
          return (
            <List.Item key={item._id}>
              <ResourceCard resource={item} showReview showEdit />
            </List.Item>
          )
        }}
        locale={{
          emptyText: (
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="您还没有心愿哦">
              <Link to="/wish">
                <Button type="primary" size="large">
                  发布心愿
                </Button>
              </Link>
            </Empty>
          )
        }}
      />
    </Card>
  )
}

export default connect(({ user }: ConnectState) => ({
  currentUser: user.currentUser
}))(MyWish)
