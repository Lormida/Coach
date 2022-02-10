<template>
  <span class="badge" :style="randomColor">{{ className }} </span>
</template>

<script>
export default {
  props: ['className'],
  computed: {
    randomColor() {
      const colorsArray = this.$store.getters['getColorsArray']
      return `backgroundColor: ${colorsArray[Math.floor(Math.random() * colorsArray.length)]}`
    }
  }
}
</script>

<style lang="scss" scoped>
.badge {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px 10px;
  border-radius: 5px;
  margin: 0 5px;
  width: fit-content;
  height: 30px;
  font-size: 1.6rem;
  color: #fff;
  text-transform: uppercase;
}
/* .frontend {
  background-color: rgb(37, 37, 194);
}
.backend {
  background-color: violet;
}
.career {
  background-color: rgb(218, 35, 163);
} */
</style>
