import type { MenuDataItem } from '@ant-design/pro-layout'
import {
  HomeOutlined,
  AppstoreOutlined,
  GlobalOutlined,
  UserAddOutlined,
  ContainerOutlined,
  BookOutlined,
  LaptopOutlined,
  ToolOutlined,
  FieldBinaryOutlined,
  CodeOutlined,
  BranchesOutlined,
  CarryOutOutlined,
  UsergroupAddOutlined,
  DeploymentUnitOutlined,
  CoffeeOutlined,
  GiftOutlined,
  SelectOutlined,
  HeartOutlined,
  FrownOutlined,
  FunnelPlotOutlined,
  ProfileOutlined,
  UserOutlined,
  StarOutlined,
  CommentOutlined,
  ShareAltOutlined,
  DeleteColumnOutlined,
  HourglassOutlined,
  AuditOutlined
} from '@ant-design/icons'

/**
 * 菜单项
 */
export default [
  {
    path: '/',
    name: '主页',
    icon: <HomeOutlined />
  },
  {
    path: '/resources',
    name: '资源',
    icon: <AppstoreOutlined />,
    children: [
      {
        name: '找教程',
        path: '/topic/教程',
        icon: <ContainerOutlined />
      },
      {
        name: '找书籍',
        path: '/topic/书籍',
        icon: <BookOutlined />
      },
      {
        name: '找项目',
        path: '/topic/项目源码',
        icon: <LaptopOutlined />
      },
      {
        name: '工具箱',
        path: '/topic/工具',
        icon: <ToolOutlined />
      },
      {
        name: '必修基础',
        path: '/topic/basic',
        icon: <FieldBinaryOutlined />,
        children: [
          {
            name: '算法数据结构',
            path: '/topic/算法'
          },
          {
            name: '计算机系统',
            path: '/topic/系统'
          },
          {
            name: '计算机网络',
            path: '/topic/网络'
          },
          {
            name: '软件开发',
            path: '/topic/软件开发'
          }
        ]
      },
      {
        name: '编程语言',
        path: '/topic/language',
        icon: <CodeOutlined />,
        children: [
          {
            name: 'Java',
            path: '/topic/Java'
          },
          {
            name: 'Python',
            path: '/topic/Python'
          },
          {
            name: 'C++',
            path: '/topic/Cplusplus'
          },
          {
            name: 'C 语言',
            path: '/topic/C语言'
          },
          {
            name: 'Go 语言',
            path: '/topic/Go'
          },
          {
            name: 'JavaScript',
            path: '/topic/JavaScript'
          },
          {
            name: 'PHP',
            path: '/topic/PHP'
          },
          {
            name: 'C#',
            path: '/topic/csharp'
          }
        ]
      },
      {
        name: '领域方向',
        path: '/topic/domain',
        icon: <BranchesOutlined />,
        children: [
          {
            name: '前端',
            path: '/topic/前端'
          },
          {
            name: '后端',
            path: '/topic/后端'
          },
          {
            name: '人工智能',
            path: '/topic/人工智能'
          },
          {
            name: '大数据',
            path: '/topic/大数据'
          },
          {
            name: '云计算',
            path: '/topic/云计算'
          },
          {
            name: '物联网',
            path: '/topic/物联网'
          },
          {
            name: '软件测试',
            path: '/topic/测试'
          },
          {
            name: 'Android 开发',
            path: '/topic/Android'
          },
          {
            name: 'IOS 开发',
            path: '/topic/IOS'
          },
          {
            name: 'Linux 运维',
            path: '/topic/运维'
          },
          {
            name: '信息安全',
            path: '/topic/信息安全'
          },
          {
            name: '产品设计',
            path: '/topic/产品设计'
          },
          {
            name: '小程序',
            path: '/topic/小程序'
          },
          {
            name: '区块链',
            path: '/topic/区块链'
          }
        ]
      },
      {
        name: '求职宝典',
        path: '/topic/job',
        icon: <CarryOutOutlined />,
        children: [
          {
            name: '名企内推',
            path: '/topic/内推'
          },
          {
            name: '面试题解',
            path: '/topic/面试'
          },
          {
            name: '优秀面经',
            path: '/topic/面经'
          },
          {
            name: '竞赛证书',
            path: '/topic/证书'
          }
        ]
      },
      {
        name: '发现大神',
        path: '/topic/findGod',
        icon: <UsergroupAddOutlined />,
        children: [
          {
            name: '技术专家',
            path: '/topic/技术专家'
          },
          {
            name: '优质作者',
            path: '/topic/创作者'
          },
          {
            name: '技术团队',
            path: '/topic/技术团队'
          },
          {
            name: '交流社区',
            path: '/topic/交流社区'
          },
          {
            name: '创作专栏',
            path: '/topic/创作专栏'
          }
        ]
      },
      {
        name: '开发必备',
        path: '/topic/dev',
        icon: <DeploymentUnitOutlined />,
        children: [
          {
            name: '在线文档',
            path: '/topic/文档'
          },
          {
            name: '开发平台',
            path: '/topic/开发平台'
          },
          {
            name: '开发必备',
            path: '/topic/develop'
          }
        ]
      },
      {
        name: '程序人生',
        path: '/topic/life',
        icon: <CoffeeOutlined />,
        children: [
          {
            name: '新闻资讯',
            path: '/topic/新闻资讯'
          },
          {
            name: '学术研究',
            path: '/topic/学术研究'
          },
          {
            name: '职场进阶',
            path: '/topic/职场进阶'
          },
          {
            name: '自我修养',
            path: '/topic/自我修养'
          },
          {
            name: '猿生活',
            path: '/topic/生活'
          },
          {
            name: '猿音乐',
            path: '/topic/音乐'
          }
        ]
      },
      {
        path: '/topic/福利',
        icon: <GiftOutlined />,
        name: '福利'
      },
      {
        path: '/topics',
        icon: <SelectOutlined />,
        name: '全部专区'
      },
      {
        path: '/topics/:key'
      }
    ]
  },
  {
    path: '/world',
    name: '世界',
    icon: <GlobalOutlined />,
    children: [
      {
        path: '/wish',
        name: '心愿墙',
        icon: <HeartOutlined />
      },
      {
        path: '/friend',
        name: '找伙伴',
        icon: <FrownOutlined />
      },
      {
        path: '/discuss',
        name: '讨论角',
        icon: <FunnelPlotOutlined />
      },
      {
        path: '/ranking',
        name: '激励榜',
        icon: <ProfileOutlined />
      }
    ]
  },
  {
    path: '/account',
    name: '个人',
    icon: <UserAddOutlined />,
    authority: ['user', 'admin'],
    children: [
      {
        path: '/account/info',
        name: '个人资料',
        icon: <UserOutlined />
      },
      {
        path: '/account/like',
        name: '我的收藏',
        icon: <StarOutlined />
      },
      {
        path: '/account/recommend',
        name: '推荐记录',
        icon: <DeleteColumnOutlined />
      },
      {
        path: '/account/message',
        name: '消息通知',
        icon: <CommentOutlined />
      },
      {
        path: '/account/wish',
        name: '我的心愿',
        icon: <HourglassOutlined />
      },
      {
        path: '/account/invite',
        name: '邀请好友',
        icon: <ShareAltOutlined />
      },
      {
        path: '/account/score',
        name: '积分记录',
        icon: <AuditOutlined />
      }
    ]
  }
] as MenuDataItem[]
