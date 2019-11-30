<template>
  <Layout title="Login">
    <base-button @click="login">
      <span>Login with Slack</span>
      <span class="icon">
        <i class="fab fa-slack" />
      </span>
    </base-button>
  </Layout>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

// Layout
import Layout from '@/layout/Default.vue'
import BaseButton from '@/components/BaseButton.vue'

@Component({
  components: {
    Layout,
    BaseButton
  }
})
export default class Login extends Vue {
  public login() {
    this.$auth.loginWithRedirect()
  }
}
</script>
