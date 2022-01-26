import { Button, Empty, List, Card, Form, Select } from 'antd'
import type { FC } from 'react'
import { useState, useEffect } from 'react'
import { connect, Link } from 'umi'
import type { ResourceType } from '@/models/resource'
import ResourceCard from '@/components/ResourceCard'
import { searchResourcesByPage } from '@/services/resource'
import type { CurrentUser } from '@/models/user'
import type { ConnectState } from '@/models/connect'

const { Option } = Select

interface AddResourcesProps {
  currentUser?: CurrentUser
}

interface AddResourcesState {
  resources?: ResourceType[]
  total: number
  reviewStatus: number
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

const AddResources: FC<AddResourcesProps> = props => {
  const { currentUser } = props
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(true)
  const [state, setState] = useState<AddResourcesState>({
    resources: [],
    total: 0,
    reviewStatus: 0
  })

  /**
   * 加载我推荐的资源
   */
  const loadAddResources = (pageNum: number, pageSize: number) => {
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
    loadAddResources(1, DEFAULT_PAGE_SIZE)
  }, [])

  const handleValuesChange = () => {
    console.log(111)
  }

  return (
    <Card title="推荐记录">
      <Form
        form={form}
        layout="horizontal"
        style={{ width: '153px' }}
        initialValues={{
          orderKey: '_createTime',
          ...state
        }}
        labelAlign="left"
      >
        <Form.Item label="" name="reviewStatus" labelAlign="left">
          <Select placeholder="" onChange={handleValuesChange} allowClear>
            <Option value={0}>审核中</Option>
            <Option value={1}>已发布</Option>
            <Option value={2}>拒绝</Option>
          </Select>
        </Form.Item>
      </Form>
      <List<ResourceType>
        grid={listGrid}
        loading={loading}
        pagination={{
          showSizeChanger: true,
          defaultPageSize: DEFAULT_PAGE_SIZE,
          total: state.total,
          pageSizeOptions: [DEFAULT_PAGE_SIZE.toString(), '12', '24'],
          onChange: (pageNum, pageSize) => {
            if (pageSize) {
              loadAddResources(pageNum, pageSize)
            }
          }
        }}
        dataSource={state.resources}
        renderItem={item => {
          return (
            <List.Item key={item._id}>
              <ResourceCard resource={item} showReview showEdit />
            </List.Item>
          )
        }}
        locale={{
          emptyText: (
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="您还没有推荐过资源哦">
              <Link to="/addResource">
                <Button type="primary" size="large">
                  推荐资源得积分
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
}))(AddResources)
