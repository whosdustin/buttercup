<template>
  <div id="app">
    <main class="container">
      <nav class="navbar">
        <router-link to="/">Home</router-link>
        &nbsp;
        <router-link to="settings">Settings</router-link>
      </nav>
      <router-view />
    </main>
    <notifications></notifications>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import Notifications from '@/components/Notifications.vue';

@Component({
  components: {
    Notifications
  }
})
export default class App extends Vue {}
</script>

<style lang="stylus" scoped>
.navbar
  height: 40px
  margin-bottom: 10px
</style>
