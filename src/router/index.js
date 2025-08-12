import { createWebHistory, createRouter } from 'vue-router'

import Layouts from '../layouts'
import Home from '../view/Home'
import Test from '../view/Test'
import About from '../view/About'

const routes = [
  {
    path: '/',
    component: Layouts,
    children: [
      { path: '', component: Home },
      { path: '/test', component: Test },
    ]
  },
  { path: '/about', component: About },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
