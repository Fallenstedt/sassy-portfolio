<template>
  <div>
    <NavBarContainer></NavBarContainer>
    <nuxt/>
    <Footer></Footer>
  </div>
</template>

<script>
import NavBarContainer from "../components/Navbar/NavBarContainer.vue";
import Footer from "../components/Footer.vue";
export default {
  components: {
    NavBarContainer,
    Footer
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

