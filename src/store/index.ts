import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import {
  RootState,
  INotification,
  IChannel,
  ITodosBySection
} from '@/@types/types'
// tslint:disbable: no-console
// tslint:disable-next-line
const Slack = require('slack')

// Models
import Standup from '@/models/Standup'
import Chat from '@/models/Chat'
import Notify from '@/models/Notify'

// Utils
import Day from '@/utils/Day'

Vue.use(Vuex);

const store: StoreOptions<RootState> = {
  state: {
    date: Day.numeric(new Date()),
    notifications: [],
    channels: null,
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
    async newNotification({ commit }, notification: INotification) {
      commit('ADD_NOTIFICATION', notification)
      setTimeout(() => {
        commit('REMOVE_NOTIFICATION', notification.message)
      }, 3000)
    },
    async sendToSlack({ commit, state, dispatch }, token) {
      try {
        if (!state.channel) {
          dispatch('newNotification',
            new Notify('HOLD UP: You must first select a channel to post.')
          )
          return
        }

        const client = new Slack(token)
        const chat = new Chat(
          state.date,
          token,
          state.standups,
          state.channel.id,
          state.urls
        )
        const result = await client.chat.postMessage(chat.message())

        if (result.ok) {
          dispatch('newNotification',
            new Notify('SUCCESS! Your message was posted.', 'success')
          )
        }
      } catch (error) {
        dispatch('newNotification', new Notify(error))
      }
    },
    async getChannels({ commit, state, dispatch }, token) {
      try {
        if (state.channels && state.channels.length) {
          return
        }

        const client = new Slack(token)
        const result = await client.channels.list({token})
        commit('SET_CHANNELS', result.channels)
      } catch (error) {
        dispatch('newNotification', new Notify(error))
      }
    },
    async refreshPastTodos({ commit }) {
      return new Promise((resolve, reject) => {
        commit('PRESENT_TO_PAST_TODOS')
        resolve()
      })
    },
    async refreshPresentTodos({ commit }) {
      return new Promise((resolve, reject) => {
        commit('CLEAR_PRESENT_TODOS')
        resolve()
      })
    },
    async refreshTodos({ dispatch, commit }) {
      return dispatch('refreshPastTodos')
        .then(() => {
          dispatch('refreshPresentTodos').then(() => {
            commit('SET_DATE')
          })
      })
    }
  },
  mutations: {
    INIT_STORE(state) {
      if (localStorage.getItem('store')) {
        const $store = localStorage.getItem('store') || ''
        this.replaceState(Object.assign(state, JSON.parse($store)))
      }
    },
    SET_DATE(state) {
      state.date = Day.numeric(new Date())
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
    },
    PRESENT_TO_PAST_TODOS(state) {
      const present = state.standups
        .filter((standup) => standup.section === 'present')

      state.standups
        .filter((standup) => standup.section === 'past')
        .map((standup) => standup.todos = present[0].todos)
    },
    CLEAR_PRESENT_TODOS(state) {
      const present = state.standups
        .find((standup) => standup.section === 'present')

      const notDone = present!.todos
        .filter((todo) => todo.done === false)

      state.standups
        .filter((standup) => standup.section === 'present')
        .map((standup) => standup.todos = notDone)
    }
  }
}

export default new Vuex.Store(store);
