import { createRouter, createWebHistory } from 'vue-router'

import Coaches from '../pages/CoachesPage'
import Requests from '../pages/RequestsPage'
import Authorization from '../pages/AuthPage'

const routes = [
  {
    path: '/coaches',
    name: 'Coaches',
    component: Coaches
  },
  {
    path: '/requests',
    name: 'Requests',
    component: Requests
  },
  {
    path: '/auth',
    name: 'Authorization',
    component: Authorization
  },

]

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: 'active',
  linkExactActiveClass: 'active'
})

export default router
