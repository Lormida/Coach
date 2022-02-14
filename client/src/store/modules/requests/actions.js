import axios from "axios"

let url = '/api'

export default {
  createRequest({ commit }, data) {
    // Adding request to DB
    console.log('Create request!')

    const axiosIns = axios.create({
      withCredentials: true,
    })

    return axiosIns.post(`${url}/addRequest`, {
      data
    })
      .then(() => commit('addRequest', data))
      .catch(err => console.log(err.message))
  },
  removeRequest({ commit }, id) {
    // Remove from DB
    axios.delete(`${url}/deleteRequestById/${id}`)
      .then(() => commit('removeRequestLocal', id))
      .catch(err => console.log(err.message))
  },
  loadRequests({ commit }) {
    const axiosIns = axios.create({
      withCredentials: true,
    })

    return axiosIns.get(`${url}/getRequests`)
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
