<template>
  <ul :class="{ 'app-nav__menu-open': isNavOpen }" class="app-nav__menu">
    <Caption v-for="link in links" :key="link.name">
      <nuxt-link @click.native="closeNav" :to="link.route">{{link.name}}</nuxt-link>
    </Caption>
  </ul>
</template>
<script>
import Caption from "../Caption.vue";
export default {
  name: "NavBarMenu",
  props: ["isNavOpen", "links"],
  components: {
    Caption
  },
  methods: {
    closeNav() {
      this.$emit("closeNav", false);
    }
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
    padding: 0 50px !important;
    z-index: $overlayNav + 5;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    list-style: none;
    transition: right 0.25s ease-in;
    &-open {
      padding-top: 0;
      right: 0;
    }
  }
}
</style>
