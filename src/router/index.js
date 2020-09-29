import Vue from 'vue'
import VueRouter from 'vue-router'
import LogIn from '../views/Log-In.vue'
import store from '@/store/index'

Vue.use(VueRouter)

export const routes = [
  {
    path: '/login',
    name: 'Log in',
    component: LogIn
  }
]

export const protectedRoutes = [
  {
    path: '/chat',
    name: 'Chat',
    component: () =>
      import(/* webpackChunkName: "chat" */ '../views/Chats.vue'),
    meta: {
      auth: true
    }
  },
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue'),
    meta: {
      auth: true
    }
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () =>
      import(/* webpackChunkName: "settings" */ '../views/Settings.vue'),
    meta: {
      auth: true
    }
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [...protectedRoutes, ...routes]
})

router.beforeEach(async (to, from, next) => {
  if (to.path === '/login' && store.getters['user/loggedIn']) {
    return next(false)
  }
  if (
    to.matched.some(route => route.meta.auth && !store.getters['user/loggedIn'])
  ) {
    return await autoLogIn(store, next)
  }
  return next()
})

const autoLogIn = async (store, next) => {
  try {
    await store.dispatch('user/fetchUser')
    next()
  } catch (error) {
    return next({ path: '/login' })
  }
}

export default router
