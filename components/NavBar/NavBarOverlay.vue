<template>
  <div :class="{ 'app-nav__overlay-open': isNavOpen }" @click="closeNav" class="app-nav__overlay"></div>
</template>
<script>
export default {
  name: "NavBarOverlay",
  props: ["isNavOpen"],
  methods: {
    closeNav() {
      this.$emit("closeNav", false);
    }
  }
};
</script>
<style lang="scss">
.app-nav {
  &__overlay {
    position: fixed;
    top: 0;
    width: 100%;
    height: 100vh;
    z-index: $overlayNav + 4;
    background-color: $charcoal;
    opacity: 0;
    transition: opacity 0.25s ease-in;
    pointer-events: none;
    &-open {
      pointer-events: all;
      opacity: 0.8;
    }
  }
}
</style>
