<template>
  <base-wrapper class="filter">
    <span class="filter__title">Find Your Coach</span>
    <span class="label-info filter__label">Choose skills</span>
    <section class="coach-skills">
      <div
        class="filter__item"
        v-for="coachFilter in coachesFilter"
        :key="coachFilter"
      >
        <input
          type="checkbox"
          :name="coachFilter"
          :id="coachFilter"
          checked
          @change="updateFilter"
          :value="coachFilter"
        />
        <label :for="coachFilter">{{ coachFilter }}</label>
      </div>
    </section>

    <span class="label-info filter__label">Choose gender</span>
    <section class="coach-gender">
      <input
        type="radio"
        name="gender"
        id="male"
        value="male"
        @change="updateFilter"
      />
      <label for="male">Male</label>
      <input
        type="radio"
        name="gender"
        id="female"
        value="female"
        @change="updateFilter"
      />
      <label for="female">Female</label>
      <input
        type="radio"
        name="gender"
        id="any"
        value="any"
        checked
        @change="updateFilter"
      />
      <label for="any">Any</label>
    </section>

    <span class="label-info filter__label">Choose rate</span>
    <section class="coach-rate">
      <label for="price">Choose a maximum house price: </label>
      <input
        type="range"
        name="rate"
        id="rate"
        min="0"
        max="100"
        step="1"
        @change="updateFilter"
        v-model="valueRate"
      />
      <output class="rate-output" for="rate">0 - {{ valueRate }}</output>
    </section>
  </base-wrapper>
</template>

<script>
export default {
  props: ['coachesFilter'],
  data() {
    return {
      filterComposition: {},
      valueRate: 50
    }
  },
  mounted() {
    for (let el of document.querySelectorAll('input')) {
      if (el.name === 'gender' && el.checked) {
        this.filterComposition['gender'] = el.value
      }
      else if (el.checked) {
        this.filterComposition[el.value] = el.value
      }
      else if (el.type === 'range') {
        this.filterComposition['rate'] = el.value
      }
    }
    this.$emit('filter-updaded', this.filterComposition)
  },
  computed: {
    getCoachesFilter() {
      return this.coachesFilter || []
    }
  },
  methods: {
    updateFilter(e) {
      if (e.target.name === 'gender') {
        this.filterComposition['gender'] = e.target.value
      }
      else if (e.target.checked) {
        this.filterComposition[e.target.value] = e.target.value
      }
      else if (e.target.type === 'range') {
        this.filterComposition['rate'] = e.target.value
      }
      // Удаляем скил из фильтра
      else {
        delete this.filterComposition[e.target.value]
      }
      this.$emit('filter-updaded', this.filterComposition)
    }
  }

}
</script>

<style lang="scss" scoped>
.wrapper-card.filter {
  margin: 30px auto 50px auto;
  @media (max-width: 1280px) {
    width: 50%;
  }
  @media (max-width: 800px) {
    width: 66%;
  }
  @media (max-width: 600px) {
    width: 90%;
    padding: 10px 20px;
  }
}
.filter {
  align-items: center;
  // .filter__title
  &__title {
    padding-top: 1.5rem;
    font-size: 2.5rem;
    font-weight: 700;
    align-self: flex-start;
  }
  // .filter__label
  &__label {
    // padding: 5px 10px;
    margin: 20px 0;
    margin-bottom: 0px;
  }
  // filter__item
  &__item {
    margin: 6px 0;
  }
}
.coach-skills {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 1rem;
  font-size: 2rem;
  align-self: flex-start;
  padding-bottom: 1rem;
  label {
    margin-right: 1rem;
  }
}
.coach-gender {
  display: flex;
  align-items: center;
  margin-top: 1.5rem;
  font-size: 2rem;
  align-self: flex-start;
  padding-bottom: 1.5rem;
  label {
    margin-right: 1.5rem;
  }
}
.coach-rate {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 1.5rem;
  font-size: 2rem;
  align-self: flex-start;
  padding-bottom: 1.5rem;
  label {
    margin-right: 1.5rem;
      @media (max-width: 480px) {
      font-size: 1.41rem;
    }
  }
}
.label-info {
  align-self: flex-start;
  font-size: 2rem;
  padding: 1px 3px;
  border: 1px solid #000;
}
</style>