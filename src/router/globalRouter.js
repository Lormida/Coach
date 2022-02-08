import { createRouter, createWebHistory } from 'vue-router'

import Coaches from '../pages/CoachesPage'
import CoachDetails from '../components/coaches/CoachDetails'
import Requests from '../pages/RequestsPage'
import Authorization from '../pages/AuthPage'
import SignUp from '../pages/SignUpPage'


const routes = [
  {
    alias: '/',
    path: '/coaches',
    name: 'Coaches',
    component: Coaches,
  },
  {
    path: '/coaches/:id',
    name: 'CoachDetails',
    component: CoachDetails,
    props: true
  },
  {
    path: '/requests',
    name: 'Requests',
    component: Requests
  },
  {
    path: '/sign-in',
    name: 'Authorization',
    component: Authorization
  },
  {
    path: '/sign-up',
    name: 'Sign-Up',
    component: SignUp
  },

]

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: 'active',
  linkExactActiveClass: 'active'
})

export default router
