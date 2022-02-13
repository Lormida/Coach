import axios from 'axios'

export default {
  loadCoaches({ commit }) {
    // Get requests from DB

    const axiosIns = axios.create({
      withCredentials: true,
    })

    return axiosIns.get('http://localhost:3000/getCoaches')
      .then(response => {
        if (response.data?.err) {
          const { error, statusCode, status } = response.data.err
          commit('generateTooltipMessage', { error, statusCode, status }, { root: true })
        }
        commit('loadCoachesLocal', response.data.arrayCoaches)
      })
      .catch(err => console.log(err.message))
  }
}