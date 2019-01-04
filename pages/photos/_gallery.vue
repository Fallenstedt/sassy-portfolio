<template>
  <div class="gallery">
    <div class="container">
      <Title>{{this.getTitle}}</Title>
      <HorizontalBar></HorizontalBar>
      <ImageGallery :images="images"></ImageGallery>
      <Lightbox id="mylightbox" ref="lightbox" :images="images" @clicked="onClickChild"></Lightbox>
    </div>
  </div>
</template>

<script>
import Title from "../../components/Title.vue";
import Caption from "../../components/Caption.vue";
import HorizontalBar from "../../components/HorizontalBar.vue";
import ImageGallery from "../../components/ImageGallery.vue";
import Lightbox from "vue-my-photos";
import imgNames from "static/images.json";

export default {
  data(d) {
    return {
      index: null,
      images: imgNames[this.getParam()]
    };
  },
  components: {
    Title,
    Caption,
    HorizontalBar,
    Lightbox,
    ImageGallery
  },
  mounted() {
    this.$root.$on(
      "imgClicked",
      function(imageName) {
        if (this.$refs && this.$refs.lightbox) {
          this.$refs.lightbox.show(imageName);
        }
      }.bind(this)
    );
  },
  computed: {
    getTitle() {
      return this.capitalizeParam();
    }
  },
  methods: {
    onClickChild(imageName) {},
    getParam() {
      return Object.values(this.$router.history.current.params).pop();
    },
    capitalizeParam() {
      return this.getParam().replace(/^\w/, c => c.toUpperCase());
    }
  }
};
</script>
<style lang="scss">
@import "assets/app.variables.scss";

.gallery {
  padding-top: $navHeight * 1.5;
}
.lightbox-close {
  font-size: 50px !important;
  display: flex;
  justify-content: center;
  align-items: center;
}
.lightbox-image-container {
  max-width: 1000px;
  margin: 0 auto;
}
</style>

