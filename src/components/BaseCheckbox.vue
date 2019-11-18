<template>
  <div class="checkbox">
    <input
      type="checkbox"
      :id="uid"
      :checked="checked"
      @change="$emit('input', $event.target.checked)" />
    <label :for="uid" />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component({
  inheritAttrs: false
})
export default class BaseCheckbox extends Vue {
  @Prop({
    type: Boolean,
    required: true,
    default: false
  }) private value!: boolean;
  @Prop({
    type: String,
    required: true
  }) private id!: string;
  private checked: boolean = this.value;

  get uid() {
    return this.id
  }
}
</script>

<style lang="stylus" scoped>
@import '../assets/stylus/utilities/initial-variables.styl'
.checkbox
  position: relative

  input[type="checkbox"]
    opacity: 0
    position: absolute
    left: -1em
    top: 16px

  label
    position: relative
    padding-left: 1em

    &::before
    &::after
      position: absolute
      content: ""
      display: inline-block

    &::before
      height: 1.3em
      width: 1.3em
      border: 2px solid $grey-light
      left: 0px
      top: 8px
      border-radius: 4px

    &::after
      height: 6px
      width: 14px
      border-left: 2px solid $grey-light
      border-bottom: 2px solid $grey-light
      transform: rotate(-45deg)
      left: 4px
      top: 14px

  input[type="checkbox"] + label::after
    content: none

  input[type="checkbox"]:checked + label::after
    content: ""
</style>
