<template>
  <div class="columns">
    <div class="column is-narrow">
      <label
        for="done"
        class="checkbox">
        <input
          id="done"
          type="checkbox"
          :checked="todo.done"
          @change="updateDone($event.target.checked)"
        />
      </label>
    </div>
    <div class="column">
      <div class="control">
        <textarea
          ref="textarea"
          rows='1'
          :class="textareaClasses"
          :value="todo.text"
          @input="updateText($event.target.value)"
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

// Types
import { ITodo } from '@/@types/types';

@Component({
  inheritAttrs: false
})
export default class TodoItem extends Vue {
  public $refs!: {
    textarea: HTMLElement;
  }
  @Prop({
    default: () => ({ done: false, text: '' })
  }) private value!: ITodo
  private todo: ITodo = { ...this.value };

  get textareaClasses() {
    return [
      'textarea',
      'has-fixed-size',
      'has-text-white-ter',
      'has-background-grey-dark',
      { done: this.todo.done }
    ]
  }

  private mounted() {
    const el = this.$refs.textarea
    this.$nextTick(() => {
      el.setAttribute('style', 'height:' + (el.scrollHeight) + 'px')
    })

    el.addEventListener('input', this.resizeTextarea)
  }

  private updateDone(done: boolean) {
    this.todo.done = done;
    this.$emit('input', this.todo)
  }

  private updateText(text: string) {
    this.todo.text = text;
    this.$emit('input', this.todo)
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
.textarea
  overflow-y: hidden
  border: 0

  &.done
    text-decoration: line-through
</style>
