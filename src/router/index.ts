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

// router.beforeEach((to, from, next) => {
//   const nearestWithTitle = to.matched
//     .slice()
//     .reverse()
//     .find((r) => r.meta && r.meta.title);

//   // Find the nearest route element with meta tags.
//   const nearestWithMeta = to.matched
//     .slice()
//     .reverse()
//     .find((r) => r.meta && r.meta.metaTags);

//   const previousNearestWithMeta = from.matched
//     .slice()
//     .reverse()
//     .find((r) => r.meta && r.meta.metaTags);

//   // If a route with a title was found, set the document (page) title to that value.
//   if (nearestWithTitle) {
//     document.title = nearestWithTitle.meta.title
//   };

//   // Remove any stale meta tags from the document using the key attribute we set below.
//   Array
//     .from(document.querySelectorAll('[data-vue-router-controlled]'))
//     .map((el) => {
//       if (el.parentNode) {
//         el.parentNode.removeChild(el)
//       }
//     });

//   // Skip rendering meta tags if there are none.
//   if (!nearestWithMeta) {
//     return next()
//   };

//   // Turn the meta tag definitions into actual elements in the head.
//   nearestWithMeta.meta.metaTags.map((tagDef: any) => {
//     const tag = document.createElement('meta');

//     Object.keys(tagDef).forEach((key) => {
//       tag.setAttribute(key, tagDef[key]);
//     });

//     // We use this to track which meta tags we create, so we don't interfere with other ones.
//     tag.setAttribute('data-vue-router-controlled', '');

//     return tag;
//   })
//   // Add the meta tags to the document head.
//   .forEach((tag: any) => document.head.appendChild(tag));

//   next();
// });

export default router;
