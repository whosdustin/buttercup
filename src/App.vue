<template>
  <div id="app">
    <main class="container">
      <router-view />
    </main>
    <notifications />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

// Components
import Notifications from '@/components/Notifications.vue';
import BaseButton from '@/components/BaseButton.vue';

@Component({
  components: {
    Notifications,
    BaseButton
  }
})
export default class App extends Vue {}
</script>

<style lang="stylus" scoped>
.container
  padding-top: 2em
</style>
