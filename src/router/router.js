import { createRouter, createWebHistory } from 'vue-router'

import Layouts from '../layouts/index.vue'
import Home from '../views/home/index.vue'
import Admin from '../views/admin/index.vue'

const routes =  [
  {
    path: '/',
    component: Layouts,
    children: [
      {
        path: '/',
        redirect: '/home'
      },
      {
        path: '/home',
        name: 'Home',
        component: Home,
      },
      {
        path: '/admin',
        name: 'Admin',
        component: Admin,
      }
    ]
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router;
