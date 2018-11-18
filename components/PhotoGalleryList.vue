<template>
  <div>
    <ul class="gallery-list">
      <PhotoGalleryListItem
        v-for="gallery in galleries" 
        :key="gallery.title" 
        :title="gallery.title" 
        :teaser="gallery.teaser">
      </PhotoGalleryListItem>
    </ul>
    <ul class="gallery-list__containerized container">
      <PhotoGalleryListItem
        v-for="gallery in galleries" 
        :key="gallery.title" 
        :title="gallery.title" 
        :teaser="gallery.teaser">
      </PhotoGalleryListItem>
    </ul>
  </div>
</template>
<script>
import PhotoGalleryListItem from './PhotoGalleryListItem';
export default {
  name: 'PhotoGalleryList',
  components: {
    PhotoGalleryListItem
  },
  data: function() {
    return {
      galleries: [
        {
          title: 'Abstract',
          teaser:
            '/gallery/abstract/alex-fallenstedt-abstract-photography-2.jpg',
          altTitle: 'some alt'
        },
        {
          title: 'Nature',
          teaser: '/gallery/nature/alex-fallenstedt-nature-photography-2.jpg',
          altTitle: 'some alt'
        },
        {
          title: 'World',
          teaser: 'https://via.placeholder.com/350x350',
          altTitle: 'some alt'
        },
        {
          title: 'People',
          teaser: 'https://via.placeholder.com/350x350',
          altTitle: 'some alt'
        },
        {
          title: 'Weddings',
          teaser: 'https://via.placeholder.com/350x350',
          altTitle: 'some alt'
        }
      ]
    };
  }
};
</script>
<style lang="scss">
@import 'assets/app.variables.scss';
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
