<template>
  <button
    :class="classList"
    @click="$emit('click')">
    <slot />
  </button>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

import { ColorState, SizeState } from '@/@types/types'
@Component
export default class BaseButton extends Vue {
  @Prop({ default: 'primary' }) private color!: ColorState;
  @Prop({ default: 'normal' }) private size!: SizeState;

  get classList() {
    return [
      'button',
      'is-outlined',
      'is-rounded',
      'is-uppercase',
      `is-${this.color}`,
      `is-${this.size}`
    ]
  }
}
</script>
