<template>
  <section class="columns">
    <div class="column">
      <base-button
        color="warning">
        <span>New Day</span>
        <span class="icon is-small">
          <i class="fas fa-sun" aria-hidden="true"></i>
        </span>
      </base-button>
    </div>
    <div class="column has-text-right">
      <base-button
        @click="onSubmit">
        <span>Send to Slack</span>
        <span class="icon is-small">
          <i class="fab fa-slack" aria-hidden="true"></i>
        </span>
      </base-button>
    </div>
  </section>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

// Store
import { mapActions } from 'vuex'

// Components
import BaseButton from '@/components/BaseButton.vue'

// Utils
import Slack from '@/models/Slack'
import { IUrls } from '@/@types/types';
import Standup from '@/models/Standup';
import Notify from '@/models/Notify'

interface ISendToSlack {
  standups: Standup[];
  channel: string | null;
}

@Component({
  components: {
    BaseButton
  },
  methods: {
    ...mapActions(['sendToSlack'])
  }
})
export default class ActionsBar extends Vue {
  private sendToSlack!: any;

  // private onSubmit() {
  //   this.sendToSlack()
  // }
}
</script>
