<template>
  <section class="default-layout">
    <div class="columns is-centered">
      <div class="column is-half">
        <div class="columns">
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
              v-if="$auth.isAuthenticated"
              title="Settings"
              to="settings">
              <span class="icon is-large has-text-grey-light">
                <i class="fas fa-2x fa-sliders-h" />
              </span>
            </router-link>
          </nav>
        </div>
        <slot />
      </div>
    </div>
    <footer class="has-background-grey-darker">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-half">
            <slot name="footer" />
          </div>
        </div>
      </div>
    </footer>
  </section>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

import BaseButton from '@/components/BaseButton.vue'

@Component({
  components: {
    BaseButton
  }
})
export default class Layout extends Vue {
  @Prop(String) private title?: string;
  @Prop(String) private subtitle?: string;
}
</script>

<style lang="stylus" scoped>
.default-layout,
.default-layout
  height: 100%

footer
  width: 100vw
  position: absolute
  margin-left: -50vw
  padding: 1em
  left: 50%
  bottom: 0
</style>
