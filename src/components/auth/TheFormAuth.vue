<template>
  <form @submit.prevent="loginToSystem" class="form" name="auth">
    <div class="form-input">
      <input
        :class="{ errorValidate: getErrorValidateLogin && !focusIsActive }"
        @input="validateLogin"
        @blur="this.focusIsActive = false"
        list="coaches-login"
        class="form-input__login"
        placeholder="Enter login..."
        name="login"
        type="text"
        v-model="loginValue"
      />
      <datalist id="coaches-login">
        <option
          v-for="coach in getCoaches"
          :key="coach.id"
          :value="coach.email"
        ></option>
      </datalist>
    </div>
    <base-button
      :disabled="errorValidateLogin || loginValue === ''"
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
      loginValue: '',
      errorValidateLogin: false,
      focusIsActive: false
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
      console.log(this.loginValue)
      this.$store.dispatch('loginToSystem', this.loginValue)
      this.loginValue = ''
    },
    focusLogin() {
      this.focusIsActive = true
    },
    validator(string) {
      return string.length > 3 && string.includes('@') && string.includes('.')
    },
    validateLogin(e) {
      this.focusLogin()

      if (this.validator(e.target.value)) {
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
.form-input {
  display: flex;
  width: 100%;
  justify-content: center;

  // .form-input__login
  &__login {
    font-size: 1.7rem;
  }

  // .form-input__btn-login
  &__btn-login {
    margin: 20px 0 10px 0 !important;
  }
}
.errorValidate {
  border: 2px solid rgb(216, 39, 39);
}
</style>