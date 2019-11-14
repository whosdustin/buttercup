<template>
  <section class="panel is-success">
    <div class="panel-block panel-block-fixed-top">
      <div class="control has-icons-left">
        <input
          type="search"
          name="search"
          v-model="search"
          placeholder="Search"
          class="input" />
        <span class="icon is-left">
          <i class="fas fa-search" aria-hidden="true"></i>
        </span>
      </div>
    </div>
    <div
      v-if="results.length === 0"
      class="panel-block empty-results" >
      <span>No Results Match</span>
    </div>
    <search-result v-else
      v-for="(result, i) in results"
      :key="`result-${i}`"
      :result="result"
      :text="searchKey"
      value="id"
      @closeMenu="$emit('closeMenu', true)" />
  </section>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

import SearchResult from '@/components/SearchResult.vue'

@Component({
  components: {
    SearchResult
  }
})
export default class SelectSearch extends Vue {
  @Prop(String) private searchKey!: string;
  @Prop([String, Array]) private choices!: string | [];

  private search: string = '';

  get selections(): any[] {
    if (Array.isArray(this.choices)) {
      return this.choices
    }

    return this.$store.state[this.choices] || []
  }

  get results() {
    return this.selections.filter((selection) => {
      return selection[this.searchKey].toLowerCase()
        .includes(this.search.toLowerCase())
    })
  }
}
</script>

<style lang="stylus" scoped>
.panel
  max-height: 250px
  padding-top: 52px
  padding-bottom: 10px
  overflow-y: scroll
  box-shadow: none

.panel-block-fixed-top
  position: absolute
  width: 100%
  top: 6px
  background: #fff
</style>
