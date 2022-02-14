import { createStore } from 'vuex'
import axios from 'axios'
import coachesModule from './modules/coaches/index.js'
import requestsModule from './modules/requests/index.js'

let url = '/api'

const store = createStore({
  modules: {
    coaches: coachesModule,
    requests: requestsModule
  },
  state() {
    return {
      arrayObjTooltip: [],
      myLogin: '',
      isLoading: false,
      colorsArray: ['#001219', '#ffafcc', '#4cc9f0', '#ffc6ff', '#ff4d6d', '#dee2ff', '#7b2cbf', '#EC058E', '#005f73', '#0a9396', '#94d2bd', '#e9d8a6', '#ee9b00', '#ca6702', '#ae2012', '#9b2226'],
      skillsArray: ['backend', 'frontend', 'hr', 'pr', 'team lead', 'tech lead', 'junior', 'middle', 'senior']
    }

  },
  getters: {
    getArrayObjTooltip(state) {
      return state.arrayObjTooltip
    },
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
    generateTooltipMessage(state, objTooltip) {
      objTooltip.id = Date.now()
      state.arrayObjTooltip.push(objTooltip)
    },
    setLogin(state, login) {
      state.myLogin = login
    },
    clearLogin(state) {
      state.myLogin = ''
    },
    toggleIsLoadingState(state, status) {
      state.isLoading = status
    },
    clearMessageById(state, id) {
      state.arrayObjTooltip = state.arrayObjTooltip.filter(tooltip => tooltip.id != id)
    }
  },
  actions: {
    loginToSystem({ commit }, dataAuth) {
      const axiosIns = axios.create({
        withCredentials: true,
      })

      return axiosIns.post(`${url}/loginCoach`,
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

      return axiosIns.post(`${url}/logout`,
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

      return axios.post(`${url}/createCoach`, {
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

      return axiosIns.get(`${url}/loadAuthUser`)
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