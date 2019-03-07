
const routes = [
  {
    path: '/',
    redirect: { name: 'inbox.index' }
  },
  {
    path: '/inbox',
    component: () => import('layouts/BaseLayout.vue'),
    children: [
      {
        path: '',
        name: 'inbox.index',
        component: () => import('pages/Inbox.vue')
      },
      {
        path: ':id',
        name: 'inbox.show',
        props: true,
        component: () => import('pages/Inbox.vue')
      }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
