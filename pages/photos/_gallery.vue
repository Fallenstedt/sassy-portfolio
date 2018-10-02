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
        <img 
          v-for="(image, index) in this.images"
          :data-index="index"
          :key="index"
          :src="image"
          class="grid-item">
      </div>
    </div>
    <Footer />
    <button @click="showModal = true"> hi</button>
    <Modal [showModal] = "false"></Modal>
  </div>
</template>

<script>
let Masonry, ImagesLoaded;
if (process.browser) {
  ImagesLoaded = require("imagesloaded");
}
import Footer from "../../components/Footer.vue";
import Title from "../../components/Title.vue";
import Caption from "../../components/Caption.vue";
import HorizontalBar from "../../components/HorizontalBar.vue";
import Modal from "../../components/Modal.vue";

export default {
  data() {
    return {
      showModal: false,
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
    Modal
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
        console.log("done");
      });
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

