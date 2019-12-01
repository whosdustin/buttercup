import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import { authGuard } from '@/plugins/auth'

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      title: 'Buttercup'
    },
  },
  {
    path: '/settings',
    name: 'settings',
    component: () => import(/* webpackChunkName Settings */'@/views/Settings.vue'),
    meta: {
      title: 'Settings | Buttercup'
    },
    beforeEnter: authGuard
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName Login */'@/views/Login.vue'),
    meta: {
      title: 'Login | Buttercup'
    }
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
