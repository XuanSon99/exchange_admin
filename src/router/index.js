import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: () => import('../views/Dashboard.vue'),
    meta: {
      show: true
    }
  },
  {
    path: '/user',
    name: 'User',
    component: () => import('../views/User.vue'),
    meta: {
      show: true
    }
  },
  {
    path: '/user/:id',
    name: 'Infomation',
    component: () => import('../views/DetailUser.vue'),
    meta: {
      show: true
    }
  },
  {
    path: '/buy-order',
    component: () => import('../views/BuyOrder.vue'),
    meta: {
      show: true
    }
  },
  {
    path: '/buy-order/:id',
    component: () => import('../views/DetailBuyOrder.vue'),
    meta: {
      show: true
    }
  },
  {
    path: '/sell-order',
    component: () => import('../views/SellOrder.vue'),
    meta: {
      show: true
    }
  },
  {
    path: '/sell-order/:id',
    component: () => import('../views/DetailSellOrder.vue'),
    meta: {
      show: true
    }
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('../views/Admin.vue'),
    meta: {
      show: true
    }
  },
  {
    path: '/status',
    component: () => import('../views/Status.vue'),
    meta: {
      show: true
    }
  },
  {
    path: '/notification',
    component: () => import('../views/Notification.vue'),
    meta: {
      show: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem("access_token")) next({ name: 'Home' })
      next()
    },
  },
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.name !== 'Login' && !localStorage.getItem("access_token")) next({ name: 'Login' })
  next()
})

export default router
