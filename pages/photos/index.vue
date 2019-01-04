<template>
  <div class="photo-container">
    <div class="container">
      <Title>Photos</Title>
      <Caption>
        A selection of my best work.
      </Caption>
      <HorizontalBar></HorizontalBar>
      <Caption isHeadline="true">
        Each gallery is composed with care, and crafted with love.
      </Caption>
    </div>
    <PhotoGalleryList></PhotoGalleryList>
  </div>
</template>
<script>
import Title from '../../components/Title.vue';
import Caption from '../../components/Caption.vue';
import HorizontalBar from '../../components/HorizontalBar.vue';
import PhotoGalleryList from '../../components/PhotoGalleryList.vue';
export default {
  components: {
    Title,
    Caption,
    HorizontalBar,
    PhotoGalleryList
  }
};
</script>
<style lang="scss">
@import 'assets/app.variables.scss';
.photo-container {
  padding-top: $navHeight * 1.5;
}
</style>


