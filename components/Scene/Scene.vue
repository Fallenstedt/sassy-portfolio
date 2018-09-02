<template>
  <div class="scene">
    <div class="scene__scene-container">
      <canvas ref="scene" class="scene__canvas"></canvas>
    </div>
  </div>
</template>

<script>
import Scene from "./index";

export default {
  name: "Scene",
  data() {
    return {
      sceneManager: undefined
    };
  },
  mounted() {
    this.sceneManager = new Scene(this.$refs.scene);
  },
  destroyed() {
    this.sceneManger.cleanUp();
    this.sceneManger = undefined;
  }
};
</script>
<style lang="scss">
.scene {
  overflow: hidden;
  margin: 10px;
  &__scene-container {
    width: inherit;
    height: inherit;
    overflow: hidden;
  }
  &__canvas {
    border-radius: 3px;
    overflow: hidden;
    margin: 0;
    padding: 0;
    // width: inherit !important;
  }
}
</style>
