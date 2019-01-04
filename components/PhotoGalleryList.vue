<template>
  <div>
    <ul class="gallery-list">
      <PhotoGalleryListItem
        v-for="gallery in galleries"
        :key="gallery.title"
        :title="gallery.title"
        :teaser="gallery.teaser"
      ></PhotoGalleryListItem>
    </ul>
    <ul class="gallery-list__containerized container">
      <PhotoGalleryListItem
        v-for="gallery in galleries"
        :key="gallery.title"
        :title="gallery.title"
        :teaser="gallery.teaser"
      ></PhotoGalleryListItem>
    </ul>
  </div>
</template>
<script>
import PhotoGalleryListItem from "./PhotoGalleryListItem";
export default {
  name: "PhotoGalleryList",
  components: {
    PhotoGalleryListItem
  },
  data: function() {
    return {
      galleries: [
        {
          title: "Abstract",
          teaser:
            "/gallery/abstract/alex-fallenstedt-abstract-photography-2.jpg"
        },
        {
          title: "Nature",
          teaser: "/gallery/nature/alex-fallenstedt-nature-photography-2.jpg"
        },
        {
          title: "Weddings",
          teaser:
            "/gallery/weddings/alex-fallenstedt-wedding-photography-22.jpg"
        },
        {
          title: "Place",
          teaser: "/gallery/place/alex-fallenstedt-landscape-photography-5.jpg"
        },
        {
          title: "People",
          teaser: "/gallery/people/alex-fallenstedt-portrait-photography-15.jpg"
        }
      ]
    };
  }
};
</script>
<style lang="scss">
@import "assets/app.variables.scss";
.gallery-list {
  @include breakpoint(tablet) {
    display: none;
  }
  &__containerized {
    display: none;
    @include breakpoint(tablet) {
      display: block;
    }
  }
}
</style>
