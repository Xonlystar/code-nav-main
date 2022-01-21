import type { Settings as ProSettings } from '@ant-design/pro-layout'
import React from 'react'
import { Link } from 'umi'
import { Button, Tooltip } from 'antd'
import HeaderSearch from '@/components/HeaderSearch'
import AvatarDropdown from './AvatarDropdown'
import styles from './index.less'

interface GlobalHeaderRightProps extends Partial<ProSettings> {
  theme?: ProSettings['navTheme'] | 'realDark'
}

const isMobile = () => {
  const deviceWidth = document.querySelector('body')?.offsetWidth
  return deviceWidth && deviceWidth < 480
}

const GlobalHeaderRight: React.SFC<GlobalHeaderRightProps> = props => {
  const { theme, layout } = props
  let className = styles.right

  if (theme === 'dark' && layout === 'top') {
    className = `${styles.right}  ${styles.dark}`
  }

  return (
    <div className={className}>
      {!isMobile() && (
        <>
          <div style={{ width: '40vw' }}>
            <HeaderSearch placeholder="全站搜索编程资源" />
          </div>
          <Link to="/addResource/">
            <Tooltip title="推荐资源，收获积分和人气" placement="bottomRight">
              <Button type="primary">推荐</Button>
            </Tooltip>
          </Link>
        </>
      )}
      <AvatarDropdown />
    </div>
  )
}

export default GlobalHeaderRight
