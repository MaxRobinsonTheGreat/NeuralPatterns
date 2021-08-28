<template>
  <div id="canvasContainer">
    <canvas id="renderCanvas" width="512" height="512"></canvas>
  </div>
</template>

<script>

import Renderer from '../js/renderer.js';
import Shaders from '../js/shaders.js';
import Utils from '../js/utils.js';

export default {
  name: 'Renderer',

  mounted() {
    let canvas = document.getElementById("renderCanvas");
    let renderer = new Renderer(canvas);
    renderer.setColor(Utils.randomColor());
    renderer.compileShaders(Shaders.vertexShader, Shaders.fragmentShader);
    renderer.setState(Utils.generateState(renderer.width, renderer.height, 'random'));
    renderer.setKernel(Utils.randomKernel());
    renderer.beginRender();
    this.renderer = renderer;
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#canvasContainer, canvas {
  border: none;
  padding: 0px;
  margin: 0px;
}
</style>
