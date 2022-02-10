import axios from 'axios'

export default {
  loadCoaches({ commit }) {
    // Get requests from DB
    return axios.get('http://localhost:3000/getCoaches')
      .then(response => {
        commit('loadCoachesLocal', response.data.arrayCoaches)
      })
      .catch(err => console.log(err))
  }
}