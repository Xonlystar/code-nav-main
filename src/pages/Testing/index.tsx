import type { FC } from 'react'
import { connect } from 'umi'
import type { ConnectState } from '@/models/connect'

const Testing: FC<any> = () => {
  return <div>hello world</div>
}

export default connect(({ user }: ConnectState) => ({
  currentUser: user.currentUser
}))(Testing)
