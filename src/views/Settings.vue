<template>
  <layout title="Settings">
    <div class="columns">
      <div class="column">
        <search-dropdown
          :choices="channels"
          searchKey="name"
        />
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <base-button
          @click="$router.push('/')">
          <span class="icon is-small">
            <i class="fas fa-caret-left"></i>
          </span>
          <span>Back</span>
        </base-button>
        <base-button
          v-if="$auth.isAuthenticated"
          @click="logout">
          Log out
        </base-button>
      </div>
    </div>
  </layout>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

// Layout
import Layout from '@/layout/Default.vue'

// Store
import { mapActions } from 'vuex'

// Components
import SearchDropdown from '@/components/SearchDropdown.vue'
import BaseButton from '@/components/BaseButton.vue'

// Utils
import Channel from '../../tests/utils/Channel'
import Management from '@/utils/Management'
import axios from 'axios'

@Component({
  components: {
    Layout,
    SearchDropdown,
    BaseButton
  },
  methods: {
    ...mapActions(['getChannels'])
  }
})
export default class Settings extends Vue {
  private api = process.env.VUE_APP_AUTH_AUDIENCE
  private channels = this.$store.state.channels
  private getChannels!: any;

  private async created() {
    try {
      const id: any = await this.$auth.getIdTokenClaims()
      const token = await Management.token()
      const { data } = await axios.get(`${this.api}users/${id.sub}`, {
        headers: { Authorization: `Bearer ${token.access_token}` }
      })
      this.getChannels(data.token)
    } catch (error) {
      console.error(error)
    }
  }

  private mounted() {
    console.log(this.channels)
  }

  private logout() {
    this.$auth.logout({
      returnTo: window.location.origin
    })
  }
}
</script>
