export default {
  createRequest({ commit }, data) {
    commit('addRequest', data)
  },
  removeRequest({commit}, id) {
    commit('removeRequestLocal', id)
  }
}