<template>
  <div class="app-home__content">
    <div class="container">
      <Title>I'm Alex Fallenstedt</Title>
      <HorizontalBar></HorizontalBar>
      <Caption isHeadline="true">Web Developer &amp; Photographer</Caption>
      <Caption>
        Find out
        <nuxt-link to="/about">more about me</nuxt-link>&nbsp;or
        <a
          class="bland-link"
          href="https://www.linkedin.com/in/alexfallenstedt"
        >view my resume</a>
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
