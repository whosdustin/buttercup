<template>
  <section class="columns is-centered">
    <div class="column is-half">
      <h1 v-if="title"
        v-text="title"
        class="title is-1 has-text-white" />
      <slot />
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class Layout extends Vue {
  @Prop(String) private title?: string;
}
</script>
