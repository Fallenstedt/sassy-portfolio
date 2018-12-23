<template>
  <nav class="app-nav" [class.app-nav__no-events]="isNavOpen">
    <div class="app-nav__fixed">
      <NavBarLogo/>
      <!-- <NavButton @openNav="onOpenNav"/> -->
    </div>
    <!-- <div :class="{ 'app-nav__menu-open': isNavOpen }" class="app-nav__menu">Hey</div> -->
  </nav>
</template>

<script>
import NavBarLogo from "./NavBarLogo.vue";
import NavButton from "./NavButton.vue";
export default {
  name: "NavBarContainer",
  components: {
    NavBarLogo,
    NavButton
  },
  data: function() {
    return {
      isNavOpen: false
    };
  },
  methods: {
    onOpenNav(e) {
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
  &__menu {
    position: fixed;
    z-index: $overlayNav;
    right: -100%;
    width: 200px;
    height: 100vh;
    background-color: white;
    &-open {
      right: 0;
    }
  }
}
</style>
