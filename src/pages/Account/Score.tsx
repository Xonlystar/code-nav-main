import { List, Card } from 'antd'
import type { FC } from 'react'
import { useState, useEffect } from 'react'
import { connect } from 'umi'
import moment from 'moment'
import type { ResourceType } from '@/models/resource'
import { searchResourcesByPage } from '@/services/resource'
import type { CurrentUser } from '@/models/user'
import type { ConnectState } from '@/models/connect'

interface MyScoreProps {
  currentUser?: CurrentUser
}

interface MyScoreState {
  resources?: ResourceType[]
  total: number
}

const DEFAULT_PAGE_SIZE = 6
moment.locale('zh-cn')

const MyScore: FC<MyScoreProps> = props => {
  const { currentUser } = props
  const [loading, setLoading] = useState(true)
  const [state, setState] = useState<MyScoreState>({
    resources: [],
    total: 20
  })

  /**
   * 加载我推荐的资源
   */
  const loadMyScore = (pageNum: number, pageSize: number) => {
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
            // total: res.total,
            resources: res.data
          })
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }

  useEffect(() => {
    loadMyScore(1, DEFAULT_PAGE_SIZE)
  }, [])

  return (
    <Card title="积分记录">
      <List<ResourceType>
        loading={loading}
        itemLayout="horizontal"
        pagination={{
          defaultPageSize: DEFAULT_PAGE_SIZE,
          total: state.total,
          onChange: (pageNum, pageSize) => {
            if (pageSize) {
              loadMyScore(pageNum, pageSize)
            }
          }
        }}
        dataSource={state.resources}
        renderItem={item => {
          return (
            <List.Item className="message-list-item" onClick={() => {}}>
              <List.Item.Meta title="每日登录" description={<span style={{ color: 'red' }}>+1</span>} />
              <div style={{ fontSize: '14px', color: 'rgb(170, 170, 170)' }}>{moment(item._createTime).fromNow()}</div>
            </List.Item>
          )
        }}
      />
    </Card>
  )
}

export default connect(({ user }: ConnectState) => ({
  currentUser: user.currentUser
}))(MyScore)
