<template>
  <div class="form-input">
    <label class="form-input__label" for="skills">Skills:</label>
    <select
      class="form-input__select"
      name="skills"
      id="skills"
      :values="modelValue"
      @input="update"
      multiple
    >
      <option v-for="option in getSkills" :key="option" :value="option">
        {{ option.toUpperCase() }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  emits: ['update:modelValue'],
  props: ['modelValue'],
  data() {
    return {
    }
  },
  methods: {
    update(e) {
      let array = []
      for (let option of e.target.options) {
        if (option.selected) array.push(option.value)
      }
      this.$emit('update:modelValue', array)
    }
  },
  computed: {
    getSkills() {
      return this.$store.getters['getSkills']
    }
  }
}
</script>

<style lang="scss" scoped>
.form-input {
  margin: 10px 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  @media (max-width: 1440px) {
    flex-direction: column;
  }
  // .form-input__label

  &__label {
    padding-right: 10px;
    font-size: 1.5rem;
    font-weight: bold;
    text-align: left;
    width: 30%;
    @media (max-width: 1440px) {
      margin-bottom: 10px;
      width: 100%;
      text-align: center;
    }
    @media (max-width: 768px) {
      font-size: 1.25rem;
    }
  }
  &__select {
    font-size: 1.8rem;
    line-height: 1.5;
    width: 66.6%;
    @media (max-width: 1440px) {
      width: 82.5%;
    }
    @media (max-width: 768px) {
      font-size: 1.25rem;
      width: 100%;
    }
    @media (max-width: 480px) {
      font-size: 1rem;
    }
  }
}
</style>