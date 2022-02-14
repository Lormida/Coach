<template>
  <div>
    <h1 v-if="getRequests?.length == 0 && !getIsLoadingState">
      There is not any requests! {{ getIsLoadingState }}
    </h1>
    <the-requests-list
      v-if="!getIsLoadingState"
      :requests="getRequests"
    ></the-requests-list>
  </div>
</template>

<script>

import TheRequestsList from '../components/requests/TheRequestsList.vue'
import Spinner from '../components/UI/Spinner.vue'
export default {
  components: {
    TheRequestsList,
    Spinner
  },
  computed: {
    getIsLoadingState() {
      return this.$store.getters['getIsLoadingState']
    },
    getRequests() {
      return this.$store.getters['requests/getRequests']
    }
  },
  created() {
    this.$store.commit('toggleIsLoadingState', true)
    this.$store.dispatch('requests/loadRequests')
      .then((status) => {
        if (!status) {
          this.$router.replace({ name: "Authorization" })
        }
        setTimeout(() => this.$store.commit('toggleIsLoadingState', false), 200)
      })
  }
}
</script>

<style scoped>
h1 {
  margin: 35px 0;
  font-size: 3em;
}
</style>