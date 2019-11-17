<template>
  <layout title="Today" :subtitle="today">
    <tab-list>
      <tab-item
        name="Yesterday"
        icon="fas fa-history" />
      <tab-item
        name="Today"
        icon="fas fa-calendar-day"
        :selected="true">
        <todo-list :todos="todos" />
      </tab-item>
      <tab-item
        name="Blockers"
        icon="fas fa-exclamation-triangle" />
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
import { ITodo } from '@/@types/types'

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
  private todos = [
    // new Todo(false, 'Hello how are you'),
  ]

  private created() {
    const today = new Date()
    this.today = dayjs(today).format('dddd | MMMM D, YYYY')
  }
}
</script>
