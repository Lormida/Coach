<template>
  <the-header></the-header>
  <spinner v-if="getIsLoadingState"></spinner>
  <router-view v-slot="{ Component }">
    <transition name="page" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>

  <!-- <tooltip-message></tooltip-message> -->
</template>

<script>

export default {
  mounted() {
    this.$store.dispatch('loadAuthUser')
  },
  created() {

  },
  computed: {
    getIsLoadingState() {
      return this.$store.getters['getIsLoadingState']
    },
  }
}
</script>

<style lang="scss">
.active {
  transition: all 0.3s ease 0s;
  border-bottom: 4px solid #fff !important;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}

.page-enter-to,
.page-leave-from {
  opacity: 1;
  transform: translateX(0px);
}

.page-enter-active {
  transition: all 0.5s ease 0s;
}

.page-leave-active {
  transition: all 0.1s ease 0s;
}
</style>
