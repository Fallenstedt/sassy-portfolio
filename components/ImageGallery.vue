<template>
  <section class="imgs">
    <div class="imgs__img-box" v-for="(image, index) in images" :key="index">    
      <img :src="image.name" alt="" @click="handleClick(image.name)">
    </div>
  </section>  
</template>
<script>
export default {
  name: 'Gallery',
  props: ['images'],
  methods: {
    handleClick(imgName) {
      this.$root.$emit('imgClicked', imgName);
    }
  }
};
</script>
<style lang="scss" scoped>
.imgs {
  display: flex;
  flex-wrap: wrap;
  &::after {
    content: '';
    flex-grow: 999999999;
  }
  &__img-box {
    flex-grow: 1;
    margin: 2px;
    background-color: violet;
    height: 250px;
    img {
      cursor: pointer;
      height: 250px;
      object-fit: cover;
      max-width: 100%;
      min-width: 100%;
      vertical-align: bottom;
      cursor: pointer;
    }
  }
}
</style>
