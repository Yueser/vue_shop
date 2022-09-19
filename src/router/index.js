import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "@/views/Login";

import Home from "@/views/Home";
import Welcome from "@/components/home/Welcome";
import Users from "@/components/home/Users";
import Roles from "@/components/home/Roles";
import Rights from "@/components/home/Rights";
import Reports from "@/components/home/Reports";
import Params from "@/components/home/Params";
import Orders from "@/components/home/Orders";
import Goods from "@/components/home/Goods";
import Categories from "@/components/home/Categories";

Vue.use(VueRouter)

const routes = [
    {path: '/', redirect: '/login'},
    {path: '/login', component: Login},
    {
        path: '/home', component: Home, redirect: '/welcome', children: [
            {path: '/welcome', component: Welcome},
            {path: '/users', component: Users},
            {path: '/reports', component: Reports},
            {path: '/rights', component: Rights},
            {path: '/roles', component: Roles},
            {path: '/params', component: Params},
            {path: '/orders', component: Orders},
            {path: '/goods', component: Goods},
            {path: '/categories', component: Categories},
        ]
    }
]

const router = new VueRouter({
    routes
})
router.beforeEach((to, from, next) => {
    if (to.path === '/login') return next();
    const token = window.sessionStorage.getItem('token');
    if (!token) return next('/login');
    next();
})
export default router
