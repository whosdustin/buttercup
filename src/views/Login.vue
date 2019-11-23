<template>
  <Layout title="Login">

  </Layout>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

// Layout
import Layout from '@/layout/Default.vue'

@Component({
  components: {
    Layout
  }
})
export default class Login extends Vue {}
</script>
