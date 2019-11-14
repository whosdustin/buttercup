<template>
  <layout title="Home">
    <!-- <base-button @click="som">Submit</base-button> -->
  </layout>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

// Layout
import Layout from '@/layout/Default.vue'

// Components
import BaseButton from '@/components/BaseButton.vue'

@Component({
  components: {
    Layout,
    BaseButton
  }
})
export default class Home extends Vue {
  private som() {
    console.log('hello')
  }
}
</script>
