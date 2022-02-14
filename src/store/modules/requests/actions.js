import axios from "axios"

export default {
  createRequest({ commit }, data) {
    // Adding request to DB

    axios.post('http://localhost:3000/createRequest', {
      data
    })
      .then(() => commit('addRequest', data))
      .catch(err => console.log(err.message))
  },
  removeRequest({ commit }, id) {
    // Remove from DB
    axios.delete(`http://localhost:3000/deleteRequestById/${id}`)
      .then(() => commit('removeRequestLocal', id))
      .catch(err => console.log(err.message))
  },
  loadRequests({ commit }) {
    const axiosIns = axios.create({
      withCredentials: true,
    })

    return axiosIns.get('http://localhost:3000/getRequests')
      .then((response) => {
        commit('loadRequestsLocal', response.data.arrayRequests)
        return true
      })
      .catch(err => {
        const { message, status } = err.response.data
        commit('generateTooltipMessage', { message, status }, { root: true })
      })
  }
}
