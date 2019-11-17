<template>
  <div class="box has-background-grey-darker has-text-grey-light">
    <div
      v-if="title || action"
      class="has-text-centered">
      <h3
        class="title is-size-4 has-text-grey-light"
        v-text="title" />
      <p
        v-if="content"
        v-text="content"
        class="subtitle has-text-grey-light" />
      <base-button
        v-if="action"
        @click="$emit('action-click')"
        v-html="action"/>
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

// Components
import BaseButton from '@/components/BaseButton.vue'

@Component({
  components: {
    BaseButton
  }
})
export default class EmptyState extends Vue {
  @Prop(String) private title?: string;
  @Prop(String) private content?: string;
  @Prop(String) private action?: string;
}
</script>

<style lang="stylus" scoped>
@import '../assets/stylus/utilities/initial-variables.styl'

$empty
  background: $grey-dark

.empty-title
  @extend $empty
  height: $size-3
  width: 69%
  margin-bottom: 1.3em

.empty-text
  @extend $empty
  height: $size-5
  width: 87%
  margin-bottom: 0.8em

  &:last-child
    margin-bottom: 0
</style>
