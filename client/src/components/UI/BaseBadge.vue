<template>
  <div class="badge" :style="randomColor">{{ className }}</div>
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
  padding: 1% 1%;
  border-radius: 5px;
  margin: 0 1%;
  width: 30%;
  height: 40px;
  font-weight: bold;
  font-size: 1.3rem;
  color: #fff;
  text-transform: uppercase;
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
  @media (max-width: 600px) {
    font-size: 1.4rem;
    min-width: 60%;
    width: fit-content;
    margin: 4px;
    padding: 1% 2%;
  }
}
</style>
