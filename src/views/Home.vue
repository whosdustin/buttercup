<template>
  <layout title="Today" :subtitle="today">
    <todo-list :todos="todos" />
  </layout>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

// Layout
import Layout from '@/layout/Default.vue'

// Components
import TodoList from '@/components/TodoList.vue'

// Types
import { ITodo } from '@/@types/types'

// Utils
import dayjs from 'dayjs'
import Todo from '../../tests/utils/TodoItem'

@Component({
  components: {
    Layout,
    TodoList
  }
})
export default class Home extends Vue {
  private today?: string;
  private todos = [
    new Todo(false, 'Hello how are you'),
    new Todo(false, 'Shop for things'),
    new Todo(true, 'Work hard and get paid'),
    new Todo(false, 'Plan a party for payday')
  ]

  private created() {
    const today = new Date()
    this.today = dayjs(today).format('dddd | MMMM D, YYYY')
  }
}
</script>
