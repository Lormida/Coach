<template>
  <div class="form-input">
    <label class="form-input__label" :for="name">{{ label }}:</label>
    <div class="gender">
      <div class="gender__item" v-for="value in values" :key="value">
        <input
          class="gender__input"
          type="radio"
          :name="name"
          :id="value"
          :value="modelValue"
          @input="$emit('update:modelValue', $event.target.id)"
        />
        <label class="gender__label" :for="value">{{ value }}</label>
      </div>
    </div>
  </div>
</template>


<script>

export default {
  emits: ['update:modelValue'],
  props: ['values', 'name', 'label', 'modelValue'],
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
  // margin: 10px 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: auto;

  @media (max-width: 1440px) {
    flex-direction: column;
  }

  // .form-input__label

  &__label {
    // padding-right: 10px;
    font-size: 1.5rem;
    font-weight: bold;
    text-align: left;
    flex-basis: 30%;
    @media (max-width: 1440px) {
      margin-bottom: 10px;
      text-align: center;
    }
    @media (max-width: 768px) {
      font-size: 1.25rem;
    }
  }
}

.gender {
  display: flex;
  flex-basis: 65%;
  width: 90%;
  padding: 15px 5px 30px 0;
  border: 1px solid #000;
  @media (max-width:1440px) {
    width: 82.5%;
  }

  // .container-gender__item

  &__item {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 50%;
  }

  &__label {
    position: relative;
    font-size: 1.6rem;
    width: 50%;
    @media (max-width: 768px) {
      font-size: 1.25rem;
    }
  }

  &__input {
    display: none;
    font-size: 1.8rem;
    line-height: 1.5;
    width: 65%;
  /*   @media (max-width: 1440px) {
      width: 82.5%;
    } */
    @media (max-width: 768px) {
      width: 100%;
    }
  }
}
.gender__label::before {
  position: absolute;
  left: 50%;
  transform: translateX(-50%) translateY(110%);
  line-height: 2;
  content: "";
  display: inline-block;
  width: 1em;
  height: 1em;
  flex-shrink: 0;
  flex-grow: 0;
  border: 1px solid #adb5bd;
  border-radius: 0.25em;
  margin-right: 0.5em;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 50% 50%;
}

.gender__input:checked + label::before {
  border-color: #0b76ef;
  background-color: #0b76ef;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%23fff' d='M6.564.75l-3.59 3.612-1.538-1.55L0 4.26 2.974 7.25 8 2.193z'/%3e%3c/svg%3e");
}
</style>