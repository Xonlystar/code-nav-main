export default [
  {
    path: '/',
    component: '../layouts/LoadingLayout',
    routes: [
      {
        exact: true,
        name: '免费资源大全',
        path: '/free',
        redirect: '/rd/?rid=28ee4e3e603717e2077bf1e519069419'
      },
      {
        authority: ['user', 'admin'],
        exact: true,
        name: '写文章',
        component: './Testing',
        path: '/write'
      },
      {
        path: '/user',
        component: '../layouts/UserLayout',
        routes: [
          {
            name: '登录',
            exact: true,
            path: '/account/login',
            component: './Account/login'
          }
        ]
      },
      {
        path: '/op',
        authority: ['admin'],
        component: './Testing',
        routes: [
          {
            exact: true,
            path: '/op',
            redirect: '/op/resource'
          },
          {
            exact: true,
            path: '/op/resource',
            name: '资源管理',
            component: './Testing'
          },
          {
            exact: true,
            path: '/op/comment',
            name: '评论管理',
            component: './Testing'
          },
          {
            exact: true,
            path: '/op/reply',
            name: '回复管理',
            component: './Testing'
          },
          {
            exact: true,
            path: '/op/wish',
            name: '心愿管理',
            component: './Testing'
          },
          {
            exact: true,
            path: '/op/report',
            name: '举报管理',
            component: './Testing'
          },
          {
            exact: true,
            path: '/op/cloudPicture',
            name: '图库管理',
            component: './Testing'
          },
          {
            exact: true,
            path: '/op/topic',
            name: '专区管理',
            component: './Testing'
          },
          {
            exact: true,
            path: '/op/notice',
            name: '公告管理',
            component: './Testing'
          },
          {
            exact: true,
            path: '/op/contest',
            name: '比赛管理',
            component: './Testing'
          },
          {
            exact: true,
            path: '/op/prize',
            name: '奖品管理',
            component: './Testing'
          },
          {
            exact: true,
            path: '/op/userPrize',
            name: '兑奖管理',
            component: './Testing'
          },
          {
            exact: true,
            path: '/op/taskReward',
            name: '任务管理',
            component: './Testing'
          },
          {
            exact: true,
            path: '/op/utils',
            name: '运营管理',
            component: './Testing'
          },
          {
            exact: true,
            component: './Testing'
          }
        ]
      },
      {
        path: '/',
        component: '../layouts/BasicLayout',
        routes: [
          {
            name: '发现优质编程学习资源',
            exact: true,
            path: '/',
            component: './Recommend'
          },
          {
            name: '个人中心',
            authority: ['user', 'admin'],
            path: '/account',
            routes: [
              {
                exact: true,
                path: '/account',
                redirect: '/account/info'
              },
              {
                exact: true,
                name: '个人资料',
                path: '/account/info',
                component: './Account/MyInfo'
              },
              {
                exact: true,
                name: '我的收藏',
                path: '/account/like',
                component: './Account/LikeResources'
              },
              {
                exact: true,
                name: '推荐记录',
                path: '/account/recommend',
                component: './Account/Recommend'
              },
              {
                exact: true,
                name: '消息通知',
                path: '/account/message',
                component: './Account/MyMessages'
              },

              {
                exact: true,
                name: '我的心愿',
                path: '/account/wish',
                component: './Account/Wish'
              },
              {
                exact: true,
                name: '邀请好友',
                path: '/account/invite',
                component: './Account/Invite'
              },
              {
                exact: true,
                name: '积分记录',
                path: '/account/score',
                component: './Account/Score'
              }
            ]
          },
          {
            exact: true,
            name: '学习路线',
            path: '/roadmap',
            component: './Testing',
            authority: ['user', 'admin']
          },
          {
            exact: true,
            name: '资源大全',
            path: '/resources',
            component: './Resources'
          },
          {
            exact: true,
            name: '资源专区',
            path: '/topics',
            component: './Resources'
          },
          {
            exact: true,
            name: '专题',
            path: '/topic/:key',
            component: './Resources',
            authority: ['user', 'admin']
          },
          {
            exact: true,
            name: '付费好课',
            path: '/class',
            component: './Testing',
            authority: ['user', 'admin']
          },
          {
            name: '资源专栏',
            path: '/resources/:category',
            component: './Resources',
            authority: ['user', 'admin']
          },
          {
            exact: true,
            name: '资源详情',
            path: '/rd',
            component: './ResourceDetail',
            hideInMenu: true
          },
          {
            exact: true,
            name: '我要推荐',
            path: '/addResource',
            component: './AddResource',
            authority: ['user', 'admin'],
            hideInMenu: true
          },
          {
            exact: true,
            name: '激励榜',
            path: '/ranking',
            component: './World/Ranking'
          },
          {
            exact: true,
            name: '小挑战',
            path: '/contest',
            component: './Testing'
          },
          {
            exact: true,
            name: '挑战信息',
            path: '/contest/d',
            component: './Testing'
          },
          {
            exact: true,
            name: '参与挑战',
            path: '/contest/submit',
            component: './Testing'
          },
          {
            exact: true,
            name: '挑战提交信息',
            path: '/contest/submit/d',
            component: './Testing'
          },
          {
            exact: true,
            name: '世界',
            path: '/world',
            redirect: '/wish'
          },
          {
            exact: true,
            name: '心愿墙',
            path: '/wish',
            component: './World/Wish'
          },
          {
            exact: true,
            name: '心愿详情',
            path: '/wish/d',
            component: './Testing'
          },
          {
            exact: true,
            name: '找伙伴',
            path: '/friend',
            component: './World/Friend',
            authority: ['user', 'admin']
          },
          {
            exact: true,
            name: '讨论角',
            path: '/discuss',
            component: './Testing',
            authority: ['user', 'admin']
          },
          {
            exact: true,
            name: '一起做',
            path: '/cooperate',
            component: './Testing',
            authority: ['user', 'admin']
          },
          {
            exact: true,
            name: '兑奖区',
            path: '/prize',
            component: './Testing'
          },
          {
            exact: true,
            name: '代币记录',
            path: '/userCoin',
            component: './Testing',
            authority: ['user', 'admin']
          },
          {
            exact: true,
            name: '兑换记录',
            path: '/userPrize',
            component: './Testing',
            authority: ['user', 'admin']
          },
          {
            exact: true,
            name: '推荐成功',
            path: '/addSucceed',
            component: './AddSucceed',
            authority: ['user', 'admin'],
            hideInMenu: true
          },
          {
            exact: true,
            name: '审核资源',
            path: '/review/resource',
            component: './ReviewCenter/ReviewResource',
            authority: ['admin']
          },
          {
            exact: true,
            name: '审核评论',
            path: '/review/comment',
            component: './ReviewCenter/ReviewComment',
            authority: ['admin']
          },
          {
            exact: true,
            name: '审核举报',
            path: '/review/report',
            component: './ReviewCenter/ReviewReport',
            authority: ['admin']
          },
          {
            exact: true,
            component: './404'
          }
        ]
      }
    ]
  },
  {
    component: './404',
    exact: true
  }
]
