<template>
  <section>
    <div
      v-if="model.length > 0"
      :key="model.length">
      <todo-item
        v-for="(todo, i) in model"
        :key="`todo-${section}-${i}`"
        :ref="`todo-${section}-${i}`"
        :id="`todo-${section}-${i}`"
        v-model="model[i]"
        @new-todo="newTodo(i)"
        @delete-todo="deleteTodo(i)"
      />
    </div>
    <empty-state
      v-else
      :title="empty.title"
      :content="empty.content"
      :action="empty.action"
      @action-click="newTodo()" />
  </section>
</template>

<script lang="ts">
import {
  Vue,
  Component,
  Prop,
  Watch
} from 'vue-property-decorator';

// Components
import TodoItem from '@/components/TodoItem.vue'
import EmptyState from '@/components/EmptyState.vue'

// Types
import { IEmptyState } from '@/@types/types'

// Utils
import Todo from '@/utils/Todo'

@Component({
  components: {
    TodoItem,
    EmptyState
  }
})
export default class TodoList extends Vue {
  @Prop({
    default: () => ([])
  }) private todos!: Todo[]
  @Prop({
    default: () => ({
      title: 'You have nothing to do.',
      content: 'Let\'s get you started.',
      action: '&plus; New Task'
    })
  }) private empty!: IEmptyState;
  @Prop({
    type: String,
    required: true,
    validator: (value) => {
      const available = ['past', 'present', 'blocker']
      return available.findIndex((a) => a === value) !== -1
    }
  }) private section!: string;
  private model = [ ...this.todos ]

  @Watch('model')
  private handleState() {
    this.$store.commit('SET_TODOS', {
      section: this.section,
      todos: this.model
    })
  }

  private newTodo(index?: number) {
    const nextIndex = (typeof index === 'number') ? index + 1 : 0
    this.model.splice(nextIndex, 0, new Todo())
    this.$nextTick(() => {
      this.focusTodo(nextIndex)
    })
  }

  private deleteTodo(index: number) {
    this.model.splice(index, 1)
    this.$nextTick(() => {
      this.focusTodo(index - 1)
    })
  }

  private focusTodo(index: number) {
    if (index < 0) {
      return
    }

    ((this.$refs[`todo-${this.section}-${index}`] as Vue[])[0]
      .$refs.textarea as HTMLElement
    ).focus()
  }
}
</script>
