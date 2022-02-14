<template>
  <div v-if="!getIsLoadingState || Object.keys(getCoach).length">
    <transition name="dialog-success">
      <the-dialog-window-success
        @close-dialog="toggleDialog"
        v-if="open"
      ></the-dialog-window-success>
    </transition>

    <transition name="modal-contact">
      <the-modal-contact
        :coachEmail="$store.getters['coaches/getCertainCoach'](id)[0].email"
        @close-modal="toggleModalContact"
        @open-dialog="toggleDialog"
        v-if="modalContactIsOpen"
      ></the-modal-contact>
    </transition>

    <section class="content" v-if="Object.keys(coach)">
      <base-wrapper class="header-initials">
        <div class="coach-item">
          <span class="coach-item__title"
            >{{ coach.firstName }} {{ coach.lastName }}</span
          >
          <span class="coach-item__rate">${{ coach.hourlyRate }}/hour</span>
        </div>
      </base-wrapper>

      <base-wrapper class="main-contact">
        <span class="coach-item__title">Interested? Reach out now!</span>
        <base-button
          @click="toggleModalContact(true)"
          class="main-contact__button"
          className="button--contact"
          >Contact</base-button
        >
      </base-wrapper>

      <base-wrapper class="footer-skills">
        <section class="skills">
          <base-badge
            class="skills__skill"
            v-for="skill in coach.skills"
            :key="skill"
            :className="skill"
          ></base-badge>
        </section>
        <p class="description">
          {{ coach.description }}
        </p>
      </base-wrapper>
    </section>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'

export default {
  components: {
    TheModalContact: defineAsyncComponent(() => import('./TheModalContact.vue')),
    TheDialogWindowSuccess: defineAsyncComponent(() => import('../requests/TheDialogWindowSuccess.vue'))
  },
  props: ['id'],
  data() {
    return {
      modalContactIsOpen: false,
      coach: {},
      open: false
    }
  },
  methods: {
    toggleModalContact(status) {
      this.modalContactIsOpen = status
    },
    toggleDialog(status) {
      this.open = status
    }
  },
  computed: {
    getCoach() {
      return this.coach
    },
    getIsLoadingState() {
      return this.$store.getters['getIsLoadingState']
    },
  },
  created() {
    if (Object.keys(this.$store.getters['coaches/getCertainCoach'](this.id)).length == 0) {
      this.$store.commit('toggleIsLoadingState', true)

      this.$store.dispatch('coaches/loadCoaches')
        .then(() => {
          this.coach = this.$store.getters['coaches/getCertainCoach'](this.id)[0]
          setTimeout(() => {
            this.$store.commit('toggleIsLoadingState', false)
          }, 200)
        })
    } else {
      this.coach = this.$store.getters['coaches/getCertainCoach'](this.id)[0]
    }
  },
}
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 88vh;
}
.header-initials {
  margin-top: 0;
}
.coach-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  border-radius: 10px;
  height: 80px;
  width: 100%;
  padding: 10px 0;

  // .coach-item__item__title
  &__title {
    align-self: flex-start;
    font-size: 2.2rem;
    font-weight: bold;
    letter-spacing: -1px;
    display: inline-block;
  }
  // .coach-item__rate
  &__rate {
    align-self: flex-start;
    font-size: 1.5rem;
    font-weight: 400;
  }
}
.main-contact {
  display: flex;
  flex-direction: column;
  height: 100px;
  justify-content: space-around;

  // .main-contact__button
  &__button {
    align-self: flex-start;
    margin-left: 0 !important;
  }
}
.skills {
  display: flex;
  align-self: flex-start;
  &__skill:nth-of-type(1) {
    margin-left: 0;
  }
}
.footer-skills {
  display: flex;
  flex-direction: column;
}
.description {
  margin: 15px 0;
  font-size: 1.6rem;
  text-align: left;
  align-self: flex-start;
}
////
.modal-contact-enter-from,
.modal-contact-leave-to {
  opacity: 0;
  transform: translateX(-50px);
}

.modal-contact-enter-to,
.modal-contact-leave-from {
  opacity: 1;
  transform: translateX(0px);
}

.modal-contact-enter-active {
  transition: all 0.5s ease 0s;
}

.modal-contact-leave-active {
  transition: all 0.1s ease 0s;
}
/////

.dialog-success-enter-from,
.dialog-success-leave-to {
  transform: translateX(-50%) scale(0.1);
  opacity: 1;
}

.dialog-success-enter-to,
.dialog-success-leave-from {
  transform: translateX(-50%) scale(1);
  opacity: 1;
}

.dialog-success-enter-active {
  transition: all 0.2s ease-in-out 0s;
}

.dialog-success-leave-active {
  transition: all 0.1s ease-in-out 0s;
}
</style>