<template>
    <div class="about-container">
      <div class="container about-container__content">
        <h1><span class="about-container__bg-span">About</span></h1>
        <div class="about-container__image-containerized">
          <img src="~/assets/fallenstedt.png" alt="Alex fallenstedt self portrait">
        </div>
        <p class="half-width">
          Alex is a Creative Technologist at EY. He works with various web technologies to create business intelligence tools, websites, and web apps. 
          In the past he has photographed weddings and for a Portland magazine.
        </p>
        <div class="horizontal-bar"></div>
        <p class="headline half-width">
          He uses a scoop of JavaScript in his coffee every morning. He also does photography.
        </p>
      </div>
      <div class="about-container__image">
        <img src="~/assets/fallenstedt.png" alt="Alex fallenstedt self portrait">
      </div>
    <div>
      <Footer />
    </div>
    </div>
</template>

<script>
import Footer from "../components/Footer.vue";
export default {
  components: {
    Footer
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
  &__bg-span {
    background-image: url("~/assets/5.jpg");
    background-size: cover;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
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

