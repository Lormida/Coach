<template>
  <section class="content" v-if="Object.keys(coach)">
    <base-wrapper class="header-initials">
      <div class="coach-item">
        <span class="coach-item__title"
          >{{ coach.firstName }} {{ coach.lastName }}</span
        >
        <span class="coach-item__rate">${{ coach.hourlyRate }}/hour</span>
      </div>
    </base-wrapper>

    <base-wrapper class="main-contact">
      <span class="coach-item__title">Interested? Reach out now!</span>
      <base-button
        id="super"
        class="main-contact__button"
        className="button--contact"
        >Contact</base-button
      >
    </base-wrapper>

    <base-wrapper class="footer-skills">
      <section class="skills">
        <base-badge
          class="skills__skill"
          v-for="skill in coach.areas"
          :key="skill"
          :className="skill"
        ></base-badge>
      </section>
      <p class="description">
        {{ coach.description }}
      </p>
    </base-wrapper>
  </section>
</template>

<script>
import BaseWrapper from '../UI/BaseWrapper.vue'
export default {
  components: { BaseWrapper },
  props: ['id'],
  data() {
    return {
      coach: {}
    }
  },
  created() {
    this.coach = this.$store.getters['coaches/getCertainCoach'](this.id)[0]
  }
}
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 88vh;
}
.header-initials {
  margin-top: 0;
}
.coach-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  border-radius: 10px;
  height: 80px;
  width: 100%;
  padding: 10px 0;
  // .coach-item__item__title
  &__title {
    align-self: flex-start;
    font-size: 2.2rem;
    font-weight: bold;
    letter-spacing: -1px;
    display: inline-block;
  }
  // .coach-item__rate
  &__rate {
    align-self: flex-start;
    font-size: 1.5rem;
    font-weight: 400;
  }
}
.main-contact {
  display: flex;
  flex-direction: column;
  height: 100px;
  justify-content: space-around;

  // .main-contact__button
  &__button {
    align-self: flex-start;
    margin-left: 0 !important;
  }
}
.skills {
  display: flex;
  align-self: flex-start;
  &__skill:nth-of-type(1) {
    margin-left: 0;
  }
}
.footer-skills {
  display: flex;
  flex-direction: column;
}
.description {
  margin:15px 0;
  font-size: 1.6rem;
  text-align: left;
  align-self: flex-start;
}
</style>