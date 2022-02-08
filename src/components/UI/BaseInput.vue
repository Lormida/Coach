<template>
  <div class="form-input">
    <label class="form-input__label" :for="id">{{ label }}:</label>

    <input
      v-if="getTag === 'input'"
      class="form-input__input"
      :type="getType"
      :id="id"
      :placeholder="placeholder"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />

    <textarea
      v-if="getTag === 'textarea'"
      class="form-input__input"
      :type="getType"
      :id="id"
      :placeholder="placeholder"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      style="resize: none; height:160px"
    />
  </div>
</template>

<script>
export default {
  emits: ['update:modelValue'],
  props: ['id', 'label', 'placeholder', 'modelValue', 'type', 'tag'],
  computed: {
    getType() {
      return this.type || 'text'
    },
    getTag() {
      return this.tag || 'input'
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

  // .form-input__input

  &__input {
    font-size: 1.8rem;
    line-height: 1.5;
    width: 70%;
  }
}
</style>