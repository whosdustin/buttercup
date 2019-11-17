<template>
  <layout :title="layoutTitle" :subtitle="today">
    <tab-list @active-tab="displayTitle">
      <tab-item
        name="Previous Day"
        icon="fas fa-history">
        <todo-list
          :todos="[]"
          :empty="emptyPast" />
      </tab-item>
      <tab-item
        name="Today"
        icon="fas fa-calendar-day"
        :selected="true">
        <todo-list :todos="todos" />
      </tab-item>
      <tab-item
        name="Blockers"
        icon="fas fa-exclamation-triangle" >
        <todo-list
          :todos="[]"
          :empty="emptyBlocker" />
      </tab-item>
    </tab-list>
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

// Types
import { ITodo, ITab } from '@/@types/types'

// Utils
import dayjs from 'dayjs'
import Todo from '@/utils/Todo'

@Component({
  components: {
    Layout,
    TodoList,
    TabItem,
    TabList
  }
})
export default class Home extends Vue {
  private today?: string;
  private layoutTitle: string = 'Today';
  private todos = [
    new Todo(false, 'Hello how are you'),
  ]

  get emptyBlocker() {
    return {
      title: 'No Blockers! Great!',
      action: '&plus; blocker'
    }
  }

  get emptyPast() {
    return {
      title: 'What did you work on previously?',
      action: '&plus; task'
    }
  }

  private created() {
    const $today = new Date()
    this.today = dayjs($today).format('dddd | MMMM D, YYYY')
  }

  private displayTitle(tab: ITab) {
    this.layoutTitle = tab.name ? tab.name : this.layoutTitle;
  }
}
</script>
