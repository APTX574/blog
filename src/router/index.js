import {createRouter, createWebHistory} from 'vue-router'
import home from '../views/home.vue'

const routes = [
    {
        path: '/',
        name: 'home',
        component: home
    },
    {
        path: '/setting',
        name: 'setting',
        component: () => import('../views/setting')
    },

    {
        path: '/write',
        name: 'write',
        component: () => import('../views/write')
    },
    {
        path: '/show',
        name: 'show',
        component: () => import('../views/show')
    },
    {
        path: '/register',
        name: 'register',
        component: () => import('../views/register')
    },
    {
        path: '/discover',
        name: 'discover',
        component: () => import('../views/discover')
    },
    {
        path: '/search',
        name: 'search',
        component: () => import('../views/search')
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
