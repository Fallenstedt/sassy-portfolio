<template>
  <section>
    <SceneContent/>
    <Scene/>
  </section>
</template>

<script>
import Scene from "../components/Scene/Scene.vue";
import SceneContent from "../components/Scene/SceneContent.vue";
export default {
  components: {
    Scene,
    SceneContent
  }
};
</script>

<style lang="scss">
</style>

