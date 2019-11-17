<template>
  <section>
    <div
      v-if="model.length > 0"
      :key="model.length">
      <todo-item
        v-for="(todo, i) in model"
        :key="`todo-${i}`"
        :ref="`todo-${i}`"
        v-model="model[i]"
        @new-todo="newTodo(i)"
        @delete-todo="deleteTodo(i)"
      />
    </div>
    <empty-state
      v-else
      title="You have nothing to do."
      content="Let's get you started."
      action="&plus; New Task"
      @action-click="newTodo()" />
  </section>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

// Components
import TodoItem from '@/components/TodoItem.vue'
import EmptyState from '@/components/EmptyState.vue'

// Types
import { ITodo } from '@/@types/types'

// Utils
import Todo from '@/utils/Todo'
import { VueClass } from 'vue-class-component/lib/declarations';

@Component({
  components: {
    TodoItem,
    EmptyState
  }
})
export default class TodoList extends Vue {
  @Prop({
    default: () => ([])
  }) private todos!: ITodo[]
  private model = [ ...this.todos ]

  private newTodo(index?: number) {
    const nextIndex = (typeof index === 'number') ? index + 1 : 0
    this.model.splice(nextIndex, 0, new Todo(false, ''))
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

    ((this.$refs[`todo-${index}`] as Vue[])[0]
      .$refs.textarea as HTMLElement
    ).focus()
  }
}
</script>
