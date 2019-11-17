<template>
  <div v-show="isActive">
    <slot />
    <empty-state v-if="!hasSlot" />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

// Components
import EmptyState from '@/components/EmptyState.vue'

@Component({
  components: {
    EmptyState
  }
})
export default class TabItem extends Vue {
  @Prop(String) private name!: string;
  @Prop(String) private icon?: string;
  @Prop({ default: false }) private selected!: boolean;
  private isActive: boolean = false;
  private iconClass?: string;

  get hasSlot() {
    return !!this.$slots.default
  }

  private mounted() {
    this.isActive = this.selected
    this.iconClass = this.icon
  }
}
</script>
