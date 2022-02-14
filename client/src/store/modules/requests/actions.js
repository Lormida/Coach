import axios from "axios"

export default {
  createRequest({ commit }, data) {
    // Adding request to DB

    axios.post('api/createRequest', {
      data
    })
      .then(() => commit('addRequest', data))
      .catch(err => console.log(err.message))
  },
  removeRequest({ commit }, id) {
    // Remove from DB
    axios.delete(`api/deleteRequestById/${id}`)
      .then(() => commit('removeRequestLocal', id))
      .catch(err => console.log(err.message))
  },
  loadRequests({ commit }) {
    const axiosIns = axios.create({
      withCredentials: true,
    })

    return axiosIns.get('api/getRequests')
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
