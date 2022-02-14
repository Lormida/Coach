<template>
  <div class="form-input">
    <label class="form-input__label" :for="id">{{ label }}:</label>

    <input
      v-if="getTag === 'input'"
      class="form-input__input"
      :type="getType"
      :id="id"
      :class="{
        errorValidate: getErrorValidateLogin,
        successValidate: getSuccessValidateLogin,
      }"
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
      style="resize: none; height: 130px"
    />
  </div>
</template>

<script>
export default {
  emits: ['update:modelValue'],
  props: ['id', 'label', 'placeholder', 'modelValue', 'type', 'tag', 'validator'],
  computed: {
    getErrorValidateLogin() {
      return this.validator
    },
    getSuccessValidateLogin() {
      return !this.validator && this.modelValue != ''
    },
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
  margin: 10px 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  // .form-input__label

  &__label {
    font-size: 1.5rem;
    font-weight: bold;
    text-align: left;
    width: 25%;
  }

  // .form-input__input

  &__input {
    outline: none;
    font-size: 1.8rem;
    line-height: 1.5;
    width: 65%;
  }
}
.errorValidate {
  border: 2px solid rgb(216, 39, 39);
}
.successValidate {
  border: 2px solid rgb(67, 223, 93);
}
</style>