<template>
  <section class="columns is-centered">
    <div class="column is-half">
      <div class="columns">
        <div class="column">
          <h1
            v-if="title"
            v-text="title"
            class="title is-1 has-text-white" />
          <h2
            v-if="subtitle"
            v-text="subtitle"
            class="subtitle is-5 has-text-grey-lighter"/>
        </div>
        <div class="column is-narrow">
          <router-link
            title="Settings"
            to="settings">
            <span class="icon is-large has-text-grey-light">
              <i class="fas fa-2x fa-sliders-h" />
            </span>
          </router-link>
        </div>
      </div>
      <slot />
    </div>
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
