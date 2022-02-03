<template>
  <the-coaches-filter></the-coaches-filter>
  <the-coaches-list :coaches="coaches"></the-coaches-list>
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
    }
  },
  computed: {
    getCoaches() {
      return this.$store.getters['coaches/getCoaches']
    }
  },
  created() {
    this.coaches = this.getCoaches
  }
}
</script>

<style>
</style>