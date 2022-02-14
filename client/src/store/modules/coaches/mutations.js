export default {
  loadCoachesLocal(state, arrayCoaches) {
    state.coaches = arrayCoaches
  },
  loadFilters(state, arrayCoaches) {
    let storeFilters = new Set()
    arrayCoaches.forEach(coach => {
      coach.skills.forEach(skill => storeFilters.add(skill))
    })
    state.coachesFilter = storeFilters
  }
}