import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import {
  RootState,
  INotification,
  IChannel,
  ITodosBySection
} from '@/@types/types'

// tslint:disable-next-line
const Slack = require('slack')

// Models
import Standup from '@/models/Standup'
import Chat from '@/models/Chat'
import Notify from '@/models/Notify'

Vue.use(Vuex);

const store: StoreOptions<RootState> = {
  state: {
    notifications: [],
    channels: [],
    channel: null,
    urls: [{
      name: 'Jira',
      prepend: 'https://meredith.jira.com/browser?=',
      match: '[A-Z]*\-[0-9]*'
    }],
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
        'fas fa-calendar-day',
        {
          title: 'What are you doing today?',
          action: '&plus; New Task'
        }
      ),
      new Standup(
        'blocker',
        'Blockers',
        'fas fa-exclamation-triangle',
        {
          title: 'Do you have any concerns or blockers?',
          action: '&plus; blocker'
        }
      )
    ]
  },
  actions: {
    async sendToSlack({ commit, state }, token) {
      try {
        if (!state.channel) {
          commit('ADD_NOTIFICATION',
            new Notify('HOLD UP: You must first select a channel to post.')
          )
          return
        }

        const client = new Slack(token)
        const chat = new Chat(
          token,
          state.standups,
          state.channel.id,
          state.urls
        )
        const result = await client.chat.postMessage(chat.message())

        if (result.ok) {
          commit('ADD_NOTIFICATION',
            new Notify('SUCCESS! Your message was posted.', 'success')
          )
        }
      } catch (error) {
        commit('ADD_NOTIFICATION', new Notify(error))
      }
    },
    async getChannels({ commit, state }, token) {
      try {
        if (state.channels && state.channels.length) {
          return
        }

        const client = new Slack(token)
        const result = await client.channels.list({token})
        commit('SET_CHANNELS', result.channels)
      } catch (error) {
        commit('ADD_NOTIFICATION', new Notify(error))
      }
    }
  },
  mutations: {
    INIT_STORE(state) {
      if (localStorage.getItem('store')) {
        const $store = localStorage.getItem('store') || ''
        this.replaceState(Object.assign(state, JSON.parse($store)))
      }
    },
    SET_CHANNEL(state, channel: IChannel) {
      state.channel = channel;
    },
    SET_CHANNELS(state, channels: IChannel[]) {
      state.channels = channels
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
