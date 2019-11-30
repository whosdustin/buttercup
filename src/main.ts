import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import '@fortawesome/fontawesome-free/js/all'
import './assets/main.styl';

import { Auth0Plugin } from './plugins/auth'

const { domain, clientId, audience } = {
  domain: process.env.VUE_APP_AUTH_DOMAIN,
  clientId: process.env.VUE_APP_AUTH_CLIENT_ID,
  audience: process.env.VUE_APP_AUTH_AUDIENCE
}

Vue.use(Auth0Plugin, {
  domain,
  clientId,
  audience,
  onRedirectCallback: (appState: any) => {
    router.push(
      appState && appState.targetUrl
        ? appState.targetUrl
        : window.location.pathname
    );
  }
})

Vue.config.productionTip = false;

store.subscribe((_, state) => {
  localStorage.setItem('store', JSON.stringify(state));
})

new Vue({
  router,
  store,
  beforeCreate() {
    this.$store.commit('INIT_STORE')
  },
  render: (h) => h(App),
}).$mount('#app');
