<template>
  <layout title="Profile">
    <div class="columns has-text-white is-vcentered">
      <div class="column is-narrow">
        <figure class="image is-64x64">
          <img
            class="is-rounded"
            :src="$auth.user.picture"
            :alt="$auth.user.name">
        </figure>
      </div>
      <div class="column">
        <p>{{ $auth.user.name }}</p>
      </div>
    </div>
    <div class="columns has-text-white">
      <div class="column">
        <h2 class="title size-4 has-text-white">Settings</h2>
        <hr>
        <div class="field">
          <label class="label has-text-white">
            Choose a channel to post your standup to.
          </label>
          <div class="control">
            <search-dropdown
              :choices="channels"
              searchKey="name"
            />
          </div>
        </div>
      </div>
    </div>
    <template v-slot:footer>
      <div class="columns">
        <div class="column">
          <base-button
            @click="$router.push('/')">
            <span class="icon is-small">
              <i class="fas fa-caret-left"></i>
            </span>
            <span>Back</span>
          </base-button>
        </div>
        <div class="column has-text-right">
          <base-button
            v-if="$auth.isAuthenticated"
            color="danger"
            @click="logout">
            Log out
          </base-button>
        </div>
      </div>
    </template>
  </layout>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import axios from 'axios'

// Layout
import Layout from '@/layout/Default.vue'

// Store
import { mapActions } from 'vuex'

// Components
import SearchDropdown from '@/components/SearchDropdown.vue'
import BaseButton from '@/components/BaseButton.vue'

// Utils
import Management from '@/utils/Management'
import Notify from '@/models/Notify'

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
  private getChannels!: any;
  private channels = this.$store.state.channels

  private async created() {
    try {
      const id: any = await this.$auth.getIdTokenClaims()
      const management = new Management(id)
      const token = await management.token()
      this.getChannels(token)
    } catch (error) {
      this.$store.commit('ADD_NOTIFICATION', new Notify(error))
    }
  }

  private logout() {
    this.$auth.logout({
      returnTo: window.location.origin
    })
  }
}
</script>
