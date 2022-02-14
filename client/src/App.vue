<template>
  <div>
    <the-header></the-header>
    <spinner v-if="getIsLoadingState"></spinner>
    <router-view v-slot="{ Component }">
      <transition name="page" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>

    <template v-if="getArrayObjTooltip">
      <tooltip-wrapper>
        <tooltip-message
          v-for="objTooltip in getArrayObjTooltip"
          :key="objTooltip.id"
          :objTooltip="objTooltip"
          :seconds="3"
        ></tooltip-message>
      </tooltip-wrapper>
    </template>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'

export default {
  components: {
    TooltipMessage: defineAsyncComponent(() => import('./components/UI/TooltipMessage')),
    TooltipWrapper: defineAsyncComponent(() => import('./components/UI/TooltipWrapper')),
  },
  created() {
    this.$store.dispatch('loadAuthUser')
  },
  computed: {
    getArrayObjTooltip() {
      return this.$store.getters['getArrayObjTooltip']
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
