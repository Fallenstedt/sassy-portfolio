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
    if (this.$refs.scene) {
      this.sceneManager = new Scene(this.$refs.scene);
    }
  },
  beforeDestroy() {
    if (this.sceneManager) {
      this.sceneManager.cleanUp();
      this.sceneManager = undefined;
    }
  }
};
</script>

<style lang="scss">
.scene {
  height: 97vh;
  overflow: hidden;
  margin: 10px;
  background-color: #f5f5f5;
  &__scene-container {
    width: inherit;
    height: inherit;
    overflow: hidden;
  }
  &__canvas {
    opacity: 0.5;
    border-radius: 3px;
    overflow: hidden;
    margin: 0;
    padding: 0;
    // width: inherit !important;
  }
}
</style>
