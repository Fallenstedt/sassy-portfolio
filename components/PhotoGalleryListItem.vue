<template>
    <li 
    class="gallery-list__item">
      <nuxt-link :to="getLink(title)">
        <div 
        class="gallery-list__teaser"
        :style="{backgroundImage: `url(${teaser})`}">
        </div>
        <h3>{{title}}</h3>
      </nuxt-link>
  </li>
</template>
<script>
export default {
  name: "PhotoGalleryListItem",
  props: ["title", "teaser"],
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
  }
  &__teaser {
    height: 100vw;
    width: 100%;
    background-size: 100%;
    background-position: 50% 50%;
    transition: all 0.2s ease-out;

    @include breakpoint(tablet) {
      width: 35em;
      height: 35em;
      margin: 5rem 0;
    }

    &:hover {
      background-size: 120%;
      background-position: 50% 50%;
    }
  }
}
</style>
