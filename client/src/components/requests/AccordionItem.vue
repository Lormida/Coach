<template>
  <div>
    <div @click.self="toggleArrow" class="accordion">
      <span @click.self="toggleArrow" class="accordion__coach-email"
        >[Coach email] : {{ request.coachEmail }}</span
      >
      <div class="button-angle-wrapper">
        <span
          @click.self="toggleArrow"
          :class="getCurrentArrowClass"
          class="accordion__arrow"
        >
        </span>
        <span class="accordion__arrow-close" @click="removeRequest"> </span>
      </div>
    </div>

    <transition name="accordion-item">
      <div class="accordion__content" v-if="!this.arrowIndex">
        <div class="accordion__content-text">
          <p style="font-weight: 800; margin-bottom: 20px">
            [Message from
            <span class="accordion__contact-email">{{
              request.contactEmail
            }}</span
            >]:
          </p>
          {{ request.contactMessage }}
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: ['request'],
  data() {
    return {
      arrowArray: ['arrow--down', 'arrow--right'],
      arrowIndex: 1,
    }
  },
  computed: {
    getCurrentArrowClass() {
      return this.arrowArray[this.arrowIndex]
    }
  },
  methods: {
    toggleArrow() {
      this.arrowIndex = Number(!this.arrowIndex)
    },
    removeRequest() {
      this.$store.dispatch('requests/removeRequest', this.request.id)
    }
  }
}
</script>

<style lang="scss" scoped>
$midnight: #2c3e50;
$clouds: #ecf0f1;
.accordion {
  display: flex;
  justify-content: space-between;
  width: 90%;
  margin: 0 auto;
  background-color: $midnight;
  padding: 20px 0px;
  text-align: left;
  border-left: 4px solid $midnight;
  border-right: 4px solid $midnight;

  @media (max-width: 768px) {
  }

  &:hover {
    background-color: darken($midnight, 20%);
    cursor: pointer;
  }
  // .accordion__coach-email
  &__coach-email {
    display: flex;
    align-items: center;
    font-size: 1.5rem;
    margin-left: 20px;
    color: #fff;
    font-weight: 700;

    @media (max-width: 600px) {
      font-size: 1.1rem;
    }

    @media (max-width: 480px) {
      font-size: 0.9rem;
    }
  }

  &__content {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: 1.8em;
    height: auto;
    color: $midnight;
    border-left: 4px solid $midnight;
    border-right: 4px solid $midnight;
    border-bottom: 4px solid $midnight;
    width: 90%;
    margin: 0 auto;
  }
  &__content-text {
    display: block;
    margin-left: 5%;
    min-height: 50px;
    height: auto;
    width: 90%;
    padding: 20px 0;
    text-align: left;
    word-wrap: break-word;
    line-height: 1.3;
  }
}
.accordion__contact-email {
  color: green;
}
.accordion__arrow-close {
  width: 30px;
  height: 30px;
  mask-image: url("../../assets/close.svg");
  mask-repeat: no-repeat;
  background-color: #ca3f3f;

  @media (max-width: 480px) {
    width: 20px;
    height: 20px;
  }
}
// .accordion__arrow

.accordion__arrow {
  margin-right: 20px;
  width: 30px;
  height: 30px;
  @media (max-width: 480px) {
    width: 20px;
    height: 20px;
  }
}
.arrow--down {
  mask-image: url("../../assets/down-chevron.svg");
  mask-repeat: no-repeat;
  background-color: #fff;
}
.arrow--right {
  mask-image: url("../../assets/right-chevron.svg");
  mask-repeat: no-repeat;
  background-color: #fff;
}
.button-angle-wrapper {
  // width: 100%;
  margin-right: 5%;
  height: 100%;
  display: flex;
}
// accordion-item

.accordion-item-enter-from,
.accordion-item-leave-to {
  opacity: 0;
}

.accordion-item-enter-to,
.accordion-item-leave-from {
  opacity: 1;
}

.accordion-item-enter-active {
  transition: all 0.25s ease-in-out 0s;
}

.accordion-item-leave-active {
  transition: all 0.25s ease-in-out 0s;
}
</style>