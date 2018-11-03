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
      <div class="gallery-container__row">
        <div class="gallery-container__column" v-for="(image, index) in images" :key="index">
          
          <img :src="image.name" alt="" @click="showLightbox(image.name)">

        </div>
        
      </div>
      <Lightbox id="mylightbox"
          ref="lightbox"
          :images="images"
          :timeoutDuration="5000"
      ></Lightbox>
    </div>
    <Footer />
  </div>
</template>

<script>
import Footer from '../../components/Footer.vue';
import Title from '../../components/Title.vue';
import Caption from '../../components/Caption.vue';
import HorizontalBar from '../../components/HorizontalBar.vue';
import Lightbox from 'vue-my-photos';
import imgNames from 'static/images.json';

export default {
  data(d) {
    return {
      index: null,
      images: imgNames[this.getParam()]
    };
  },
  components: {
    Footer,
    Title,
    Caption,
    HorizontalBar,
    Lightbox
  },
  computed: {
    getTitle() {
      return this.capitalizeParam();
    }
  },
  methods: {
    showLightbox(imageName) {
      this.$refs.lightbox.show(imageName);
    },
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
@import 'assets/app.variables.scss';
.gallery-container {
  padding-top: $navHeight * 1.5;
  &__row {
    display: flex;
    flex-wrap: wrap;
    padding: 0 4px;
    // border: 2px solid red;
  }
  &__column {
    flex: 20%;
    max-height: 300px;
    min-height: 250px;

    // max-width: 20%;
    padding: 4px;
    @media screen and (max-width: 800px) {
      flex: 40%;
      // max-width: 40%;
    }

    @media screen and (max-width: 600px) {
      flex: 100%;
      // max-width: 100%;
    }

    img {
      vertical-align: middle;
      object-fit: cover; /* also try 'contain' and 'cover' */
      object-position: top left;
      width: 100%;
      height: 100%;
    }
  }
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

