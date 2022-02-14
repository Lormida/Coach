<template>
  <the-header></the-header>
  <spinner v-if="getIsLoadingState"></spinner>
  <router-view v-slot="{ Component }">
    <transition name="page" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>

  <tooltip-message
    v-if="getObjTooltip"
    :objTooltip="getObjTooltip"
    :seconds="3"
  ></tooltip-message>
</template>

<script>
import TooltipMessage from './components/UI/TooltipMessage'

export default {
  components: {
    TooltipMessage
  },
  mounted() {
    this.$store.dispatch('loadAuthUser')
    this.$store.commit('setInit')
  },
  computed: {
    getObjTooltip() {
      return this.$store.getters['getObjTooltip']
    },
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
