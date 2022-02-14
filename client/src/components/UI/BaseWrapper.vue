<template>
  <div class="wrapper-card">
    <slot name="default"> </slot>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.wrapper-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px 50px;
  margin: 15px auto;
  width: 40%;
  border-radius: 6px;
  box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.8);
}
</style>