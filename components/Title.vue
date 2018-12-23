<template>
  <h1>
    <span class="title-container__bg-span">
      <slot></slot>
    </span>
  </h1>
</template>

<script>
export default {
  name: "Title"
};
</script>

<style lang="scss">
@import "assets/app.variables.scss";
.title-container {
  padding-top: $navHeight * 1.5;
  display: flex;
  justify-content: center;
  flex-direction: column;
  &__bg-span {
    background-image: url("/5.jpg");
    background-size: contain;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}
</style>


