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
      <base-wrapper class="footer-skills">
        <span class="about-title title text-about">About coach</span>
        <div class="coach-item">
          <div class="coach-item__subwrapper">
            <pre class="coach-item__label">Name : </pre>
            <span class="text-about"
              >{{ coach.firstName }} {{ coach.lastName }}</span
            >
          </div>
          <div class="coach-item__subwrapper">
            <pre class="coach-item__label">Rate : </pre>
            <span class="coach-item__rate text-about"
              >${{ coach.hourlyRate }}/hour</span
            >
          </div>
          <div class="coach-item__subwrapper">
            <pre class="coach-item__label">Description : </pre>
            <p class="text-about">
              {{ coach.description }}
            </p>
          </div>
        </div>

        <section class="skills">
          <base-badge
            class="skills__skill"
            v-for="skill in coach.skills"
            :key="skill"
            :className="skill"
          ></base-badge>
        </section>
      </base-wrapper>

      <base-wrapper class="main-contact">
        <span class="coach-item__title title">Interested? Reach out now!</span>
        <base-button
          @click="toggleModalContact(true)"
          class="main-contact__button"
          className="button--contact"
          >Contact</base-button
        >
      </base-wrapper>
    </section>
  </div>
</template>

<script>
import TheModalContact from './TheModalContact.vue'
import TheDialogWindowSuccess from '../requests/TheDialogWindowSuccess.vue'

export default {
  components: {
    TheModalContact,
    TheDialogWindowSuccess
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
.coach-item__label {
  font-weight: bold;
  flex-basis: 50%;
  font-size: 1.5rem;
  text-align: left;
  margin: 10px 0;
  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
}
.text-about {
  font-size: 1.2rem;
  text-align: left;
  flex-basis: 50%;

  @media (max-width: 480px) {
    font-size: 1rem;
  }
}
.title {
  font-size: 2.2rem;
  font-weight: bold;
  letter-spacing: -1px;
  display: inline-block;
  margin-bottom: 10px;
  @media (max-width: 480px) {
    font-size: 1.7rem;
  }
}
.about-title {
  align-self: center;
}
.content {
  margin-top: 5%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.coach-item {
  display: flex;
  // justify-content: start;
  flex-direction: column;
  border-radius: 10px;
  width: 100%;
  padding: 10px 0;
  flex-wrap: wrap;
  align-items: center;
}

.coach-item__subwrapper {
  width: 100%;
  align-items: center;
  display: flex;
}
.main-contact {
  display: flex;
  flex-direction: column;
  height: 100px;
  justify-content: space-around;
  @media (max-width: 1024px) {
    width: 55%;
  }
  @media (max-width: 768px) {
    width: 65%;
  }
  @media (max-width: 600px) {
    width: 75%;
  }
  @media (max-width: 480px) {
    width: 90%;
  }

  // .main-contact__button
  &__button {
    align-self: center;
  }
}
.skills {
  display: flex;
  width: 100%;
  align-self: flex-start;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: center;
  }
  &__skill:nth-of-type(1) {
    margin-left: 0;
  }
}
.footer-skills {
  display: flex;
  flex-direction: column;
  @media (max-width: 1024px) {
    width: 55%;
  }
  @media (max-width: 768px) {
    width: 65%;
  }
  @media (max-width: 600px) {
    width: 75%;
  }
  @media (max-width: 480px) {
    width: 90%;
  }
}

///////////////////////////////////////////////////////////
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