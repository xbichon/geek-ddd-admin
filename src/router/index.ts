import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/layouts/Main/Index.vue'),
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('@/views/home/index.vue'),
          meta: { title: '首页' }
        },
        {
          path: 'manager',
          name: 'manager',
          children: [
            {
              path: 'department',
              name: 'manager-department',
              component: () => import('@/views/manager/department/index.vue'),
              meta: { title: '部门管理' }
            },
            {
              path: 'user',
              name: 'manager-user',
              component: () => import('@/views/manager/user/index.vue'),
              meta: { title: '用户管理' }
            },
          ]
        },
        {
          path: 'internship',
          name: 'internship',
          children: [
            {
              path: 'topic',
              name: 'internship-topic',
              component: () => import('@/views/internship/index.vue'),
              meta: { title: '选题管理' }
            },
          ]
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/Index.vue'),
    }
  ],
})

export default router
