import { List, Card, Descriptions } from 'antd'
import type { FC } from 'react'
import { useState, useEffect } from 'react'
import { connect } from 'umi'
import type { ResourceType } from '@/models/resource'
import ResourceCard from '@/components/ResourceCard'
import type { CurrentUser } from '@/models/user'
import type { ConnectState } from '@/models/connect'

interface MyInviteProps {
  currentUser?: CurrentUser
}

interface MyInviteState {
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

const MyInvite: FC<MyInviteProps> = props => {
  const [loading, setLoading] = useState(true)
  const [state, setState] = useState<MyInviteState>({
    resources: [],
    total: 0,
    reviewStatus: undefined
  })

  useEffect(() => {
    setLoading(false)
    console.log(123, props)
    setState({ ...state })
  }, [])

  return (
    <Card title="邀请好友">
      <Descriptions title="我要邀请" column={1}>
        <Descriptions.Item label="邀请方式">复制邀请链接，通过此链接首次登录即为邀请成功</Descriptions.Item>
        <Descriptions.Item label="点击生成"> </Descriptions.Item>
      </Descriptions>
      <Descriptions title="邀请成功" />
      <List<ResourceType>
        grid={listGrid}
        loading={loading}
        pagination={{
          total: state.total,
          onChange: () => {}
        }}
        dataSource={[]}
        renderItem={item => {
          return (
            <List.Item key={item._id}>
              <ResourceCard resource={item} showReview showEdit />
            </List.Item>
          )
        }}
      />
    </Card>
  )
}

export default connect(({ user }: ConnectState) => ({
  currentUser: user.currentUser
}))(MyInvite)
