import axios from 'axios'
import { CLOUD_FUNCTION_HOST } from '@/constant'
import { TEST_ENV_ID, envId, defineCloudConfig } from '@/utils/env'

const { app, auth } = defineCloudConfig()

/**
 * 匿名登录
 * @return {Promise<void>}
 */
export async function tcbLogin() {
  if (envId === TEST_ENV_ID) {
    return
  }
  // 1. 建议登录前先判断当前是否已经登录
  let loginState = await auth.getLoginState()
  if (!loginState) {
    // 2. 匿名登录
    await auth.anonymousAuthProvider().signIn()
    loginState = await auth.getLoginState()
    console.log('tcbLogin', loginState)
  }
}

/**
 * 自定义登录
 * @param captcha
 */
export async function tcbCustomLogin(captcha: any) {
  let loginState = await auth.getLoginState()
  if (!loginState || loginState.loginType !== 'CUSTOM') {
    if (!captcha) {
      console.error('no captcha!')
      return loginState
    }
    const data = await axios
      .get(`${CLOUD_FUNCTION_HOST}/login`, { params: { captcha } })
      .then(res => {
        return res.data
      })
      .catch(err => console.error(err))
    if (data === -403) {
      console.error('访问太过频繁！')
      return loginState
    }
    if (!data.ticket) {
      console.error('ticket is null')
      return loginState
    }
    loginState = await auth.customAuthProvider().signIn(data.ticket)
    console.log('tcbCustomLogin', loginState)
  }
  return loginState
}

/**
 * 注销
 * @return {Promise<void>}
 */
export function tcbLogout() {
  if (process.env.NODE_ENV === 'development') return Promise.resolve()
  return auth.signOut()
}

export const getApp = () => {
  return app
}
