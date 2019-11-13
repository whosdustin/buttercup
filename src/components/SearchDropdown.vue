<template>
  <div
    :class="['dropdown', { 'is-active': isActive }]">
    <div class="dropdown-trigger">
      <button
        class="button"
        aria-haspopup="true"
        aria-controls="dropdown-menu"
        @click="toggleDropdown">
        <span v-if="selection">{{ selection[searchKey] }}</span>
        <span v-else>Select Channel</span>
        <span class="icon is-small">
          <i class="fas fa-angle-down" aria-hidden="true"></i>
        </span>
      </button>
    </div>
    <div class="dropdown-menu">
      <div class="dropdown-content">
        <select-search
          :choices="choices"
          :searchKey="searchKey"
          @closeMenu="toggleDropdown" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

import SelectSearch from '@/components/SelectSearch.vue'

@Component({
  components: {
    SelectSearch
  }
})
export default class SearchDropdown extends Vue {
  @Prop(Object) private selection!: object;
  @Prop(String) private searchKey!: string;
  @Prop([String, Array]) private choices?: string | [];

  private isActive: boolean = false;

  private toggleDropdown() {
    this.isActive = !this.isActive
  }
}
</script>

<style lang="stylus" scoped>
.dropdown-content
  max-height: 250px
  overflow: hidden
</style>
