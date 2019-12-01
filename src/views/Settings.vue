<template>
  <layout title="Settings">
    <div class="columns is-mobile has-text-white is-vcentered">
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
        <hr>
        <div class="field" v-if="channels">
          <label class="label has-text-white">
            Choose a channel to post your standup to.
          </label>
          <div class="control">
            <search-dropdown
              :choices="channelList"
              searchKey="name"
            />
          </div>
        </div>
        <empty-state v-else />
      </div>
    </div>
    <template v-slot:footer>
      <div class="columns is-mobile">
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
import { Vue, Component, Watch } from 'vue-property-decorator'
import axios from 'axios'

// Layout
import Layout from '@/layout/Default.vue'

// Store
import { mapActions, mapState } from 'vuex'

// Types
import { IChannel } from '@/@types/types'

// Components
import SearchDropdown from '@/components/SearchDropdown.vue'
import BaseButton from '@/components/BaseButton.vue'
import EmptyState from '@/components/EmptyState.vue'

// Utils
import Management from '@/utils/Management'
import Notify from '@/models/Notify'

@Component({
  title: 'Settings',
  components: {
    Layout,
    SearchDropdown,
    BaseButton,
    EmptyState
  },
  methods: {
    ...mapActions(['getChannels'])
  },
  computed: {
    ...mapState(['channels'])
  }
})
export default class Settings extends Vue {
  private getChannels!: any;
  private channels!: IChannel[] | null;
  private channelList: IChannel[] | null = null;

  private created() {
    this.$auth.getIdTokenClaims().then((id: any) => {
        const management = new Management(id)
        management.token().then((token) => {
          this.getChannels(token)
        })
      })
  }

  @Watch('channels')
  private handleUpdate() {
    this.channelList = this.channels
  }

  private logout() {
    this.$auth.logout({
      returnTo: window.location.origin
    })
  }
}
</script>
