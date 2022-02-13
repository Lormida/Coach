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
      .then(response => {
        if (response.data?.err) {
          const { error, statusCode, status } = response.data.err
          commit('generateTooltipMessage', { error, statusCode, status }, { root: true })
        }
        commit('loadRequestsLocal', response.data.arrayRequests
        )
      })
      .catch(err => console.log(err.message))
  }
}