<template>
  <the-sign-up-form></the-sign-up-form>
</template>

<script>
import { defineAsyncComponent } from 'vue'

export default {
  components: {
    TheSignUpForm: defineAsyncComponent(() => import('../components/auth/TheSignUpForm.vue'))
  },
}
</script>

<style>
</style>