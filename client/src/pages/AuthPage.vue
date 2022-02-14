<template>
  <div>
    <the-form-auth></the-form-auth>
  </div>
</template>

<script>
import {defineAsyncComponent} from 'vue'

export default {
  components: {
    TheFormAuth: defineAsyncComponent(() => import('../components/auth/TheFormAuth.vue'))
  },

}
</script>

<style>
</style>