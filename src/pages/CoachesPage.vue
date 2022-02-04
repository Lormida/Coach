<template>
  <the-coaches-filter @filter-updaded="updateFilter"></the-coaches-filter>
  <the-coaches-list :coaches="coaches" :filter="getFilter"></the-coaches-list>
</template>

<script>
import TheCoachesFilter from '../components/coaches/TheCoachesFilter.vue'
import TheCoachesList from '../components/coaches/TheCoachesList.vue'

export default {
  components: {
    TheCoachesFilter,
    TheCoachesList
  },
  data() {
    return {
      coaches: [],
      filter: {  }
    }
  },
  computed: {
    getCoaches() {
      return this.$store.getters['coaches/getCoaches']
    },
    getFilter(){
      return this.filter
    }
  },
  methods: {
    updateFilter(filter) {
      // console.log(filter)
      this.filter = filter
    }
  },
  created() {
    this.coaches = this.getCoaches
  }
}
</script>

<style>
</style>