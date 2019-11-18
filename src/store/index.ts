import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import {
  RootState,
  INotification,
  IChannel,
  ITodosBySection
} from '@/@types/types'

import Standup from '@/utils/Standup'

Vue.use(Vuex);

const store: StoreOptions<RootState> = {
  state: {
    notifications: [],
    channels: [],
    channel: null,
    standups: [
      new Standup(
        'past',
        'Previous Day',
        'fas fa-history',
        {
          title: 'What did you work on previously?',
          action: '&plus; task'
        }
      ),
      new Standup(
        'present',
        'Today',
        'fas fa-calendar-day'
      ),
      new Standup(
        'blocker',
        'Blockers',
        'fas fa-exclamation-triangle',
        {
          title: 'No Blockers! Great!',
          action: '&plus; blocker'
        }
      )
    ]
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
    },
    SET_TODOS(state, todosBySection: ITodosBySection) {
      state.standups
        .filter((standup) => standup.section === todosBySection.section)
        .map((standup) => standup.todos = todosBySection.todos)
    }
  }
}

export default new Vuex.Store(store);
