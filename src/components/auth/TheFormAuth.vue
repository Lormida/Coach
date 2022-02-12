<template>
  <form @submit.prevent="loginToSystem" class="form" name="auth">
    <base-input
      class="form-login__item form-login__email"
      id="email"
      :validator="getErrorValidateLogin"
      placeholder="Email"
      label="Email"
      v-model="email"
    >
    </base-input>

    <base-input
      class="form-login__item form-login__password"
      id="password"
      placeholder="*****"
      label="Password"
      v-model="password"
      type="password"
    >
    </base-input>

    <base-button
      :disabled="errorValidateLogin || email === ''"
      type="submit"
      class="form-input__btn-login"
      className="button--login"
      >Login to system</base-button
    >
  </form>
</template>

<script>
export default {
  data() {
    return {
      errorValidateLogin: false,
      focusIsActive: false,
      password: '',
      email: ''
    }
  },
  computed: {
    getCoaches() {
      return this.$store.getters['coaches/getCoaches']
    },
    getErrorValidateLogin() {
      return this.errorValidateLogin
    }
  },
  methods: {
    loginToSystem() {
      this.$store.dispatch('loginToSystem', { email: this.email, password: this.password })
        .then(() => this.$router.push({ name: "Coaches" }))
      this.email = ''
      this.password = ''
    },
    validator(string) {
      return string.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
    },
  },
  watch: {
    email(value) {
      if (this.validator(value)) {
        this.errorValidateLogin = false
      } else {
        // Неверный формат ввода
        this.errorValidateLogin = true
      }
    }
  }

}
</script>

<style lang="scss" scoped>
.form {
  padding: 20px;
  margin: 0 auto;
  margin-top: 50px;
  width: 20%;
  border-radius: 20px;
  box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.8);
  border: 1px solid rgba(22, 22, 22, 0.1);
}

.form-input__btn-login {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 15px;
  font-size: 1.8rem;
  margin: 20px auto 10px auto;
}
</style>