<template>
  <div :class="getMessageStatus" class="message">
    <div class="message__title">{{ getMessageTitle }}</div>
    <p class="message__body">{{ getMessageBody }}</p>
    <span class="message__seconds"> {{ secondsMutable }}</span>
  </div>
</template>

<script>
export default {
  props: ['err', 'seconds'],
  computed: {
    getMessageStatus() {
      return this.err.status === 'success' ? 'message--success' : 'message--failure'
    },
    getMessageBody() {
      return this.err.error
    },
    getMessageTitle() {
      if (this.err.status !== 'success') {
        return this.err.status[0].toUpperCase() + this.err.status.slice(1) + ` [${this.err.statusCode}]`
      }
      return this.err.status[0].toUpperCase() + this.err.status.slice(1)
    }
    // error, statusCode, status
  },
  data() {
    return {
      secondsMutable: this.seconds
    }
  },
  mounted() {
    const message = document.querySelector('.message')
    let opacity = 1
    new Promise((res) => {
      let intervalSeconds = setInterval(() => {
        if (--this.secondsMutable < 1) {
          res(clearInterval(intervalSeconds))
        }
        opacity -= 1 / this.seconds
        message.style.opacity = opacity
      }, 1000)
    })
      .then(() => this.$store.commit('clearMessages'))

  }
}
</script>

<style lang="scss" scoped>
.message--success {
  background-color: rgba(7, 255, 19, 0.95);
}
.message--failure {
  background-color: rgba(240, 30, 65, 0.95);
}
.message {
  // .message__title
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border-radius: 10px;
  top: 1%;
  left: 50%;
  transform: translate(-50%);
  position: fixed;
  width: fit-content;
  min-width: 20%;
  height: 95px;
  padding: 10px 20px;

  &__title {
    font-weight: 800;
    font-size: 2.5rem;
    text-align: center;
  }

  // .message__body

  &__body {
    font-weight: 400;
    font-size: 1.5rem;
    line-height: 1.4;
    text-align: center;
  }

  // message__seconds

  &__seconds {
    margin: 0 auto;
    background-color: #222;
    border: 5px solid #fff;
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 10px;
    height: 10px;
    border-radius: 100%;
    font-size: 2rem;
    color: #fff;
  }
}
</style>