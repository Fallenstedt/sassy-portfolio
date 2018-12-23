<template>
  <div class="app-home__content">
    <div class="container">
      <Title>I'm Alex Fallenstedt</Title>
      <HorizontalBar></HorizontalBar>
      <Caption></Caption>
      <p>A web developer who strives for test-driven development, translating business requirements into technical requirements, and an agile based development model.</p>
      <p>I consider these to be the primary elements for delivering quality and maintainable software with high-confidence.</p>
    </div>
  </div>
</template>

<script>
import Title from "../components/Title.vue";
import Caption from "../components/Caption.vue";
import HorizontalBar from "../components/HorizontalBar.vue";
export default {
  name: "AppHomeContent",
  components: {
    Title,
    Caption,
    HorizontalBar
  }
};

// <h2><nuxt-link to="/about">About</nuxt-link></h2>
//       <h2><nuxt-link to="/photos">Photos</nuxt-link></h2>
//       <!-- <h2><a href="https://500px.com/alexanderfallenstedt" target="_blank">Photos</a></h2> -->
//       <h2><a href="https://github.com/Fallenstedt" target="_blank">GitHub</a></h2>
</script>

<style lang="scss">
@import "assets/app.variables.scss";
.app-home {
  &__content {
    position: absolute;
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: $overlayHome;
    a {
      text-decoration: none;
      color: $charcoal;
      transition: all 0.2s ease-in;
      &:hover {
        color: $tomatoRed;
      }
    }
  }
}
</style>
