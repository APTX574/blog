import {createRouter, createWebHistory} from 'vue-router'
import home from '../views/home.vue'

const routes = [
    {
        path: '/home',
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
    },

]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})
// router.beforeEach((to, from, next)=>{
//     const list = ['/home', '/write', 'setting'];
//     if (list.indexOf(to.name) !== -1&&window.userId===undefined) {
//         this.$alert('请点击登录界面', '还未登录', {
//             confirmButtonText: '确定',
//             callback: () => {
//                 this.$message({
//                     type: 'warning',
//                     message: `请点击登录`
//                 });
//             }
//         })
//         router.replace('/discover')
//     }else{
//         next();
//     }
// })

export default router
