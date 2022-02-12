import axios from 'axios'

export default {
  loadCoaches({ commit }) {
    // Get requests from DB

    const axiosIns = axios.create({
      withCredentials: true,
    })

    return axiosIns.get('http://localhost:3000/getCoaches')
      .then(response => {
        commit('loadCoachesLocal', response.data.arrayCoaches)
      })
      .catch(err => console.log(err.message))
  }
}