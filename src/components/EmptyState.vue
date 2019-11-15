<template>
  <div class="box has-background-grey-darker has-text-grey-light">
    <div v-if="title">
      <h3
        class="title is-size-4 has-text-grey-light"
        v-text="title" />
      <p v-if="content" v-text="content" />
    </div>
    <div v-else>
      <div class="empty-title" />
      <div
        v-for="(_, i) in 3"
        class="empty-text"
        :key="i" />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class EmptyState extends Vue {
  @Prop(String) private title?: string;
  @Prop(String) private content?: string;
}
</script>

<style lang="stylus" scoped>
@import '../assets/stylus/utilities/initial-variables.styl'

$empty
  margin-bottom: 0.7em
  background: $grey-darker

.empty-title
  @extend $empty
  height: $size-3
  width: 69%

.empty-text
  @extend $empty
  height: $size-5
  width: 87%

  &:last-child
    margin-bottom: 0
</style>
