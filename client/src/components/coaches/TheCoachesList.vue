<template>
  <base-wrapper class="coach-wrapper" v-if="this.getCoachesFilter?.length">
    <coach-item
      v-for="coach in getCoachesFilter"
      :key="coach.id"
      :coach="coach"
    ></coach-item>
  </base-wrapper>
  <h1 v-else>There are not any coaches by current filters</h1>
</template>

<script>
import CoachItem from './CoachItem.vue'
export default {
  // No lazy!
  components: {
    CoachItem
  },
  props: ['filter', 'coaches'],
  data() {
    return {
      arrayFilter: [this.filterBySkills, this.filterByGender, this.filterByHourRate]
    }
  },
  methods: {
    isEmpty(obj) {
      return Object.keys(obj).length == 0
    },
    filterBySkills(coach) {
      // Возвращаем всех коучей у которых свойство skills содержит хотя бы один элемент из filter
      for (let skill of Object.values(this.getFilter)) {
        if (coach.skills.includes(skill)) return true
      }
      return false
    },
    filterByGender(coach) {
      return this.getFilter.gender === 'any' || coach.gender == this.getFilter.gender
    },
    filterByHourRate(coach) {
      return coach.hourlyRate >= 0 && coach.hourlyRate <= this.getFilter.rate
    },
  },
  computed: {
    getFilter() {
      return this.filter
    },
    getCoaches() {
      return this.coaches
    },
    getCoachesFilter() {
      if (!this.isEmpty(this.getFilter)) {
        return this.arrayFilter.reduce((acc, curFilter) => {
          return acc.filter(curFilter)
        }, this.getCoaches)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper-card.coach-wrapper {
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
</style>