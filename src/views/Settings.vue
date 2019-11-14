<template>
  <layout title="Settings">
    <search-dropdown
      :choices="channels"
      searchKey="name"
    />
  </layout>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

// Components
import Layout from '@/layout/Default.vue'
import SearchDropdown from '@/components/SearchDropdown.vue'

// Utils
import Channel from '../../tests/utils/Channel'

@Component({
  components: {
    Layout,
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
