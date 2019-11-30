import Vue from 'vue'
import Auth0Client from '@auth0/auth0-spa-js/dist/typings/Auth0Client'
declare module 'vue/types/vue' {
  interface Vue {
    $auth: Auth0Client
  }
}
