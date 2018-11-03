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
      <img src="/fallenstedt.png" alt="" style="{height: 500px; width: 500px;}" @click="showLightbox('fallenstedt.png')">
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

export default {
  data() {
    return {
      index: null,
      images: [{ name: '/fallenstedt.png' }, { name: '/5.jpg' }]
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
}
.lightbox-close {
  font-size: 50px !important;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

