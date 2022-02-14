<template>
  <div :class="getMessageStatus" class="message">
    <div class="message__title">{{ getMessageTitle }}</div>
    <p class="message__body">{{ getMessageBody }}</p>
    <span class="message__seconds"> {{ secondsMutable }}</span>
  </div>
</template>

<script>
export default {
  props: {
    objTooltip: {
      type: Object,
      required: true
    },
    seconds: {
      type: Number,
      default: 9,
    }
  },
  computed: {
    getMessageStatus() {
      return (this.getMessageTitle === 'Success' ? 'message--success' : 'message--failure') || 'message--failure'
    },
    getMessageBody() {
      return this.objTooltip.message || 'Error'
    },
    getMessageTitle() {
      if (String(this.objTooltip.status).startsWith('4') || String(this.objTooltip.status).startsWith('5')) {
        return 'Failure' + ` [${this.objTooltip.status}]`
      }
      return 'Success'
    }
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
  background-color: rgba(7, 255, 152, 0.95);
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
  box-shadow: 4px 4px 8px 0px rgba(22, 22, 22, 0.6);
  top: 1%;
  left: 50%;
  transform: translate(-50%);
  position: fixed;
  width: fit-content;
  min-width: 20%;
  height: fit-content;
  padding: 10px 20px;

  &__title {
    font-weight: 800;
    font-size: 2.5rem;
    text-align: center;
  }

  // .message__body

  &__body {
    font-weight: 400;
    font-size: 1.8rem;
    line-height: 1.4;
    text-align: center;
  }

  // message__seconds

  &__seconds {
    margin: 0 auto;
    background-color: #222;
    border: 3px solid #fff;
    padding: 7px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 10px;
    height: 10px;
    border-radius: 100%;
    font-size: 1.2rem;
    color: #fff;
  }
}
</style>