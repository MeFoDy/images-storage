import Vue from 'vue';
import Router from 'vue-router';
import authService from '../services/authService';

import Authentication from '../components/pages/Auth/Auth.vue';
import Home from '../components/pages/Home/Home.vue';

import Header from '../components/elements/Header/Header.vue';

Vue.component('app-header', Header);

Vue.use(Router);

const router = new Router({
    routes: [
        {
            path: '/',
            name: 'Home',
            components: {
                default: Home,
                header: Header,
            },
            meta: {
                requireAuth: true,
            },
        },
        {
            path: '/login',
            name: 'Auth',
            component: Authentication,
        },
    ],
});
router.beforeEach((to, from, next) => {
    if (to.meta.requireAuth) {
        if (authService.user.authenticated) {
            next();
        } else {
            router.push('/login');
        }
    } else {
        next();
    }
});

export default router;

