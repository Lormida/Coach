<template>
  <base-wrapper>
    <form @submit.prevent="createAccount" class="form-signup">
      <base-input
        class="form-signup__item form-signup__email"
        id="email"
        placeholder="pocketbook.love24@gmail.com"
        label="Email"
        v-model="email"
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

      <the-gender-choice
        class="form-signup__item form-signup__gender"
        name="gender"
        :values="['male', 'female']"
        label="Gender"
        v-model="gender"
      ></the-gender-choice>

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
import TheGenderChoice from './TheGenderChoice.vue'

export default {
  components: {
    TheSkillsInput,
    TheGenderChoice
  },
  data() {
    return {
      email: "",
      name: "",
      rate: "",
      gender: null,
      skills: null,
      description: "",
      password: "",
    }
  },
  methods: {
    createAccount() {
      const dataUser = {
        email: this.email, firstName: this.name.split(' ')[0], lastName: this.name.split(' ')[1],
        gender: this.gender, hourlyRate: this.rate, skills: this.skills, description: this.description,
        password: this.password
      }
      this.$store.dispatch('signUp', dataUser)
    }
  }
}
</script>

<style lang="scss" scoped>
.form-signup {
  width: 70%;
}
</style>