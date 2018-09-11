<template>
  <div 
  v-on:click="onLogoClick"
  class="app-logo"></div>
</template>

<script>
export default {
  name: "NavBarLogo",
  methods: {
    onLogoClick(e) {
      console.log(this.$router);
      this.$router.push({
        path: "/"
      });
    }
  }
};
</script>

<style lang="scss">
.app-logo {
  height: 50px;
  width: 200px;
  margin: 10px 0 0 20px;
  background-repeat: no-repeat;
  background-size: contain;
  background-image: url("~/assets/alex-fallenstedt-logo.png");
  cursor: pointer;
}
</style>
