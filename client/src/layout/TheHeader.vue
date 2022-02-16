<template>
  <header class="header">
    <section class="header__lable">Find a coach</section>
    <div class="burger" @click="toggleMenu"></div>
    <nav class="menu-wrapper">
      <router-link
        :class="{ active: $route.path.includes('/coaches') }"
        class="menu-wrapper__item"
        :to="{ name: 'Coaches' }"
        >All Coaches</router-link
      >
      <router-link
        v-if="getMyLogin"
        class="menu-wrapper__item"
        :to="{ name: 'Requests' }"
        >Requests</router-link
      >
      <router-link
        v-if="!getMyLogin"
        class="menu-wrapper__item"
        :to="{ name: 'Authorization' }"
        >Login</router-link
      >
      <span @click="exit" v-else class="menu-wrapper__item exit-item">{{
        getMyLogin
      }}</span>

      <router-link class="menu-wrapper__item" :to="{ name: 'Sign-Up' }"
        >Sign-Up</router-link
      >
    </nav>
  </header>
</template>

<script>
export default {
  computed: {
    getMyLogin() {
      return this.$store.getters['getMyLogin']
    }
  },
  methods: {
    exit() {
      this.$store.dispatch('exitFromSystem').then((success) => {
        if (success) {
          this.$router.replace({ name: "Authorization" })
        }
      })
    },
    toggleMenu() {
      let y = document.querySelector('.burger')
      let x = document.querySelector(".menu-wrapper")

      y.classList.toggle('burger--close')

      if (x.style.display == "none" || x.style.display == "") {
        x.style.display = "flex"
        x.style.height = 'auto'
      } else {
        x.style.display = "none"
        x.style.height = '100px'
      }

    }
  }

}
</script>

<style lang="scss" scoped>
.menu--close {
  display: none;
}
.header {
  width: 100%;
  min-height: 120px;
  height: auto;
  background-color: rgb(18, 34, 129);
  display: flex;
  justify-content: space-between;
  align-items: center;

  // .header__lable
  &__lable {
    color: #fff;
    font-size: 2rem;
    border: 2px solid #fff;
    padding: 5px 5px;
    font-weight: 800;
    flex-grow: 1;
    position: relative;
    @media (max-width: 600px) {
      display: none;
    }
    @media (max-width: 480px) {
    }
  }
}
.burger {
  position: absolute;
  right: 7%;
  top: 3%;
  width: 60px;
  height: 60px;
  mask-image: url("../assets/burger.svg");
  background-color: #fff;
  mask-repeat: no-repeat;
  display: none;
  @media (max-width: 480px) {
    display: block;
  }
}
.burger--close {
  mask-image: url("../assets/close-button.svg");
}
.menu-wrapper {
  display: flex;
  flex-direction: row;
  align-items: none;
  justify-content: space-evenly;
  flex-grow: 2;
  flex-wrap: wrap;
  height: auto;
  @media (max-width: 900px) {
    justify-content: space-evenly;
  }
  @media (max-width: 480px) {
    display: none;
    flex-direction: column;
    align-items: flex-start;
    height: 120px;
    margin-left: 10%;
  }

  // .menu-wrapper__item
  &__item {
    text-decoration: none;
    font-size: 1.8rem;
    margin: 15px 0px;
    color: #fff;
    padding-bottom: 5px;
    border-bottom: 4px solid transparent;
    @media (max-width: 900px) {
      flex-basis: 40%;
    }
    @media (max-width: 600px) {
      flex-basis: 40%;
      font-size: 1.3rem;
    }
    @media (max-width: 480px) {
      font-size: 1.8rem;
    }
  }
}
.exit-item {
  transition: all 0.2s ease 0s;
  color: rgba(255, 255, 255, 0.5);
  &:hover {
    cursor: pointer;
    transform: scale(1.1);
    color: rgba(255, 255, 255, 1);
  }
}
</style>