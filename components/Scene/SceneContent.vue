<template>
  <div class="app-home__content">
    <div class="container">
      <Title>I'm Alex Fallenstedt</Title>
      <HorizontalBar></HorizontalBar>
      <Caption isHeadline="true">Web Developer &amp; Photographer</Caption>
      <Caption>Find out
        <nuxt-link to="/about">more about me</nuxt-link>&nbsp;or
        <nuxt-link to="/photos">view my photos</nuxt-link>. I also
        <nuxt-link to="/blog">blog about programming</nuxt-link>&nbsp;once in a while.
      </Caption>
    </div>
  </div>
</template>

<script>
import Title from "../Title.vue";
import Caption from "../Caption.vue";
import HorizontalBar from "../HorizontalBar.vue";
export default {
  name: "AppHomeContent",
  components: {
    Title,
    Caption,
    HorizontalBar
  }
};
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
  }
}
</style>
