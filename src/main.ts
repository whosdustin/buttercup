import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import '@fortawesome/fontawesome-free/js/all'
import './assets/main.styl';

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
