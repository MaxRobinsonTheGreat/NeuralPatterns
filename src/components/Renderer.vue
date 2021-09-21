<template>
  <div id="canvasContainer">
    <canvas id="renderCanvas" 
      width="512" 
      height="512"
      v-on:mouseup="mouseup"
      v-on:mousemove="mousemove"
      v-on:mousedown="mousedown"
      v-on:onwheel="onwheel"
      oncontextmenu="return false;"
    ></canvas>
  </div>
</template>

<script>

import controller from '../js/controller'

export default {
  name: 'Renderer',
  data() {
    return {
      canvas: undefined,
      mouse_down: false,
      left_click: true,
      scale: 1,
      x: 0,
      y: 0,
    } 
  },

  mounted() {
    this.canvas = document.getElementById("renderCanvas");
    controller.initRenderer(this.canvas);
    this.canvas.onwheel = this.onwheel;
  },
  
  methods: {
    mouseup() {
      this.mouse_down = false;
    },
    mousedown(event) {
      this.mouse_down = true;
      this.left_click = event.button === 0;
      controller.renderer.poke(event.offsetX, event.offsetY, this.left_click);
    },
    mousemove(event) { 
      this.x = event.offsetX;
      this.y = event.offsetY;
      if (this.mouse_down)
        controller.renderer.poke(this.x, this.y, this.left_click);
    },
    onwheel(e) {
      e.preventDefault();
      let canvas = this.canvas;

      let sign = -Math.sign(e.deltaY);
      this.scale = Math.max(1, this.scale+(sign*1));

      canvas.style.transform = `scale(${this.scale})`;
      // console.log(canvas.style.left)
      // let cur_top = parseInt(canvas.style.top);
      // let cur_left = parseInt(canvas.style.left);
      // console.log(cur_left)
      // let delta_x=0, delta_y=0;
      // if (sign == 1) {
      //   // If we're zooming in, zoom towards wherever the mouse is
      //   delta_x = this.x;
      //   delta_y = this.y;
      // }
      // else {
      //   // If we're zooming out, zoom out towards the center
      //   delta_x = -cur_left/this.scale;
      //   delta_y = -cur_top/this.scale;
      // }
      // console.log(delta_x)
      // const clamp = (num, min, max) => Math.min(Math.max(num, min), max);
      // canvas.style.setProperty('left', `${clamp(cur_left+delta_x, 0, canvas.width)}px`);
      // canvas.style.setProperty('top', `${clamp(cur_top+delta_y, 0, canvas.height)}px`);
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#canvasContainer, canvas {
  position: absolute;
  border: none;
  padding: 0px;
  margin: 0px;
  left: 0;
  top: 0;
  z-index: 0;
}
</style>
