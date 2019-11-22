import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import {
  RootState,
  INotification,
  IChannel,
  ITodosBySection
} from '@/@types/types'

// Models
import Standup from '@/models/Standup'
import Slack from '@/models/Slack'
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
    async sendToSlack({ commit, state }) {
      try {
        if (!state.channel) {
          commit('ADD_NOTIFICATION',
            new Notify('HOLD UP: You must first select a channel to post.')
          )
          return
        }

        const slack = new Slack(
          state.standups,
          state.channel.id,
          state.urls
        )

        // TODO: Instansiate Client and Send to Slack
        // const client = new WebClient(state.token)
        // const result = await client.chat.postMessage(slack.message())

        // if (result.ok) {
        //   commit('ADD_NOTIFICATION',
        //     new Notify('SUCCESS! Your message was posted.', 'success')
        //   )
        // }
      } catch (error) {
        // if (error.code === ErrorCode.PlatformError) {
        //   commit('ADD_NOTIFICATION', new Notify(error.data))
        // } else {
        //   // Some other error, oh no!
        //   commit('ADD_NOTIFICATION', new Notify('Whoops! Call Dustin.'))
        // }
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
