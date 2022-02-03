<template>
  <ul>
    <li v-for="coach in coaches" :key="coach.id">{{ coach }}</li>
  </ul>
</template>

<script>
export default {
  props: {
    coaches: {
      type: Object,
      required: true
    }
  }
}
</script>

<style>
</style>