<template>
  <div class="about-container">
    <div class="container">
      <Title>About</Title>
      <div class="about-container__image-containerized">
        <img src="/fallenstedt.png" alt="Alex fallenstedt self portrait">
      </div>
      <Caption>I am a web developer who strives for test-driven development, translating business requirements into technical requirements, and an agile based development model.</Caption>
      <Caption>I consider these to be the primary elements for delivering quality and maintainable software with high-confidence.</Caption>
      <HorizontalBar></HorizontalBar>
      <Caption
        isHeadline="true"
      >I use a scoop of JavaScript in my coffee every morning. I also do photography.</Caption>
    </div>
    <div class="about-container__image">
      <img src="/fallenstedt.png" alt="Alex fallenstedt self portrait">
    </div>
  </div>
</template>

<script>
import Title from "../components/Title.vue";
import Caption from "../components/Caption.vue";
import HorizontalBar from "../components/HorizontalBar.vue";
export default {
  components: {
    Title,
    Caption,
    HorizontalBar
  }
};
</script>

<style lang="scss">
@import "assets/app.variables.scss";
.about-container {
  padding-top: $navHeight * 1.5;
  display: flex;
  justify-content: center;
  flex-direction: column;
  &__image {
    width: 100%;
    height: 100vw;
    @include breakpoint(tablet) {
      display: none;
    }
    & img {
      height: inherit;
      width: inherit;
    }
    &-containerized {
      display: none;
      @include breakpoint(tablet) {
        display: block;
        margin: 5rem 0;
        width: 35em;
        height: 35em;
      }
      & img {
        height: inherit;
        width: inherit;
      }
    }
  }
}
</style>

