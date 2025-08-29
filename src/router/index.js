import { createWebHistory, createRouter } from 'vue-router'

import Layouts from '../layouts'
import Home from '../view/home'
import Test from '../view/test'
import About from '../view/about'
import Mp3 from '../view/mp3'
const routes = [
  {
    path: '/',
    component: Layouts,
    children: [
      { path: '', component: Home },
      { path: '/test', component: Test },
      { path: '/mp3', component: Mp3 },
    ]
  },
  { path: '/about', component: About },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
