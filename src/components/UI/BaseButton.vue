<template>
  <button class="button" :class="btnClass">
    <slot></slot>
  </button>
</template>

<script>

export default {
  props: ['className'],
  computed: {
    btnClass() {
      return this.className
    }
  }
}
</script>

<style lang="scss" scoped>
.button {
  font-size: 1.7rem;
  font-weight: 700;
  text-align: center;
  width: fit-content;
  height: 40px;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  margin: 0 1rem;
  background-color: #000;
  color: #fff;
  transition: all 0.2s ease-in-out 0s;
}
.button--contact {
  background-color: #fff;
  color: #000;
  border: 1px solid #000;
  &:hover {
    color: #fff;
    background-color: #000;
    border: 1px solid #fff;
    cursor: pointer;
  }
}
.button--details {
  background-color: rgb(95, 13, 121);
  color: #fff;
  border: 1px solid rgb(95, 13, 121);
  &:hover {
    color: rgb(95, 13, 121);
    background-color: #fff;
    border: 1px solid rgb(95, 13, 121);
    cursor: pointer;
  }
}
</style>
