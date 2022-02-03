<template>
  <header class="header">
    <section class="header__lable">Find a coach</section>
    <nav class="menu-wrapper">
      <router-link class="menu-wrapper__item" :to="{ name: 'Coaches' }"
        >All Coaches</router-link
      >
      <router-link class="menu-wrapper__item" :to="{ name: 'Requests' }"
        >Requests</router-link
      >
      <router-link class="menu-wrapper__item" :to="{ name: 'Authorization' }"
        >Login</router-link
      >
    </nav>
  </header>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.header {
  width: 100%;
  height: 12vh;
  background-color: rgb(18, 34, 129);
  display: flex;
  justify-content: space-around;
  align-items: center;

  // .header__lable
  &__lable {
    color: #fff;
    font-size: 2.7rem;
    font-weight: 800;
  }
}
.menu-wrapper {
  display: flex;
  justify-content: space-between;
  // .menu-wrapper__item
  &__item {
    text-decoration: none;
    font-size: 1.8rem;
    margin: 0 15px;
    color: #fff;
  }
}
</style>