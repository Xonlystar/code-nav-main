import { Card, Descriptions, message, Modal, Tag, Button, Badge, Typography, Avatar } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import { Component } from 'react'
import { GridContent } from '@ant-design/pro-layout'
import type { Dispatch } from 'umi'
import { connect } from 'umi'
import type { RouteChildrenProps } from 'react-router'
import type { CurrentUser } from '@/models/user'
import type { ConnectState } from '@/models/connect'
import { getLevel } from '@/utils/businessUtils'
import { updateUserInterests } from '@/services/user'
import { NoAuth } from '@/components/NoAuth'
import SelectTags from '@/components/SelectTags'
import moment from 'moment'
import type { WholeTagsMap } from '@/models/tag'

type MyInfoProps = {
  dispatch: Dispatch
  currentUser: CurrentUser
  userId: string
  wholeTagsMap: WholeTagsMap
} & RouteChildrenProps

type MyInfoState = {
  showInterestsModal: boolean
  currInterests: string[]
  interestsSubmitting: boolean
}

/**
 * 可设置的最大兴趣数
 */
const MAX_INTEREST_NUM = 5

class MyInfo extends Component<MyInfoProps, MyInfoState> {
  state: MyInfoState = {
    showInterestsModal: false,
    currInterests: [],
    interestsSubmitting: false
  }

  componentDidMount() {
    const { dispatch, userId, currentUser = {} } = this.props
    dispatch({
      type: 'user/fetchCurrent',
      payload: {
        userId
      }
    }).then(() => {
      this.setState({
        currInterests: currentUser.interests ?? []
      })
    })
  }

  openInterestsModal = () => {
    const { currentUser } = this.props
    this.setState({
      currInterests: currentUser.interests ?? [],
      showInterestsModal: true
    })
  }

  saveInterests = async () => {
    const { dispatch, userId } = this.props
    const { currInterests } = this.state

    if (currInterests.length > MAX_INTEREST_NUM) {
      message.error(`最多设置 ${MAX_INTEREST_NUM} 个兴趣！`)
      return
    }

    this.setState({
      interestsSubmitting: true
    })
    const res = await updateUserInterests(currInterests)
    if (res) {
      message.success('保存成功')
      dispatch({
        type: 'user/fetchCurrent',
        payload: {
          userId
        }
      })
    } else {
      message.error('保存失败')
    }
    this.setState({
      showInterestsModal: false,
      interestsSubmitting: false
    })
  }

  doModalCancel = () => {
    const { currentUser } = this.props

    this.setState({
      showInterestsModal: false,
      currInterests: currentUser.interests ?? []
    })
  }

  onChange = (checkedKeys: any) => {
    this.setState({
      currInterests: checkedKeys
    })
  }

  render() {
    const { showInterestsModal, currInterests, interestsSubmitting } = this.state
    const { currentUser = {}, wholeTagsMap } = this.props
    const dataLoading = !(currentUser && Object.keys(currentUser).length)
    const score = currentUser && currentUser.score ? currentUser.score : 0
    const level = getLevel(score)

    const interestsTagView =
      currentUser?.interests && currentUser.interests.length > 0 ? (
        currentUser.interests.map(key => {
          return (
            <Tag key={key} style={{ cursor: 'pointer' }}>
              {key}
            </Tag>
          )
        })
      ) : (
        <div style={{ color: '#999' }}>暂无，设置后推荐更精准哦</div>
      )

    return currentUser._id ? (
      <GridContent>
        <Card loading={dataLoading}>
          <Badge.Ribbon className="hidden">
            <Card.Meta
              avatar={<Avatar size={96} style={{ border: '1px solid #eee' }} src={currentUser?.avatarUrl} />}
              title={
                <div>
                  <Typography.Title level={4}>{currentUser?.nickName}</Typography.Title>
                  <Tag color={level.color} style={{ marginRight: 0, margin: '8px 0', userSelect: 'none' }}>
                    {level.name}
                  </Tag>
                </div>
              }
            />
          </Badge.Ribbon>
        </Card>
        <div style={{ marginTop: '16px' }} />
        <Card
          title="信息"
          extra={
            <Button icon={<EditOutlined />} onClick={this.openInterestsModal} type="link">
              编辑
            </Button>
          }
        >
          <Descriptions column={1} colon={false} labelStyle={{ width: '100px', marginBottom: '8px' }}>
            <Descriptions.Item label="积分">{currentUser?.score}</Descriptions.Item>
            <Descriptions.Item label="鱼币">{currentUser?.coin}</Descriptions.Item>
            <Descriptions.Item label="兴趣">{interestsTagView}</Descriptions.Item>
            <Descriptions.Item label="邮箱">{currentUser?.email}</Descriptions.Item>
            <Descriptions.Item label="个人简介">{currentUser?.profile}</Descriptions.Item>
            <Descriptions.Item label="所在地区">{currentUser?.province || '暂无'}</Descriptions.Item>
            <Descriptions.Item label="注册时间">
              {moment(currentUser?._createTime).format('YYYY-MM-DD mm:DD:hh')}
            </Descriptions.Item>
          </Descriptions>
        </Card>
        <Modal
          title="修改信息"
          visible={showInterestsModal}
          okText={interestsSubmitting ? '提交中' : '提交'}
          okButtonProps={{ loading: interestsSubmitting, disabled: interestsSubmitting }}
          onOk={this.saveInterests}
          onCancel={this.doModalCancel}
        >
          <SelectTags
            style={{ width: '100%' }}
            value={currInterests}
            allTags={wholeTagsMap.allTags}
            groupTags={wholeTagsMap.groupTags}
            maxTagsNumber={MAX_INTEREST_NUM}
            onChange={this.onChange}
          />
        </Modal>
      </GridContent>
    ) : (
      <NoAuth />
    )
  }
}

export default connect(({ user, login, tag }: ConnectState) => ({
  currentUser: user.currentUser,
  userId: login.userId,
  wholeTagsMap: tag.wholeTagsMap
}))(MyInfo)
