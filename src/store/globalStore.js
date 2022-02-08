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
      colorsArray: ['#001219', '#005f73', '#0a9396', '#94d2bd', '#e9d8a6', '#ee9b00', '#ca6702', '#ae2012', '#9b2226'],
      skillsArray: ['backend', 'frontend', 'hr', 'pr', 'team lead', 'tech lead', 'junior', 'middle', 'senior']
    }

  },
  getters: {
    getMyLogin(state) {
      return state.myLogin
    },
    getIsLoadingState(state) {
      return state.isLoading
    },
    getSkills(state) {
      return state.skillsArray
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