import cloudbase from '@cloudbase/js-sdk'
import { request } from 'umi'

// 测试环境 id
export const TEST_ENV_ID = 'test'
export const envId = TEST_ENV_ID

export const defineCloudConfig = () => {
  let app: any = {}

  let auth: any = {}

  if (process.env.NODE_ENV === 'development') {
    app.database = (): any => {
      return {
        collection: () => {}
      }
    }
    auth.signOut = (): any => {}
    auth.getLoginState = (): any => {}
    auth.anonymousAuthProvider = (): any => {
      return {
        signIn: () => {}
      }
    }
    auth.customAuthProvider = (): any => {
      return {
        signIn: () => {}
      }
    }
    // 覆盖云函数调用
    app.callFunction = ({ name, data }: any) => {
      return new Promise((resolve, reject) => {
        request<any>(`/test/${name}`, {
          method: 'POST',
          data: { ...(data || {}) },
          requestType: 'form'
        })
          .then(res => {
            if (res && res.data && res.data.response_data) {
              const result = JSON.parse(res.data.response_data)
              resolve({ result, requestId: res.requestId })
            } else {
              reject(res)
            }
          })
          .catch(err => reject(err))
      })
    }
  } else {
    app = cloudbase.init({
      env: envId
    })
    auth = app.auth({
      persistence: 'local'
    })
  }
  return { app, auth }
}
