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
  margin: 10px 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  // .form-input__label

  &__label {
    padding-right: 10px;
    font-size: 1.8rem;
    font-weight: bold;
    text-align: left;
    width: 30%;
  }
  &__select {
    font-size: 1.8rem;
    line-height: 1.5;
    width: 70%;
    // min-width: 200px;
    // max-width: 200px;
  }
}
</style>