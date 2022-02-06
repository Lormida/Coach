export default {
  getRequests(state) {
    return state.requests
  },
  getRequestsByCoach(state) {
    return function (myLogin) {
      return state.requests.filter(request => request.coachEmail === myLogin)
    }
  }
}