<template>
  <div id="canvasContainer">
    <canvas id="renderCanvas" 
      width="512" 
      height="512"
      v-on:mouseup="mouseup"
      v-on:mousemove="mousemove"
      v-on:mousedown="mousedown"
    ></canvas>
  </div>
</template>

<script>

import controller from '../js/controller'

export default {
  name: 'Renderer',
  data() {
    return {
      mouse_down: false
    } 
  },

  mounted() {
    let canvas = document.getElementById("renderCanvas");
    controller.initRenderer(canvas)
  },
  
  methods: {
    mouseup() {
      this.mouse_down = false;
    },
    mousedown(event) {
      this.mouse_down = true;
      controller.renderer.poke(event.x, event.y);
    },
    mousemove(event) {
      if (this.mouse_down)
        controller.renderer.poke(event.x, event.y);
    }
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
