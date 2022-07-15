import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: () => {
      return import('@/views/Home')
    }
  },
  {
    path: '/login',
    component: () => {
      return import('@/views/Login')
    }
  }
]

const router = new VueRouter({
  routes
})

export default router
