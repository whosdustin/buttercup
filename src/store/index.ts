import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import {
  RootState,
  INotification,
  IChannel
} from '@/@types/types'

Vue.use(Vuex);

const store: StoreOptions<RootState> = {
  state: {
    notifications: [],
    channels: [],
    channel: null,
  },
  mutations: {
    SET_CHANNEL(state, channel: IChannel) {
      state.channel = channel;
    },
    ADD_NOTIFICATION(state, notification: INotification) {
      // Confirm Is Array
      if (!Array.isArray(state.notifications)) {
        return;
      }

      // Prevent duplicate errors
      if (state.notifications
          .findIndex((i) => i.message === notification.message) !== -1) {
        return;
      }

      state.notifications.push(notification)
    },
    REMOVE_NOTIFICATION(state, messageToBeRemoved: string) {
      if (Array.isArray(state.notifications)) {
        state.notifications = state.notifications.filter(
          (notification) => notification.message !== messageToBeRemoved
        )
      }
    }
  }
}

export default new Vuex.Store(store);
