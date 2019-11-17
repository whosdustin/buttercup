<template>
  <div>
    <nav class="tabs">
      <ul>
        <li
          v-for="(t, i) in tabs"
          :key="i"
          :class="{ 'is-active': t.isActive }">
          <a
            @click.prevent="selectTab(t)">
            <span
              v-if="t.iconClass"
              class="icon">
              <i :class="t.iconClass" aria-hidden="true"></i>
            </span>
            {{ t.name }}
          </a>
        </li>
      </ul>
    </nav>
    <div>
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

// Types
import { ITab } from '@/@types/types'

@Component
export default class TabList extends Vue {
  private tabs: ITab[] = [];

  private created() {
    this.tabs = this.$children
  }

  private selectTab(tab: ITab) {
    this.tabs.map((t) => t.isActive = t.name === tab.name)
    this.$emit('active-tab', tab)
  }
}
</script>

<style lang="stylus" scoped>
</style>
