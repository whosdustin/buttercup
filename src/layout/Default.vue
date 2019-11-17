<template>
  <section class="columns is-centered">
    <nav class="column is-half">
      <nav class="columns">
        <div class="column">
          <h1
            v-if="title"
            v-text="title"
            class="title is-1 has-text-white" />
          <h2
            v-if="subtitle"
            v-html="subtitle"
            class="subtitle is-5 has-text-grey-lighter"/>
        </div>
        <nav class="column is-narrow">
          <router-link
            title="Settings"
            to="settings">
            <span class="icon is-large has-text-grey-light">
              <i class="fas fa-2x fa-sliders-h" />
            </span>
          </router-link>
        </nav>
      </nav>
      <slot />
    </nav>
  </section>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class Layout extends Vue {
  @Prop(String) private title?: string;
  @Prop(String) private subtitle?: string;
}
</script>
