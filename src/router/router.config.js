/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/',
    component: () => import('@/views/layouts/index'),
    redirect: '/home',
    meta: {
      title: '首页',
      keepAlive: false
    },
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import('@/views/home/index'),
        meta: { title: '首页', keepAlive: false, noAuth: false }
      },
      {
        path: '/me',
        name: 'Me',
        component: () => import('@/views/me/index'),
        meta: { title: '关于我', keepAlive: false, noAuth: true }
      },
      {
        path: '/wallet',
        name: 'Wallet',
        component: () => import('@/views/me/wallet'),
        meta: { title: '钱包', keepAlive: false }
      },
      {
        path: '/edit',
        name: 'Edit',
        component: () => import('@/views/me/edit'),
        meta: { title: '编辑', keepAlive: false }
      },
      {
        path: '/share',
        name: 'Share',
        component: () => import('@/views/me/share'),
        meta: { title: '我的分享', keepAlive: false }
      },
      {
        path: '/communication',
        name: 'Communication',
        component: () => import('@/views/communication/index'),
        meta: { title: '我的交流', keepAlive: false }
      },
      {
        path: '/detail/:id',
        name: 'Detail',
        component: () => import('@/views/detail/index'),
        meta: { title: '详情', keepAlive: false }
      },
      {
        path: '/sharecode',
        name: 'ShareCode',
        component: () => import('@/views/share/index'),
        meta: { title: '详情', keepAlive: false, noAuth: false }
      },
      {
        path: '/phone',
        name: 'Phone',
        component: () => import('@/views/share/phone'),
        meta: { title: '绑定手机号', keepAlive: false, noAuth: false }
      },
      {
        path: '/appointment/:id',
        name: 'Appointment',
        component: () => import('@/views/communication/appointment'),
        meta: { title: '约见对话', keepAlive: false }
      },
      {
        path: '/meet/:id/status',
        name: 'Status',
        component: () => import('@/views/communication/status'),
        meta: { title: '约见对话', keepAlive: false }
      }
    ]
  }
]
