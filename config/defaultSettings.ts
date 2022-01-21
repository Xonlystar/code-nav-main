import type { Settings as ProSettings } from '@ant-design/pro-layout'

type DefaultSettings = Partial<ProSettings> & {
  pwa: boolean
}

const proSettings: DefaultSettings = {
  navTheme: 'light',
  primaryColor: '#1890ff',
  layout: 'top',
  contentWidth: 'Fluid',
  fixedHeader: true,
  fixSiderbar: false,
  colorWeak: false,
  title: '编程导航',
  pwa: false,
  headerHeight: 48,
  iconfontUrl: '',
  splitMenus: false,
  menuRender: false
}

export type { DefaultSettings }

export default proSettings
