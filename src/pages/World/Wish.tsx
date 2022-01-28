import type { FC } from 'react'
import { useEffect, useState } from 'react'
import { PageContainer } from '@ant-design/pro-layout'
import { connect } from 'umi'
import type { ConnectState } from '@/models/connect'
import type { CurrentUser, SimpleUser } from '@/models/user'
import { listUserTotalRank } from '@/services/user'
import { Avatar, Button, List, Card, Form, Input } from 'antd'
import { HeartOutlined } from '@ant-design/icons'
import SelectTags from '@/components/SelectTags'
import type { WholeTagsMap } from '@/models/tag'

interface WishProps {
  currentUser: CurrentUser
  wholeTagsMap: WholeTagsMap
}

const DEFAULT_PAGE_SIZE = 10

/**
 * 可设置的最大兴趣数
 */
const MAX_INTEREST_NUM = 5

/**
 * 激励榜
 * @param props
 * @constructor
 */
const Wish: FC<WishProps> = props => {
  const [form] = Form.useForm()
  const { wholeTagsMap } = props
  const [userList, setUserList] = useState<SimpleUser[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  // 总榜
  useEffect(() => {
    setLoading(true)
    listUserTotalRank(DEFAULT_PAGE_SIZE)
      .then((data: any) => {
        setUserList(data)
      })
      .finally(() => setLoading(false))
  }, [])

  const handleValuesChange = () => {
    console.log(111)
  }

  return (
    <PageContainer
      title="💖 心愿墙"
      content={
        <>
          <p>找不到需要的资源？许个愿吧 ⭐️ 也欢迎帮他人实现愿望 ❤</p>
          <Button type="primary" icon={<HeartOutlined />}>
            许个心愿
          </Button>
        </>
      }
    >
      <Card>
        <Form
          layout="horizontal"
          form={form}
          onValuesChange={handleValuesChange}
          initialValues={{
            orderKey: '_createTime'
          }}
          labelAlign="left"
        >
          <Form.Item label="内容" name="reviewStatus" labelAlign="left">
            <Input placeholder="请输入" />
          </Form.Item>
          <Form.Item label="标签" name="tags" labelAlign="left">
            <SelectTags
              style={{ width: '100%' }}
              allTags={wholeTagsMap.allTags}
              groupTags={wholeTagsMap.groupTags}
              maxTagsNumber={MAX_INTEREST_NUM}
              onChange={handleValuesChange}
            />
          </Form.Item>
        </Form>
      </Card>
      <List
        loading={loading}
        dataSource={userList}
        renderItem={(item, index) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={item.avatarUrl} />}
              title={item.nickName}
              description={`积分：${item.score}`}
            />
            <div> TOP {index + 1}</div>
          </List.Item>
        )}
      />
    </PageContainer>
  )
}

export default connect(({ user, tag }: ConnectState) => ({
  currentUser: user.currentUser,
  wholeTagsMap: tag.wholeTagsMap
}))(Wish)
