<template>
  <nav class="app-nav" [class.app-nav__no-events]="isNavOpen">
    <div class="app-nav__fixed">
      <NavBarLogo/>
      <NavButton @openNav="onOpenNav"/>
    </div>
    <NavBarMenu :isNavOpen="isNavOpen"/>
    <NavBarOverlay @closeNav="onCloseNav" :isNavOpen="isNavOpen"/>
  </nav>
</template>

<script>
import NavBarLogo from "./NavBarLogo.vue";
import NavButton from "./NavButton.vue";
import NavBarOverlay from "./NavBarOverlay.vue";
import NavBarMenu from "./NavBarMenu.vue";
export default {
  name: "NavBarContainer",
  components: {
    NavBarLogo,
    NavButton,
    NavBarOverlay,
    NavBarMenu
  },
  data: function() {
    return {
      isNavOpen: false
    };
  },
  methods: {
    onOpenNav(e) {
      this.isNavOpen = e;
    },
    onCloseNav(e) {
      this.isNavOpen = e;
    }
  }
};
</script>

<style lang="scss">
@import "assets/app.variables.scss";
.app-nav {
  &__fixed {
    position: absolute;
    width: 100%;
    top: 10px;
    z-index: $overlayZ + 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &__no-events {
    pointer-events: none;
  }
}
</style>
