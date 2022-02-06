<template>
  <h1 v-if="getRequests?.length == 0">There is not any requests!</h1>
  <the-requests-list v-else :requests="getRequests"></the-requests-list>
</template>

<script>

import TheRequestsList from '../components/requests/TheRequestsList.vue'
export default {
  components: {
    TheRequestsList
  },
  computed: {
    getRequests() {
      const myLogin = this.$store.getters['getMyLogin']
      if (myLogin) {
        return this.$store.getters['requests/getRequestsByCoach'](myLogin)
      }
      return this.$store.getters['requests/getRequests']
    }
  }
}
</script>

<style scoped>
h1 {
  margin: 35px 0;
  font-size: 3em;
}
</style>