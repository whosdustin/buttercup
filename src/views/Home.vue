<template>
  <layout :title="title" :subtitle="subtitle">
    <tab-list
      v-if="standups"
      @active-tab="displayTitle">
      <tab-item
        v-for="s in standups"
        :key="`${s.section}-${uid}`"
        :name="s.name"
        :icon="s.icon"
        :selected="title === s.name">
        <empty-state
          v-if="userSetup"
          title="Some Setup Needed!"
          content="Choose a channel to send your standup to."
          action="Visit Settings"
          @action-click="$router.push('/settings')" />
        <todo-list
          :section="s.section"
          :todos="s.todos"
          :empty="s.empty" />
      </tab-item>
    </tab-list>
    <empty-state
      v-else
      v-for="n in 4"
      :key="n * 9999" />
    <template v-slot:footer>
      <actions-bar />
    </template>
  </layout>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

// Layout
import Layout from '@/layout/Default.vue'

// Components
import TodoList from '@/components/TodoList.vue'
import TabList from '@/components/TabList.vue'
import TabItem from '@/components/TabItem.vue'
import EmptyState from '@/components/EmptyState.vue'
import ActionsBar from '@/components/ActionsBar.vue'

// Types
import { ITab } from '@/@types/types'

// Utils
import Day from '@/utils/Day'
import Todo from '@/models/Todo'
import Standup from '@/models/Standup'

@Component({
  title: 'Home',
  components: {
    Layout,
    TodoList,
    TabItem,
    TabList,
    EmptyState,
    ActionsBar
  }
})
export default class Home extends Vue {
  private today?: string;
  private date!: number;
  private title: string = 'Today';

  get subtitle() {
    return this.title === 'Today' ? this.today : '&nbsp;'
  }

  get standups() {
    return this.$store.state.standups
  }

  get uid() {
    return this.$store.state.date
  }

  get userSetup() {
    return this.$auth.isAuthenticated && !this.$store.state.channel
  }

  private created() {
    this.$store.commit('SET_DATE')
    this.date = this.$store.state.date
    this.today = Day.pretty(this.date)
  }

  private displayTitle(tab: ITab) {
    this.title = tab.name ? tab.name : this.title;
  }
}
</script>
