<template>
  <a
    :for="result[value]"
    :class="['panel-block', { 'is-active': active }]"
    @click="selectResult()">
    <div :class="['panel-icon', { 'is-invisible': !active }]">
      <i class="fas fa-check" aria-hidden="true"></i>
    </div>
    <span>{{ result[text] }}</span>
  </a>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class SearchResults extends Vue {
  @Prop(Object) private result!: { [key: string]: string | number };
  @Prop(String) private text!: string;
  @Prop([String, Number]) private value!: string | number;

  get active(): boolean {
    if (!this.$store.state.channel) {
      return false
    }

    return this.$store.state.channel[this.value] === this.result[this.value];
  }

  private selectResult() {
    this.$emit('closeMenu', true)
    this.$store.commit('SET_CHANNEL', this.result)
  }
}
</script>

<style lang="stylus" scoped>
input[type='radio']
  margin-right: 1em
</style>
