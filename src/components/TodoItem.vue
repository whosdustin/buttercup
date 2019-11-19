<template>
  <div :class="['columns', { faded: todo.done }]">
    <div class="column is-narrow">
      <base-checkbox
        :id="id"
        v-model="todo.done" />
    </div>
    <div class="column">
      <div class="control">
        <textarea
          ref="textarea"
          rows='1'
          :class="textareaClasses"
          :value="todo.text"
          @input="updateText($event.target.value)"
          @keydown.enter.prevent="$emit('new-todo')"
          @keydown.delete="toggleDeletable"
          @keyup.delete="deleteTodo"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  Vue,
  Component,
  Prop,
  Watch
} from 'vue-property-decorator';

import BaseCheckbox from '@/components/BaseCheckbox.vue'

// Utils
import Todo from '@/models/Todo'
import TodoList from './TodoList.vue';

@Component({
  components: {
    BaseCheckbox
  },
  inheritAttrs: false
})
export default class TodoItem extends Vue {
  public $refs!: {
    textarea: HTMLElement;
  }
  @Prop({
    default: () => (new Todo())
  }) private value!: Todo
  @Prop({
    type: String,
    required: true
  }) private id!: string;
  private todo: Todo = { ...this.value };
  private deletable: boolean = false;

  get textareaClasses() {
    return [
      'textarea',
      'has-fixed-size',
      'has-text-white-ter',
      'is-size-5',
      { done: this.todo.done }
    ]
  }

  private mounted() {
    const el = this.$refs.textarea
    this.$nextTick(() => {
      el.setAttribute(
        'style',
        'height:' + (el.scrollHeight) + 'px'
      )
    })

    el.addEventListener('input', this.resizeTextarea)
  }

  @Watch('todo.done')
  private updateDone(done: boolean) {
    this.$emit('input', this.todo)
  }

  private updateText(text: string) {
    this.todo.text = text;
    this.$emit('input', this.todo)
  }

  private toggleDeletable() {
    this.deletable = (this.todo.text.length === 0) ? true : false
  }

  private deleteTodo() {
    if (this.deletable) {
      this.$emit('delete-todo')
    }
  }

  private resizeTextarea(event: Event) {
    const el = event.target as HTMLElement
    el.style.height = 'auto'
    el.style.height = el.scrollHeight + 'px'
  }

  private beforeDestroy() {
    this.$refs.textarea.removeEventListener('input', this.resizeTextarea)
  }
}
</script>

<style lang="stylus" scoped>
.columns
  opacity: 1
  transition: all 0.3s ease-out

  .faded
    opacity: 0.3

.column
  padding: 0.25em 0.75em

.textarea
  overflow-y: hidden
  border: 0
  border-radius: 0
  background: transparent

  &:focus
    border: 0
    box-shadow: none

  &.done
    text-decoration: line-through
</style>
