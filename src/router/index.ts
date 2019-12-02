import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home.vue';
import { authGuard } from '@/plugins/auth'

import store from '@/store'

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/settings',
    name: 'settings',
    component: () => import(/* webpackChunkName Settings */'@/views/Settings.vue'),
    beforeEnter: authGuard
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName Login */'@/views/Login.vue')
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
