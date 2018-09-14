<template>
    <div class="about-container">
      <div class="container">
        <Title>About</Title>
        <div class="about-container__image-containerized">
          <img src="/fallenstedt.png" alt="Alex fallenstedt self portrait">
        </div>
        <Caption>
          Alex is a Creative Technologist at EY. He works with various web technologies to create business intelligence tools, websites, and web apps. 
          In the past he has photographed weddings and for a Portland magazine.
        </Caption>
        <HorizontalBar></HorizontalBar>
        <Caption isHeadline="true">
          He uses a scoop of JavaScript in his coffee every morning. He also does photography.
        </Caption>
      </div>
      <div class="about-container__image">
        <img src="/fallenstedt.png" alt="Alex fallenstedt self portrait">
      </div>
      <div>
        <Footer />
      </div>
    </div>
</template>

<script>
import Footer from "../components/Footer.vue";
import Title from "../components/Title.vue";
import Caption from "../components/Caption.vue";
import HorizontalBar from "../components/HorizontalBar.vue";
export default {
  components: {
    Title,
    Caption,
    Footer,
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

