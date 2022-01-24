import type { BasicLayoutProps as ProLayoutProps, MenuDataItem } from '@ant-design/pro-layout'
import ProLayout from '@ant-design/pro-layout'
import React, { useEffect } from 'react'
import type { Dispatch } from 'umi'
import { connect, history, Link } from 'umi'
import { Timeline, Space, Modal, Menu, Button, Dropdown, notification, Result } from 'antd'
import {
  CustomerServiceOutlined,
  ExperimentOutlined,
  BugOutlined,
  MessageOutlined,
  HistoryOutlined,
  GithubOutlined
} from '@ant-design/icons'
import Authorized from '@/utils/Authorized'
import { CHANGE_LOG } from '@/constant'
import RightContent from '@/components/GlobalHeader/RightContent'
import GlobalFooter from '@/components/GlobalFooter'
import type { CurrentUser } from '@/models/user'
import type { ConnectState } from '@/models/connect'
import logo from '@/assets/logo.png'
import { stringify } from 'querystring'
import { closeNoticeWatcher, openNoticeWatcher } from '@/services/notice'
import defaultSettings from '../../../config/defaultSettings'
import menu from '../../../config/menu'
import './index.less'

const noMatch = (
  <Result
    status={403}
    title="登录后即可访问"
    extra={
      <Button type="primary" size="large">
        <Link
          to={{
            pathname: '/user/login',
            search: stringify({
              redirect: window.location.href
            })
          }}
        >
          一键登录
        </Link>
      </Button>
    }
  />
)

export interface BasicLayoutProps extends ProLayoutProps {
  route: ProLayoutProps['route'] & {
    authority: string[]
  }
  dispatch: Dispatch
  userId?: string
  currentAuthority: string
  currentUser: CurrentUser
}

const BasicLayout: React.FC<BasicLayoutProps> = props => {
  const {
    dispatch,
    children,
    route,
    location = {
      pathname: '/'
    },
    userId,
    currentUser
  } = props

  const [modal, contextHolder] = Modal.useModal()
  const [changelogModal, setChangelogModal] = React.useState<boolean>(false)

  const handleClick = (e: any) => {
    switch (e.key) {
      case 'features':
        modal.success({
          title: '最新版本 v0.10.1',
          content: '- 支持修改头像和昵称'
        })
        break
      case 'feedback':
        window.open('https://support.qq.com/products/303921', '_blank')
        break
      case 'contactUs':
        window.open('https://doc.code-nav.cn/author', '_blank')
        break
      case 'changeLog':
        setChangelogModal(true)
        break
      case 'sourceCode':
        window.open('https://github.com/liyupi/code-nav', '_blank')
        break
      default:
        break
    }
  }

  const dropMenu = (
    <Menu onClick={handleClick}>
      <Menu.Item key="features" icon={<ExperimentOutlined />}>
        最新功能
      </Menu.Item>
      <Menu.Item key="feedback" icon={<BugOutlined />}>
        意见反馈
      </Menu.Item>
      <Menu.Item key="contactUs" icon={<MessageOutlined />}>
        联系我们
      </Menu.Item>
      <Menu.Item key="changeLog" icon={<HistoryOutlined />}>
        更新记录
      </Menu.Item>
      <Menu.Item key="sourceCode" icon={<GithubOutlined />}>
        本站源码
      </Menu.Item>
    </Menu>
  )

  useEffect(() => {
    if (dispatch) {
      dispatch({
        type: 'tag/get'
      })
    }
    // 公告监听
    openNoticeWatcher(notice => {
      const { title, content } = notice
      notification.info({
        message: title,
        description: content,
        top: 64,
        duration: 10
      })
    })
    return () => {
      closeNoticeWatcher()
    }
  }, [])

  useEffect(() => {
    if (dispatch && userId && !currentUser._id) {
      dispatch({
        type: 'user/fetchCurrent',
        payload: {
          userId
        }
      })
    }
  }, [])

  // get current page needed authority
  let authority

  route.routes?.forEach(r => {
    if (r.path === location.pathname) {
      authority = r.authority
    }
  })

  const menuDataRender = (menuList: MenuDataItem[]): MenuDataItem[] => {
    return menuList.map(item => {
      const localItem = {
        ...item,
        children: item.children ? menuDataRender(item.children) : undefined
      }
      return Authorized.check(item.authority, localItem, null) as MenuDataItem
    })
  }

  return (
    <ProLayout
      {...props}
      {...defaultSettings}
      logo={logo}
      className="basic-layout"
      onMenuHeaderClick={() => history.push('/')}
      menuItemRender={(menuItemProps, defaultDom) => {
        if (menuItemProps.isUrl || !menuItemProps.path) {
          return defaultDom
        }
        return <Link to={menuItemProps.path}>{defaultDom}</Link>
      }}
      footerRender={() => <GlobalFooter />}
      menuDataRender={() => menuDataRender(menu)}
      rightContentRender={() => <RightContent />}
    >
      <Authorized authority={authority} noMatch={noMatch}>
        {children}
        {contextHolder}
        <Dropdown overlay={dropMenu} placement="topRight" className="basic-affix">
          <Button type="primary" shape="circle" style={{ width: '52px', height: '52px' }}>
            <CustomerServiceOutlined style={{ fontSize: '21px' }} />
          </Button>
        </Dropdown>
        <Modal title="更新记录" visible={changelogModal} footer={null} onCancel={() => setChangelogModal(false)}>
          <Timeline>
            {CHANGE_LOG.map((item: any) => (
              <Timeline.Item key={item.time}>
                <Space size={24}>
                  <>{item.time}</>
                  <>{item.value}</>
                </Space>
              </Timeline.Item>
            ))}
          </Timeline>
        </Modal>
      </Authorized>
    </ProLayout>
  )
}

export default connect(({ login, user }: ConnectState) => ({
  currentUser: user.currentUser,
  userId: login.userId,
  currentAuthority: login.currentAuthority
}))(BasicLayout)
