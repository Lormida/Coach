import { createStore } from 'vuex'

import coachesModule from './modules/coaches/index.js'
import requestsModule from './modules/requests/index.js'

const store = createStore({
  modules: {
    coaches: coachesModule,
    requests: requestsModule
  },
  state() {
    return {
      myLogin: '',
      isLoading: false,
    }

  },
  getters: {
    getMyLogin(state) {
      return state.myLogin
    },
    getIsLoadingState(state) {
      return state.isLoading
    }
  },
  mutations: {
    setLogin(state, login) {
      state.myLogin = login
    },
    clearLogin(state) {
      state.myLogin = ''
    },
    toggleIsLoadingState(state, status) {
      state.isLoading = status
    }
  },
  actions: {
    loginToSystem({ commit }, login) {
      commit('setLogin', login)
    },
    exitFromSystem({ commit }) {
      commit('clearLogin')
    }
  },
})

export default store