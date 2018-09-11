<template>
  <div>
    <NavBarContainer></NavBarContainer>
    <nuxt/>
  </div>
</template>

<script>
import NavBarContainer from "../components/Navbar/NavBarContainer.vue";
export default {
  components: {
    NavBarContainer
  }
};
</script>
<style lang="scss">
.page-enter-active,
.page-leave-active {
  transition: all 0.2s ease-out;
}
.page-enter,
.page-leave-active {
  opacity: 0;
  transform-origin: 50% 50%;
}
</style>

