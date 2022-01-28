import { Card, Descriptions, message, Modal, Tag, Button, Badge, Typography, Avatar, Form, Input, Row, Col } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import type { FC } from 'react'
import { useState, useEffect } from 'react'
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
import PicUploader from '@/components/PicUploader'
import moment from 'moment'
import type { WholeTagsMap } from '@/models/tag'

type MyInfoProps = {
  dispatch: Dispatch
  currentUser: CurrentUser
  userId: string | undefined
  wholeTagsMap: WholeTagsMap
} & RouteChildrenProps

type MyInfoState = {
  showEditModal: boolean
  interests: string[]
  nickName: string
  avatarUrl: string
  profile: string
  email: string
  submitting: boolean
}

/**
 * 可设置的最大兴趣数
 */
const MAX_INTEREST_NUM = 15

const formItemLayout = {
  labelCol: {
    xs: {
      span: 4
    }
  }
}

const MyInfo: FC<MyInfoProps> = props => {
  const [form] = Form.useForm()
  const { dispatch, userId, currentUser = {}, wholeTagsMap } = props
  const [state, setState] = useState<MyInfoState>({
    showEditModal: false,
    nickName: '随波逐流',
    avatarUrl: 'https://636f-codenav-8grj8px727565176-1256524210.tcb.qcloud.la/img/1642990828343-267438',
    profile: '随波逐流的痛苦你们不懂',
    interests: [],
    email: 'onlyxhb@qq.com',
    submitting: false
  })

  useEffect(() => {
    dispatch({
      type: 'user/fetchCurrent',
      payload: {
        userId
      }
    }).then(() => {
      setState({
        ...state,
        interests: currentUser.interests ?? []
      })
    })
  }, [])

  const openInterestsModal = () => {
    setState({
      ...state,
      interests: currentUser.interests ?? [],
      showEditModal: true
    })
  }

  const handleSave = async () => {
    if (state.interests.length > MAX_INTEREST_NUM) {
      message.error(`最多设置 ${MAX_INTEREST_NUM} 个兴趣！`)
      return
    }

    setState({
      ...state,
      submitting: true
    })
    console.log(520, state)
    const res = await updateUserInterests(state.interests)
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
    setState({
      ...state,
      showEditModal: false,
      submitting: false
    })
  }

  const doModalCancel = () => {
    setState({
      ...state,
      showEditModal: false,
      interests: currentUser.interests ?? []
    })
  }

  const onChange = (checkedKeys: any) => {
    setState({
      ...state,
      interests: checkedKeys
    })
  }

  const handleValuesChange = (values: any) => {
    setState({
      ...state,
      ...values
    })
  }

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
          <Button icon={<EditOutlined />} onClick={openInterestsModal} type="link">
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
      <Modal title="修改信息" visible={state.showEditModal} footer={null} onCancel={doModalCancel}>
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
          <Form.Item label="昵称" name="nickName" labelAlign="left">
            <Input allowClear placeholder="最多12个字" />
          </Form.Item>
          <Form.Item label="头像" name="avatarUrl" labelAlign="left">
            <PicUploader />
          </Form.Item>
          <Form.Item label="个人简介" name="profile" labelAlign="left">
            <Input allowClear placeholder="请填写个人简介" />
          </Form.Item>
          <Form.Item label="邮箱" name="email" labelAlign="left">
            <Input allowClear placeholder="填写邮箱后接受通知会更及时哦" />
          </Form.Item>
          <Form.Item label="兴趣" name="interests" labelAlign="left">
            <SelectTags
              style={{ width: '100%' }}
              allTags={wholeTagsMap.allTags}
              groupTags={wholeTagsMap.groupTags}
              maxTagsNumber={MAX_INTEREST_NUM}
              onChange={onChange}
            />
          </Form.Item>
          <Form.Item label="" style={{ marginTop: '32px', rowGap: '0px' }}>
            <Row justify="end" style={{ marginLeft: '-12px', marginRight: '-12px', rowGap: '0px' }}>
              <Col style={{ paddingLeft: '12px', paddingRight: '12px' }}>
                <Button onClick={doModalCancel} type="default">
                  取消
                </Button>
              </Col>
              <Col span={12} style={{ paddingLeft: '12px', paddingRight: '12px' }}>
                <Button block onClick={handleSave} type="primary">
                  {state.submitting ? '提交中' : '提交'}
                </Button>
              </Col>
            </Row>
          </Form.Item>
        </Form>
      </Modal>
    </GridContent>
  ) : (
    <NoAuth />
  )
}

export default connect(({ user, login, tag }: ConnectState) => ({
  currentUser: user.currentUser,
  userId: login.userId,
  wholeTagsMap: tag.wholeTagsMap
}))(MyInfo)
