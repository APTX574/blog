import { createRouter, createWebHistory } from 'vue-router'
import home from '../views/home.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: home
  },

  {
    path: '/write',
    name: 'write',
    component: ()=>import('../views/write')
  },
  {
    path: '/show',
    name: 'show',
    component: ()=>import('../views/show')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
