<template>
  <section class="columns">
    <div class="column">
      <base-button
        @click="refresh"
        color="warning">
        <span>New Day</span>
        <span class="icon is-small">
          <i class="fas fa-sun" aria-hidden="true"></i>
        </span>
      </base-button>
    </div>
    <div class="column has-text-right">
      <base-button
        v-if="!$auth.isAuthenticated"
        @click="login">
        <span>Login and send to Slack</span>
        <span class="icon">
          <i class="fab fa-slack" />
        </span>
      </base-button>
      <base-button
        v-else
        @click="onSubmit">
        <span>Send to Slack</span>
        <span class="icon is-small">
          <i class="fab fa-slack" aria-hidden="true"></i>
        </span>
      </base-button>
    </div>
  </section>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

// Store
import { mapActions } from 'vuex'

// Components
import BaseButton from '@/components/BaseButton.vue'

// Utils
import { IUrls } from '@/@types/types'
import Standup from '@/models/Standup'
import Notify from '@/models/Notify'
import axios from 'axios'

import Management from '@/utils/Management'

interface ISendToSlack {
  standups: Standup[];
  channel: string | null;
}

@Component({
  components: {
    BaseButton
  },
  methods: {
    ...mapActions([
      'sendToSlack',
      'refreshTodos'
    ])
  }
})
export default class ActionsBar extends Vue {
  private sendToSlack!: any;
  private refreshTodos!: any;

  private login() {
    this.$auth.loginWithRedirect({
      connection: 'slack'
    })
  }

  private refresh() {
    this.refreshTodos()
  }

  private async onSubmit() {
    try {
      const id: any = await this.$auth.getIdTokenClaims()
      const management = new Management(id)
      const token = await management.token()
      this.sendToSlack(token)
    } catch (error) {
      this.$store.commit('ADD_NOTIFICATION', new Notify('Oops: ' + error))
    }
  }
}
</script>
