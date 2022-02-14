<template>
  <div class="dialog">
    <h3 class="dialog__title">Thank you ! Your request was been sent!</h3>
    <base-button
      @click="closeDialog"
      className="button--contact"
      class="dialog__close"
      >Ok!</base-button
    >
  </div>
</template>

<script>
import BaseButton from '../UI/BaseButton.vue'
export default {
  emits: ['close-dialog'],
  props: ['open'],
  components: { BaseButton },
  methods: {
    closeDialog() {
      this.$emit('close-dialog', false)
    }
  }
}
</script>

<style lang="scss" scoped>
.dialog {
  opacity: 1;
  position: fixed;
  top: 40%;
  left: 50%;
  transform: translateX(-50%);
  width: 300px;
  height: 90px;
  text-align: center;
  z-index: 1000000;
  border: none;
  background-color: pink;
  padding: 2rem;
  border-radius: 6px;
  box-shadow: 0 0 40px rgba(0, 0, 0, 0.9), 0 0 10px rgba(0, 0, 0, 0.9);
}
.dialog__title {
  font-size: 1.6rem;
}
.dialog__close {
  width: 40%;
  margin-top: 20px;
}
</style>