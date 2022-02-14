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
      init: null,
      objTooltip: null,
      myLogin: '',
      isLoading: false,
      colorsArray: ['#001219', '#ffafcc', '#4cc9f0', '#ffc6ff', '#ff4d6d', '#dee2ff', '#7b2cbf', '#EC058E', '#005f73', '#0a9396', '#94d2bd', '#e9d8a6', '#ee9b00', '#ca6702', '#ae2012', '#9b2226'],
      skillsArray: ['backend', 'frontend', 'hr', 'pr', 'team lead', 'tech lead', 'junior', 'middle', 'senior']
    }

  },
  getters: {
    getObjTooltip(state) {
      return state.objTooltip
    },
    getMyLogin(state) {
      return state.myLogin
    },
    getInit(state) {
      return state.init
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
    generateTooltipMessage(state, objTooltip) {
      state.objTooltip = objTooltip
    },
    setLogin(state, login) {
      state.myLogin = login
    },
    clearLogin(state) {
      state.myLogin = ''
    },
    setInit(state) {
      state.init = true
    },
    toggleIsLoadingState(state, status) {
      state.isLoading = status
    },
    clearMessages(state) {
      state.objTooltip = null
    }
  },
  actions: {
    loginToSystem({ commit }, dataAuth) {
      const axiosIns = axios.create({
        withCredentials: true,
      })

      return axiosIns.post('http://localhost:3000/loginCoach',
        dataAuth,
      )
        .then(response => {
          commit('setLogin', response.data.data.email)
          const { message, status } = response.data
          commit('generateTooltipMessage', { message, status }, { root: true })
          return true
        })
        .catch(err => {
          const { message, status } = err.response.data
          commit('generateTooltipMessage', { message, status }, { root: true })
        })
    },
    exitFromSystem({ commit, dispatch }) {
      const axiosIns = axios.create({
        withCredentials: true,
      })

      return axiosIns.post('http://localhost:3000/logout',
        {},
      )
        .then((response) => {
          // Remove all data
          dispatch('clearDataInSystem')
          const { message, status } = response.data
          commit('generateTooltipMessage', { message, status }, { root: true })
          return true
        })
        .catch(err => {
          const { message, status } = err.response.data
          commit('generateTooltipMessage', { message, status }, { root: true })
        })
    },
    signUp({ commit }, data) {

      return axios.post('http://localhost:3000/createCoach', {
        data
      })
        .then(response => {
          const { message, status } = response.data
          commit('generateTooltipMessage', { message, status }, { root: true })
          return true
        })
        .catch(err => {
          const { message, status } = err.response.data
          commit('generateTooltipMessage', { message, status }, { root: true })
        })
    },
    loadAuthUser({ commit }) {
      const axiosIns = axios.create({
        withCredentials: true,
      })

      return axiosIns.get('http://localhost:3000/loadAuthUser')
        .then(response => {
          const login = response.data.data
          commit('setLogin', login)
          return login
        })
        .catch(err => console.log(err.message))
    },
    clearDataInSystem({ commit }) {
      commit('clearLogin')
      commit('requests/clearRequests')
    }
  },
})

export default store