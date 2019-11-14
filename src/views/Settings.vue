<template>
  <section>
    Settings
    <search-dropdown
      :choices="channels"
      searchKey="name"
    />
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import SearchDropdown from '@/components/SearchDropdown.vue'
import Channel from '../../tests/utils/Channel'

@Component({
  components: {
    SearchDropdown
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
