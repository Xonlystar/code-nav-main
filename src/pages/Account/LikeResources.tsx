import type { FC } from 'react'
import { Button, Empty, List, Avatar, Card, Form } from 'antd'
import { ExportOutlined, StarFilled } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import { connect, Link } from 'umi'
import type { ResourceType } from '@/models/resource'
import type { CurrentUser } from '@/models/user'
import type { ConnectState } from '@/models/connect'
import type { GroupTag, WholeTagsMap } from '@/models/tag'
import { getUserLikeResourcesByPage } from '@/services/user'
import SelectTags from '@/components/SelectTags'

interface LikeResourcesProps {
  currentUser?: CurrentUser
  wholeTagsMap: WholeTagsMap
}

interface LikeResourcesState {
  resources?: ResourceType[]
  tags: any[]
  total: number
}

const pageSize = 6

const formItemLayout = {
  labelCol: {
    sm: {
      span: 4
    },
    lg: {
      span: 3
    },
    xl: {
      span: 2
    }
  },
  wrapperCol: {
    xs: {
      span: 24
    }
  }
}

const LikeResources: FC<LikeResourcesProps> = props => {
  const { currentUser, wholeTagsMap } = props
  const [form] = Form.useForm()
  const [groupTags] = useState<GroupTag[]>()
  const [loading, setLoading] = useState(true)
  const [state, setState] = useState<LikeResourcesState>({
    resources: [],
    total: 0,
    tags: []
  })

  /**
   * 加载我收藏的资源
   */
  const loadLikeResources = (pageNum: number) => {
    if (currentUser && currentUser._id) {
      setLoading(true)
      getUserLikeResourcesByPage(currentUser._id, pageSize, pageNum)
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
    loadLikeResources(1)
  }, [])

  const handleValuesChange = () => {
    console.log(111)
  }

  return (
    <Card title="收藏">
      <Form
        {...formItemLayout}
        form={form}
        onValuesChange={handleValuesChange}
        initialValues={{
          orderKey: '_createTime',
          ...state
        }}
        labelAlign="left"
      >
        <Form.Item label="" name="tags" labelAlign="left">
          <SelectTags
            placeholder="支持按标签搜索"
            allTags={wholeTagsMap.allTags}
            groupTags={groupTags ?? wholeTagsMap.groupTags}
            maxTagsNumber={5}
          />
        </Form.Item>
      </Form>
      <div style={{ marginTop: '16px' }} />
      <List<ResourceType>
        loading={loading}
        pagination={{
          showSizeChanger: false,
          pageSize,
          total: state.total,
          onChange: pageNum => loadLikeResources(pageNum)
        }}
        dataSource={state.resources}
        renderItem={(item: any) => {
          return (
            <List.Item
              key={item._id}
              actions={[
                <Button key="export" size="large" type="text" icon={<ExportOutlined />} />,
                <Button key="star" size="large" type="text" icon={<StarFilled style={{ color: 'gold' }} />} />
              ]}
            >
              <List.Item.Meta avatar={<Avatar src={item.icon} />} title={item.name} description={item.desc} />
            </List.Item>
          )
        }}
        locale={{
          emptyText: (
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="您还没有收藏的资源哦">
              <Link to="/recommend">
                <Button type="primary" size="large">
                  发现资源
                </Button>
              </Link>
            </Empty>
          )
        }}
      />
    </Card>
  )
}

export default connect(({ user, tag }: ConnectState) => ({
  wholeTagsMap: tag.wholeTagsMap,
  currentUser: user.currentUser
}))(LikeResources)
