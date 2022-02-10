export default {
  loadCoachesLocal(state, arrayCoaches) {
    state.coaches = arrayCoaches
  },
  loadFilters(state, arrayCoaches) {
    let storeFilters = new Set()
    arrayCoaches.forEach(coach => {
      storeFilters.add(...coach.skills)
    })
    state.coachesFilter = storeFilters
  }
}