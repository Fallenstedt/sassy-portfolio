<template>
  <li class="gallery-list__item">
    <nuxt-link :to="getLink(title)">
      <div class="gallery-list__teaser" :style="{backgroundImage: `url(${teaser})`}"></div>
      <div class="gallery-list__caption">
        <Caption isHeadline="true">{{title}}</Caption>
      </div>
      <div class="gallery-list__caption-container container">
        <Caption isHeadline="true">{{title}}</Caption>
      </div>
    </nuxt-link>
  </li>
</template>
<script>
import Caption from "./Caption.vue";
export default {
  name: "PhotoGalleryListItem",
  props: ["title", "teaser"],
  components: {
    Caption
  },
  methods: {
    getLink(title) {
      return `/photos/${title.toLowerCase()}`;
    }
  }
};
</script>
<style lang="scss">
@import "assets/app.variables.scss";

.gallery-list {
  &__item {
    padding: 0;
    margin: 0;
    list-style: none;
    a {
      text-decoration: none;
    }
    p {
      margin: 1rem 0 3rem 0;
    }
  }
  &__teaser {
    height: 100vw;
    width: 100%;
    background-size: 100%;
    background-position: 50% 50%;
    background-size: cover;
    background-repeat: none;
    transition: background-size 0.2s ease-out;

    @include breakpoint(tablet) {
      width: 30em;
      height: 30em;
    }
  }
  &__caption-container {
    display: block;
    @include breakpoint(tablet) {
      display: none;
    }
  }
  &__caption {
    display: none;
    @include breakpoint(tablet) {
      display: block;
    }
  }
}
</style>
