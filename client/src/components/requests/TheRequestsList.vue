<template>
  <transition-group
    name="accordion"
    tag="ul"
    class="accordion-wrapper"
    mode="out-in"
  >
    <accordion-item
      v-for="request in requests"
      :key="request.id"
      :request="request"
    ></accordion-item>
  </transition-group>
</template>

<script>
import { defineAsyncComponent } from 'vue'

export default {
  components: {
    AccordionItem: defineAsyncComponent(() => import('./AccordionItem.vue'))
  },
  props: ['requests']
}
</script>

<style lang="scss" scoped>
.accordion-wrapper {
  margin-top: 25px;
}

.accordion-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}

.accordion-leave-from {
  transform: translateX(0%);
  opacity: 1;
}

.accordion-leave-active {
  transition: all 0.3s ease 0s;
}

.accordion-move {
  transition: all 0.2s ease;
}
</style>