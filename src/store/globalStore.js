import { createStore } from 'vuex'

import axios from 'axios'
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
      colorsArray: ['#001219', '#ffafcc', '#4cc9f0', '#ffc6ff', '#ff4d6d', '#dee2ff', '#7b2cbf', '#EC058E', '#005f73', '#0a9396', '#94d2bd', '#e9d8a6', '#ee9b00', '#ca6702', '#ae2012', '#9b2226'],
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
    },
    getColorsArray(state) {
      return state.colorsArray
    },
    getSkillsArray(state) {
      return state.skillsArray
    },
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
    },
    signUp(_, data) {
      axios.post('http://localhost:3000/createCoach', {
        data
      })
    }
  },
})

export default store