<template>
  <div class="modal-overlay" @click.self="closeModalContact">
    <section class="modal">
      <section class="header">
        <slot name="header">

        </slot>
      </section>

      <section class="main">
        <slot name="main">
          <form @submit.prevent="sendRequestToCoach" action="" class="contact">
            <div class="form-input">
              <label class="contact__label-email" for="contact-email"
                >Your email</label
              >
              <input
                class="contact__email"
                type="text"
                name="contact-email"
                v-model="contactEmail"
              />
            </div>
            <div class="form-input">
              <label class="contact__label-message" for="contact-message"
                >Message</label
              >
              <textarea
                class="contact__message"
                name="contact-message"
                v-model="contactMessage"
              />
            </div>

            <base-button
              :disabled="!getValidation"
              :class="{ 'off-button': !getValidation }"
              className="button--contact"
              type="submit"
              >Send Message</base-button
            >
          </form>
        </slot>
      </section>

      <slot name="footer"> </slot>
    </section>
  </div>
</template>

<script>
export default {
  props: ['coachEmail'],
  emits: ['close-modal, open-dialog'],
  data() {
    return {
      contactEmail: '',
      contactMessage: ''
    }
  },
  computed: {
    getValidation() {
      return this.contactEmail.toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        ) && this.contactMessage.length > 10
    }
  },
  methods: {
    closeModalContact() {
      this.$emit('close-modal', false)
    },
    sendRequestToCoach() {
      const data = {
        contactEmail: this.contactEmail,
        contactMessage: this.contactMessage,
        coachEmail: this.coachEmail,
        id: String(Date.now())
      }
      this.$store.dispatch('requests/createRequest', data)
        .then(() => setTimeout(() => this.$emit('open-dialog', true), 200))

      this.contactEmail = ''
      this.contactMessage = ''
      this.closeModalContact()
    }
  }

}
</script>

<style lang="scss" scoped>
.modal-overlay {
  overflow: hidden;
  position: fixed;
  background-color: rgba(22, 22, 22, 0.8);
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}
.modal {
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  background-color: #fff;
  border-radius: 2px;
  padding: 20px 10px;
  width: 30%;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0px 0px 97px 4px rgba(0, 0, 0, 0.9);
  @media (max-width: 1440px) {
    width: 60%;
  }
  @media (max-width: 600px) {
    width: 75%;
  }
  @media (max-width: 480px) {
    width: 85%;
  }
}

.header,
.footer {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
}
.main {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 2;
}

.contact {
  display: flex;
  height: 100%;
  width: 80%;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  @media (max-width: 480px) {
    width: 100%;
  }

  // contact__label-message
  &__label-email {
    font-size: 1.7rem;
    margin: 10px 0;
  }

  // contact__label-message
  &__label-message {
    font-size: 1.7rem;
    margin: 10px 0;
  }
  // .contact__email
  &__email {
    width: 100%;
    font-size: 1.6rem;
    line-height: 1.7;
  }

  // .contact__message
  &__message {
    width: 100%;
    font-size: 1.6rem;
    resize: none;
    height: 110px;
    margin-bottom: 5%;
  }
}

.form-input {
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.off-button {
  color: lighten(#000, 60%);
}
</style>