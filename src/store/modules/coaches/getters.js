export default {
  getCoaches(state) {
    return state.coaches
  },
  getCertainCoach: (_, getters) => (id) => {
    return getters.getCoaches.filter(coach => coach.id == id)
  },
  getCoachesFilter(state) {
    return [...state.coachesFilter]
  }

}
