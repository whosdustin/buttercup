<template>
  <section>
    <div v-if="model.length > 0">
      <todo-item
        v-for="(todo, i) in model"
        :key="`todo-${i}`"
        v-model="model[i]"
      />
    </div>
    <empty-state v-else title="You have nothing to do." />
  </section>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

// Components
import TodoItem from '@/components/TodoItem.vue'
import EmptyState from '@/components/EmptyState.vue'

// Types
import { ITodo } from '@/@types/types';

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

  private mounted() {
    this.model = this.todos
  }
}
</script>

<style lang="stylus" scoped>
</style>
