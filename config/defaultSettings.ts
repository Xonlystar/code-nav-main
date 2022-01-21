import type { Settings as ProSettings } from '@ant-design/pro-layout'

type DefaultSettings = Partial<ProSettings> & {
  pwa: boolean
}

const proSettings: DefaultSettings = {
  navTheme: 'light',
  headerTheme: 'light',
  primaryColor: '#1890ff',
  layout: 'mix',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  title: '编程导航',
  pwa: false,
  headerHeight: 48,
  iconfontUrl: '',
  splitMenus: true
}

export type { DefaultSettings }

export default proSettings
