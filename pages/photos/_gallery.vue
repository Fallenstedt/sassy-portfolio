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
          :src="image"
          class="grid-item"
          @click="handleClick">
      </div>
      <HorizontalBar></HorizontalBar>
      <PhotoGalleryList></PhotoGalleryList>
    </div>
    <Footer />
    <div  :class="this.overlayOpen ? 'overlay' : ''">
      <div 
      :class="this.overlayOpen ? 'overlay__background' : '' "></div>
      <img class="overlay__image" :src="this.overlayOpen ? this.selectedImage : ''" alt="">
      <div class="overlay__next" @click="handleNext">Next</div>
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
      selectedIndex: null,
      overlayOpen: false,
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
      const index = parseInt(e.target.getAttribute("data-index"));

      this.selectedIndex = index || null;
      this.selectedImage = src;
      this.overlayOpen = !this.overlayOpen;
    },
    handleNext() {
      console.log("next");
      const nextImg = this.images[this.selectedIndex++];
      console.log(nextImg);
      this.selectedImage = nextImg;
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

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  &__background {
    position: relative;
    background-color: $charcoal;
    opacity: 0.9;
    z-index: $overlayZ + 5;
    width: inherit;
    height: inherit;
  }
  &__image {
    display: block;
    position: fixed;
    z-index: $overlayZ + 5;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  &__next {
    border: 2px solid red;
    z-index: $overlayZ + 6;
    position: fixed;
    top: 50%;
    left: 90%;
    transform: translate(-50%, -50%);
    color: white;
  }
}
</style>

