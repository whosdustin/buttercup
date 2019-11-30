<template>
  <section class="columns">
    <div class="column">
      <base-button
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
    ...mapActions(['sendToSlack'])
  }
})
export default class ActionsBar extends Vue {
  // tslint:disbale:no-console */
  private sendToSlack!: any;
  private api = process.env.VUE_APP_AUTH_AUDIENCE

  private login() {
    this.$auth.loginWithRedirect({
      connection: 'slack'
    })
  }

  private async onSubmit() {
    try {
      const id: any = await this.$auth.getIdTokenClaims()
      const token = await Management.token()
      const { data } = await axios.get(`${this.api}users/${id.sub}`, {
        headers: { Authorization: `Bearer ${token.access_token}` }
      })
      this.sendToSlack(data.token)
    } catch (error) {
      this.$store.commit('ADD_NOTIFICATION', new Notify('Oops: ' + error))
    }
  }
}
</script>
