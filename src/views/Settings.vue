<template>
  <section>
    Settings
    <search-dropdown
      :choices="channels"
      :selection="channel"
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
  private channels = [
    new Channel(1, 'Alma'),
    new Channel(2, 'Polaris'),
    new Channel(3, 'Andromeda'),
    new Channel(4, 'Nebula'),
    new Channel(5, 'Conagra'),
    new Channel(6, 'Sales'),
    new Channel(7, 'Support'),
    new Channel(8, 'General'),
    new Channel(9, 'Random'),
    new Channel(10, 'Parade'),
    new Channel(11, 'Lobster')
  ]

  get channel(): string | number {
    return this.$store.state.channel
  }
}
</script>
