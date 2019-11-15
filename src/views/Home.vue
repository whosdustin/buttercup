<template>
  <layout title="Today" :subtitle="today">
    <todo-item></todo-item>
  </layout>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

// Layout
import Layout from '@/layout/Default.vue'

// Components
import BaseButton from '@/components/BaseButton.vue'
import TodoItem from '@/components/TodoItem.vue'

// Types
import { ITodo } from '@/@types/types'

// Utils
import dayjs from 'dayjs'

@Component({
  components: {
    Layout,
    BaseButton,
    TodoItem
  }
})
export default class Home extends Vue {
  private today?: string;

  private created() {
    const today = new Date()
    this.today = dayjs(today).format('dddd | MMMM D, YYYY')
  }
}
</script>
