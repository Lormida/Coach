<template>
  <base-wrapper>
    <form @submit.prevent="createAccount" class="form-signup">
      <base-input
        class="form-signup__item form-signup__login"
        id="login"
        placeholder="pocketbook.love24@gmail.com"
        label="Login"
        v-model="login"
      >
      </base-input>

      <base-input
        class="form-signup__item form-signup__name"
        id="name"
        placeholder="Vasya Pupkin"
        label="Name"
        v-model="name"
      >
      </base-input>

      <base-input
        class="form-signup__item form-signup__rate"
        id="rate"
        placeholder="30"
        label="Rate/hour"
        v-model="rate"
      >
      </base-input>

      <the-skills-input v-model="skills"></the-skills-input>

      <base-input
        class="form-signup__item form-signup__description"
        id="description"
        placeholder="I am ..."
        tag="textarea"
        label="Description"
        v-model="description"
      >
      </base-input>

      <base-input
        class="form-signup__item form-signup__password"
        id="password"
        placeholder="*****"
        label="Password"
        v-model="password"
        type="password"
      >
      </base-input>

      <base-button className="button--create">Create account</base-button>
    </form>
  </base-wrapper>
</template>

<script>
import TheSkillsInput from './TheSkillsInput.vue'

export default {
  components: {
    TheSkillsInput
  },
  data() {
    return {
      login: "",
      name: "",
      rate: "",
      skills: null,
      description: "",
      password: "",
    }
  },
  methods: {
    createAccount() {
      let object = {
        login: this.login, name: this.name, rate: this.rate, skills: this.skills, description: this.description,
        password: this.password
      }
      console.log(object)
    }
  }
}
</script>

<style lang="scss" scoped>
.form-signup {
  width: 70%;
}
</style>