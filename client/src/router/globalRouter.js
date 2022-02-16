import { createRouter, createWebHistory } from 'vue-router'

import Coaches from '../pages/CoachesPage'

const CoachDetails = () => import('../components/coaches/CoachDetails')
const Requests = () => import('../pages/RequestsPage')
const Authorization = () => import('../pages/AuthPage')
const SignUp = () => import('../pages/SignUpPage')

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
  {
    path: '/:notFound(.*)',
    name: 'NotFound',
    redirect: { name: 'Authorization' }
  }

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
