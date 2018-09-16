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
      <div class="viewer">
        <div class="grid-sizer"></div>
        <img 
          v-for="(image, index) in this.images"
          :data-index="index"
          :key="index"
          :class="`box-${index}`" 
          :src="image"
          class="grid-item"
          @click="handleClick">
      </div>
      <HorizontalBar></HorizontalBar>
      <PhotoGalleryList></PhotoGalleryList>
    </div>
    <Footer />
    <div class="overlay">
      <img :src="this.selectedImage" alt="">
    </div>
  </div>
</template>

<script>
let Masonry, ImagesLoaded;
if (process.browser) {
  Masonry = require("masonry-layout");
  ImagesLoaded = require("imagesloaded");
}
import Footer from "../../components/Footer.vue";
import Title from "../../components/Title.vue";
import Caption from "../../components/Caption.vue";
import HorizontalBar from "../../components/HorizontalBar.vue";
import PhotoGalleryList from "../../components/PhotoGalleryList.vue";

export default {
  data() {
    return {
      images: [
        "https://via.placeholder.com/350x250",
        "https://via.placeholder.com/450x550",
        "https://via.placeholder.com/450x250",
        "https://via.placeholder.com/450x550",
        "https://via.placeholder.com/350x250",
        "https://via.placeholder.com/350x250",
        "https://via.placeholder.com/450x250",
        "https://via.placeholder.com/350x150",
        "https://via.placeholder.com/450x250"
      ],
      selector: ".viewer",
      selectedImage: "",
      options: {
        columnWidth: ".grid-sizer",
        percentPosition: true,
        gutter: 0,
        itemSelector: ".grid-item"
      }
    };
  },
  components: {
    Footer,
    Title,
    Caption,
    HorizontalBar,
    PhotoGalleryList
  },
  mounted() {
    this.loaded();
    this.$root.$on("image-clicked", s => {
      this.selectedImage = s;
    });
  },
  computed: {
    getTitle() {
      return this.capitalizeParam();
    }
  },
  watch: {
    data() {
      console.log("butts");
      this.loaded();
    }
  },
  methods: {
    capitalizeParam() {
      return Object.values(this.$router.history.current.params)
        .pop()
        .replace(/^\w/, c => c.toUpperCase());
    },
    loaded() {
      ImagesLoaded(this.selector, () => {
        this.$root.$emit("masonry-images-loaded");
        let masonry = new Masonry(this.selector, this.options);
        // this.$root.$emit("masonry-loaded", masonry);
      });
    },
    handleClick(e) {
      const src = e.target.src;
      this.$root.$emit("image-clicked", src);
    }
  }
};
</script>
<style lang="scss">
@import "assets/app.variables.scss";
.gallery-container {
  padding-top: $navHeight * 1.5;
}

.grid-item {
  img {
    border: 2px solid blue;
    object-fit: contain;
  }
}

@media only screen and (max-width: 768px) {
  .grid-sizer {
    width: 100%;
  }
  .grid-item {
    width: 100%;
    padding-bottom: 10px;
    padding-left: 0px;
  }
}
@media only screen and (min-width: 769px) {
  .grid-sizer {
    width: 33%;
  }
  .grid-item {
    width: 33%;
    // margin-bottom: 10px;
    // margin-left: 10px;
  }
}
@media only screen and (min-width: 1200px) {
  .grid-sizer {
    width: 25%;
  }
  .grid-item {
    width: 25%;
    // padding-bottom: 10px;
    // padding-left: 10px;
  }
}
</style>

