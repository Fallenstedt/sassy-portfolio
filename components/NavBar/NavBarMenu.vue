<template>
  <ul :class="{ 'app-nav__menu-open': isNavOpen }" class="app-nav__menu">
    <li>
      <nuxt-link to="/">
        <Caption>Home</Caption>
      </nuxt-link>
    </li>
    <li>
      <nuxt-link to="about">About</nuxt-link>
    </li>
  </ul>
</template>
<script>
import Caption from "../Caption.vue";
export default {
  name: "NavBarMenu",
  props: ["isNavOpen"],
  components: {
    Caption
  }
};
</script>
<style lang="scss">
.app-nav {
  &__menu {
    position: fixed;
    width: 200px;
    height: 100vh;
    background-color: white;
    top: 0;
    right: -150%;
    margin: 0;
    padding: 50px;
    z-index: $overlayNav + 5;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    list-style: none;
    transition: right 0.25s ease-in;
    &-open {
      right: 0;
    }
  }
}
</style>
