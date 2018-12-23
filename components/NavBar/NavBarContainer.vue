<template>
  <nav class="app-nav" [class.app-nav__no-events]="isNavOpen">
    <div class="app-nav__fixed">
      <div class="app-nav__controls"></div>
    </div>
  </nav>
</template>

<script>
import NavBarLogo from "./NavBarLogo.vue";
export default {
  name: "NavBarContainer",
  components: {
    NavBarLogo
  },
  data: function() {
    return {
      isNavOpen: false
    };
  }
};
// <NavBarLogo></NavBarLogo>
</script>

<style lang="scss">
@import "assets/app.variables.scss";
.app-nav {
  &__fixed {
    position: absolute;
    width: 100%;
    top: 10px;
    z-index: $overlayZ + 1;
  }
  &__controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: inherit;
  }
  &__no-events {
    pointer-events: none;
  }
}
</style>
