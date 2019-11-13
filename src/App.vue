<template>
  <div id="app">
    <router-link to="/">Home</router-link>
    &nbsp;|&nbsp;
    <router-link to="settings">Settings</router-link>
    <router-view></router-view>
    <notifications></notifications>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Notifications from '@/components/Notifications.vue';

@Component({
  components: {
    Notifications
  }
})
export default class App extends Vue {}
</script>
