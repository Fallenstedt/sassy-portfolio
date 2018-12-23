<template>
  <button class="app-nav__burger" v-on:click="handleClick">
    <div class="app-nav__burger-dash"></div>
    <div class="app-nav__burger-dash"></div>
  </button>
</template>
<script>
export default {
  name: "NavButton",
  methods: {
    handleClick() {
      this.$emit("openNav", true);
    }
  }
};
</script>
<style lang="scss">
.app-nav {
  &__burger {
    margin: 10px 20px 0 0;
    border-color: transparent;
    background-color: transparent;
    border: none;
    &:hover {
      & > .app-nav__burger-dash:nth-child(2) {
        width: 25px;
      }
    }
    &-dash {
      width: 25px;
      height: 4px;
      background-color: $charcoal;
      margin: 3px 0;
      transition: width 0.1s linear;
      &:nth-child(2) {
        float: right;
        width: 15px;
      }
    }
  }
}
</style>
