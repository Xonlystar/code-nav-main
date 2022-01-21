import type { BasicLayoutProps as ProLayoutProps } from '@ant-design/pro-layout'
import ProLayout from '@ant-design/pro-layout'
import React, { useEffect } from 'react'
import type { Dispatch } from 'umi'
import { connect, history, Link } from 'umi'
import { AppstoreOutlined, GlobalOutlined, HomeOutlined, UserOutlined } from '@ant-design/icons'
import { Button, notification, Result } from 'antd'
import Authorized from '@/utils/Authorized'
import RightContent from '@/components/GlobalHeader/RightContent'
import GlobalFooter from '@/components/GlobalFooter'
import type { CurrentUser } from '@/models/user'
import type { ConnectState } from '@/models/connect'
import { stringify } from 'querystring'
import { closeNoticeWatcher, openNoticeWatcher } from '@/services/notice'
import defaultSettings from '../../../config/defaultSettings'
import logo from '@/assets/logo.png'
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

  const defaultRoutes = {
    routes: [
      {
        path: '/',
        name: '主页',
        icon: <HomeOutlined />
      },
      {
        path: '/resources',
        name: '资源',
        icon: <AppstoreOutlined />
      },
      {
        path: '/wish',
        name: '世界',
        icon: <GlobalOutlined />
      },
      {
        path: '/account/info',
        name: '个人',
        icon: <UserOutlined />
      }
    ]
  }

  return (
    <ProLayout
      logo={logo}
      {...props}
      route={defaultRoutes}
      {...defaultSettings}
      layout="top"
      navTheme="light"
      onMenuHeaderClick={() => history.push('/')}
      menuItemRender={(menuItemProps, defaultDom) => {
        if (menuItemProps.isUrl || !menuItemProps.path) {
          return defaultDom
        }
        return <Link to={menuItemProps.path}>{defaultDom}</Link>
      }}
      footerRender={() => <GlobalFooter />}
      rightContentRender={() => <RightContent />}
    >
      <Authorized authority={authority} noMatch={noMatch}>
        {children}
      </Authorized>
    </ProLayout>
  )
}

export default connect(({ login, user }: ConnectState) => ({
  currentUser: user.currentUser,
  userId: login.userId,
  currentAuthority: login.currentAuthority
}))(BasicLayout)
