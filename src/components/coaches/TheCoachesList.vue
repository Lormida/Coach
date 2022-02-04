<template>
  <base-wrapper v-if="this.getCoachesFilter && this.getCoachesFilter.length">
    <coach-item
      v-for="coach in getCoachesFilter"
      :key="coach.id"
      :coach="coach"
    ></coach-item>
  </base-wrapper>
  <h1 v-else>NONE!!</h1>
</template>

<script>
import CoachItem from './CoachItem.vue'
export default {
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
      // Возвращаем всех коучей у которых свойство areas содержит хотя бы один элемент из filter
      for (let skill of Object.values(this.getFilter)) {
        if (coach.areas.includes(skill)) return true
      }
      return false
    },
    filterByGender(coach) {
      return coach.gender == this.getFilter.gender
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
          // Пропускаем фильтер для пола
          if (this.getFilter['gender'] == undefined && curFilter == this.filterByGender) {
            return acc
          }
          return acc.filter(curFilter)
        }, this.getCoaches)
      }
    }
  }
}
</script>


<style>
</style>