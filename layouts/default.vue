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
