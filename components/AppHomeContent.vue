<template>
  <div class="app-home__content">
    <div class="container">
      <h2><nuxt-link to="/about">About</nuxt-link></h2>
      <!-- <h2><nuxt-link to="/photos">Photos</nuxt-link></h2>-->
      <h2><a href="https://500px.com/alexanderfallenstedt" target="_blank">Photos</a></h2>
      <h2><a href="https://github.com/Fallenstedt" target="_blank">GitHub</a></h2>    
    </div>
  </div>
</template>

<script>
export default {
  name: "AppHomeContent"
};
</script>

<style lang="scss">
@import "assets/app.variables.scss";
.app-home__content {
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
</style>
