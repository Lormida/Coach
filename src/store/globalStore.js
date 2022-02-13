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
      errorObject: {},
      myLogin: '',
      isLoading: false,
      colorsArray: ['#001219', '#ffafcc', '#4cc9f0', '#ffc6ff', '#ff4d6d', '#dee2ff', '#7b2cbf', '#EC058E', '#005f73', '#0a9396', '#94d2bd', '#e9d8a6', '#ee9b00', '#ca6702', '#ae2012', '#9b2226'],
      skillsArray: ['backend', 'frontend', 'hr', 'pr', 'team lead', 'tech lead', 'junior', 'middle', 'senior']
    }

  },
  getters: {
    getErrorObject(state) {
      return state.errorObject
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
    generateTooltipMessage(state, errorObject) {
      state.errorObject = errorObject
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
    clearMessages(state) {
      state.errorObject = {}
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
          if (response.data?.err) {
            const { error, statusCode, status } = response.data.err
            commit('generateTooltipMessage', { error, statusCode, status }, { root: true })
            return false
          } else {
            commit('setLogin', response.data.data.email)

            const { status, message } = response.data
            commit('generateTooltipMessage', { error: message, status }, { root: true })
            return true
          }
        })
        .catch(err => console.log(err.message))



    },
    exitFromSystem({ commit }) {
      const data = ''

      const axiosIns = axios.create({
        withCredentials: true,
      })

      axiosIns.post('http://localhost:3000/logout',
        data,
      )
        .then((response) => {
          if (response.data?.err) {
            const { error, statusCode, status } = response.data.err
            commit('generateTooltipMessage', { error, statusCode, status }, { root: true })
          } else {
            commit('clearLogin')
            const { status, message } = response.data
            commit('generateTooltipMessage', { error: message, status }, { root: true })
          }
        })
        .catch(err => console.log(err.message))

    },
    signUp({ commit }, data) {

      axios.post('http://localhost:3000/createCoach', {
        data
      })
        .then(response => {
          console.log(response.data)

          if (response.data?.err) {
            const { error, statusCode, status } = response.data.err
            commit('generateTooltipMessage', { error, statusCode, status }, { root: true })
          } else {
            const { status, message } = response.data
            commit('generateTooltipMessage', { error: message, status }, { root: true })
          }
        })
    },
    loadAuthUser({ commit }) {
      const axiosIns = axios.create({
        withCredentials: true,
      })

      return axiosIns.get('http://localhost:3000/loadAuthUser')
        .then(response => {
          commit('setLogin', response.data.data)
        })
        .catch(err => console.log(err.message))
    }
  },
})

export default store