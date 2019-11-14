<template>
  <button
    :class="classList"
    @click="$emit('click')">
    <slot />
  </button>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

import { ColorState } from '@/store/types'
@Component
export default class BaseButton extends Vue {
  @Prop({ default: 'primary'}) private color!: ColorState;
  private classList = [
    'button',
    'is-outlined',
    'is-rounded',
    `is-${this.color}`
  ]
}
</script>
