<template>
  <section>
    <div>
      <AppHomeContent></AppHomeContent>
      <Scene></Scene>
    </div>
  </section>
</template>

<script>
import Scene from "../components/Scene/Scene.vue";
import AppHomeContent from "../components/AppHomeContent.vue";
export default {
  components: {
    Scene,
    AppHomeContent
  }
};
</script>

<style lang="scss">
</style>

