<template>
  <div class="wrapper">
    <slot name="default"> </slot>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  top: 1%;
  left: 50%;
  transform: translate(-50%);
  position: fixed;
}
</style>