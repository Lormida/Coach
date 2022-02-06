export default {
  addRequest(state, data) {
    state.requests.push(data)
  },
  removeRequestLocal(state, id) {
    state.requests = state.requests.filter(request => request.id != id)
  }
}