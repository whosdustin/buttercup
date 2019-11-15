<template>
  <div class="notifications" v-if="notifications">
    <transition-group name="slide-fade">
      <div
        v-for="(n, i) in notifications"
        :class="['notification', `is-${n.state}`]"
        :key="`${n.message}-${i}`">

        <p>{{ n.message }}</p>

        <button
          class="delete"
          @click="removeNotification(n)">
        </button>
      </div>
    </transition-group>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

// Interfaces
import { INotification } from '@/@types/types'

@Component
export default class Notification extends Vue {
  get notifications(): INotification[] {
    return this.$store.state.notifications
  }

  private removeNotification(notification: INotification) {
    this.$store.commit('REMOVE_NOTIFICATION', notification.message)
  }
}
</script>

<style lang="stylus" scoped>
.notifications
  display: flex
  position: fixed
  flex-direction: column
  align-items: center
  top: 0
  right: 0

  .notification
    width: 300px
    margin: 1em 1em 0 0

// Transition Group
.slide-fade-enter-active
  transition: all 0.4s cubic-bezier(.36,.13,.41,1.3)

.slide-fade-leave-active
  transition: all 0.4s ease

.slide-fade-enter
  transform: translateX(350px)
  opacity: 0

.slide-fade-enter-to,
.slide-fade-leave
  transform: translateX(0)
  opacity: 1

.slide-fade-leave-to
  opacity: 0
</style>
