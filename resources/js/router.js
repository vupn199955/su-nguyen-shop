
import VueRouter from 'vue-router';
import Vue from 'vue';
import store from '@/store';
import User from '@/services/user.service'
// import Home from './components/Home.vue';
import Client from './views/client/index.vue';
import Admin from './views/admin/index.vue';
import LoginAdmin from './views/admin/Login.vue';

import adminRoute from './views/admin/router';
Vue.use(VueRouter);

async function isAuthenticated() {
    try {
        if (store.getters.isAuth) return true;

        const token = Vue.$cookies.get('admin_token');
        if (!token) return false;

        const { status, data } = await User.getCurrentUser();
        if (status === 200) {
            store.commit('setAuth', data.user);
            return true
        };
        return false;
    } catch(err) {
        console.log(err)
        return false;
    }
}

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            component: Client
        },
        {
            path: '/login-admin',
            name: 'login-admin',
            component: LoginAdmin
        },
        {
            path: '/admin',
            name: 'admin',
            component: Admin,
            children: adminRoute,
            meta: {
                requiresAuth: true,
            },
        },
    ],
});

router.beforeEach(async (to, from, next) => {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
        const isAuth = await isAuthenticated();
        if (isAuth) {
            return next()
        }
        return next(`/login-admin?redirect=${to.path}`);
    }
    return next();
})

export default router;