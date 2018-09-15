<template>
  <div class="gallery-container">
    <div class="container">
      <Title>{{this.getTitle}}</Title>
      <Caption>
        Some dynamic content should probably go here
      </Caption>
      <HorizontalBar></HorizontalBar>
      <Caption isHeadline="true">
        Cool check it out
      </Caption>
      <HorizontalBar></HorizontalBar>
      <PhotoGalleryList></PhotoGalleryList>
    </div>
    <Footer />
  </div>
</template>

<script>
import Footer from "../../components/Footer.vue";
import Title from "../../components/Title.vue";
import Caption from "../../components/Caption.vue";
import HorizontalBar from "../../components/HorizontalBar.vue";
import PhotoGalleryList from "../../components/PhotoGalleryList.vue";
export default {
  components: {
    Footer,
    Title,
    Caption,
    HorizontalBar,
    PhotoGalleryList
  },
  computed: {
    getTitle() {
      return this.capitalizeParam();
    }
  },
  methods: {
    capitalizeParam() {
      return Object.values(this.$router.history.current.params)
        .pop()
        .replace(/^\w/, c => c.toUpperCase());
    }
  }
};
</script>
<style lang="scss">
@import "assets/app.variables.scss";
.gallery-container {
  padding-top: $navHeight * 1.5;
}
</style>

