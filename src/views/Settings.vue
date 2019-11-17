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
      </div>
    </div>
  </layout>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

// Layout
import Layout from '@/layout/Default.vue'

// Components
import SearchDropdown from '@/components/SearchDropdown.vue'
import BaseButton from '@/components/BaseButton.vue'

// Utils
import Channel from '../../tests/utils/Channel'

@Component({
  components: {
    Layout,
    SearchDropdown,
    BaseButton
  }
})
export default class Settings extends Vue {
  get channels() {
    const list = [
      'Alma',
      'Polaris',
      'Andromeda',
      'Nebula',
      'Conagra',
      'Sales',
      'Support',
      'General',
      'Random',
      'Parade',
      'Lobster'
    ]

    const channelList = list
      .map((item: string) => new Channel(list.indexOf(item), item))
    return channelList
  }
}
</script>
