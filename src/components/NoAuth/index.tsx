import { Button, Result } from 'antd'
import { Link } from 'umi'
import { stringify } from 'qs'
import type { FC } from 'react'

export const NoAuth: FC = () => {
  return (
    <Result
      status={403}
      title="登录后即可访问"
      extra={
        <Button type="primary" size="large">
          <Link
            to={{
              pathname: '/account/login',
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
}
