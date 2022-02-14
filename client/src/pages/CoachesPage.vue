<template>
  <div v-if="getCoachesFilter">
    <the-coaches-filter
      @filter-updaded="updateFilter"
      :coachesFilter="getCoachesFilter"
    ></the-coaches-filter>
    <the-coaches-list
      v-if="!getIsLoadingState"
      :coaches="getCoaches"
      :filter="getFilter"
    ></the-coaches-list>
  </div>
</template>

<script>
import TheCoachesFilter from '../components/coaches/TheCoachesFilter.vue'
import TheCoachesList from '../components/coaches/TheCoachesList.vue'

// No lazy!!
export default {
  components: {
    TheCoachesFilter,
    TheCoachesList,
  },
  data() {
    return {
      coaches: [],
      filter: {},
      coachesFilter: null
    }
  },
  computed: {
    getCoachesFilter() {
      return this.coachesFilter
    },
    getIsLoadingState() {
      return this.$store.getters['getIsLoadingState']
    },
    getFilter() {
      return this.filter
    },
    getCoaches() {
      return this.$store.getters['coaches/getCoaches']
    }
  },
  methods: {
    updateFilter(filter) {
      this.filter = filter
    }
  },
  created() {
    this.$store.commit('toggleIsLoadingState', true)
    this.$store.dispatch('coaches/loadCoaches')
      .then(() => {
        this.$store.commit('coaches/loadFilters', this.$store.getters['coaches/getCoaches'])
        this.coachesFilter = this.$store.getters['coaches/getCoachesFilter']
        setTimeout(() => this.$store.commit('toggleIsLoadingState', false), 200)
      })
  }

}
</script>

<style>
</style>