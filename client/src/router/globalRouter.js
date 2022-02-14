import { createRouter, createWebHistory } from 'vue-router'

import Coaches from '../pages/CoachesPage'
import CoachDetails from '../components/coaches/CoachDetails'
import Requests from '../pages/RequestsPage'
import Authorization from '../pages/AuthPage'
import SignUp from '../pages/SignUpPage'
// import store from '../store/globalStore'


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
    component: Requests,
    meta: { requiredAuth: true }
  },
  {
    path: '/sign-in',
    name: 'Authorization',
    component: Authorization,
    meta: { requiredUnauth: true }
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

/* router.beforeEach((to, from) => {
  const isAuth = !!store.getters['getMyLogin']

  if (to.meta.requiredAuth && !isAuth) {
    next('/sign-in')
  } else if (to.meta.requiredUnauth && isAuth) {
    next('/')
  }
  next()
}) */

export default router
