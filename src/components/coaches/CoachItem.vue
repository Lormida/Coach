<template>
  <div class="coach-item">
    <span class="coach-item__title"
      >{{ coach.firstName }} {{ coach.lastName }}</span
    >
    <span class="coach-item__rate">${{ coach.hourlyRate }}/hour</span>
    <span class="coach-item__gender"
      >Gender : <span :class="genderClass">{{ coach.gender }}</span></span
    >
    <section class="skills">
      <base-badge
        class="skills__skill"
        v-for="skill in coach.areas"
        :key="skill"
        :className="skill"
      ></base-badge>
    </section>
    <section class="buttons-container">
      <base-button
        class="buttons-container__contact"
        className="button--contact"
        >Contact</base-button
      >

      <router-link :to="linkToCoachDetails">
        <base-button
          class="buttons-container__view-details"
          className="button--details"
        >Details</base-button>
      </router-link>
    </section>
  </div>
</template>

<script>
export default {
  props: ['coach'],
  computed: {
    linkToCoachDetails() {
      return `${this.$route.path}/${this.coach.id}`
    },
    genderClass() {
      return this.coach.gender
    }
  }
}
</script>

<style lang="scss" scoped>
.coach-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  border: 2px solid #000;
  border-radius: 10px;
  height: 250px;
  width: 100%;
  margin: 10px 0;
  padding: 20px 20px;

  // .coach-item__item__title
  &__title {
    align-self: flex-start;
    font-size: 2.2rem;
    font-weight: 800;
  }
  // .coach-item__rate
  &__rate {
    align-self: flex-start;
    font-size: 1.5rem;
    font-weight: 600;
  }
  // .coach-item__gender
  &__gender {
    align-self: flex-start;
    font-size: 1.5rem;
    font-weight: 400;
  }
}
.skills {
  display: flex;
  align-self: flex-start;
}
.buttons-container {
  align-self: flex-end;
}
.male {
  border-bottom: 4px solid blue;
}
.female {
  border-bottom: 4px solid pink;
}
</style>