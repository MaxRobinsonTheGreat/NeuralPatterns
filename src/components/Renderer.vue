<template>
	<div id="canvasContainer">
		<canvas id="renderCanvas" 
		width="512" 
		height="512"
		v-on:mouseup="mouseup"
		v-on:mousemove="mousemove"
		v-on:mousedown="mousedown"
		v-on:touchstart="mousedown"
		v-on:touchend="mouseup"
		v-on:touchmove="touchmove"
		v-on:onwheel="onwheel"
		oncontextmenu="return false;"
		></canvas>
	</div>
</template>

<script>

import Controller from '../js/controller'

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
			top: 0,
			left: 0,
			pixelated: false
		} 
	},

	mounted() {
		this.canvas = document.getElementById("renderCanvas");
		Controller.initRenderer(this.canvas);
		this.canvas.onwheel = this.onwheel;
	},

	methods: {
		mouseup() {
			this.mouse_down = false;
		},
		mousedown(event) {
			this.mouse_down = true;
			this.left_click = event.button === 0;
			Controller.renderer.poke(event.offsetX, event.offsetY, this.left_click);
		},
		mousemove(event) { 
			this.x = event.offsetX;
			this.y = event.offsetY;
			if (this.mouse_down)
				Controller.renderer.poke(this.x, this.y, this.left_click);
		},
		touchmove(event) {
			// if (event.targetTouches.length !== 1) return;
			event.preventDefault(); 
			this.x = event.targetTouches[0].clientX;
			this.y = event.targetTouches[0].clientY;
			if (this.mouse_down)
				Controller.renderer.poke(this.x, this.y, true);
		},

		onwheel(e) {
			e.preventDefault();
			let canvas = this.canvas;
			this.x = e.offsetX;
			this.y = e.offsetY;
			let sign = -Math.sign(e.deltaY);
			let new_scale = Math.max(1, this.scale+(sign));
			// let calculated = canvas.currentStyle || window.getComputedStyle(p);
			// console.log(calculated.marginTop)
			// console.log(canvas.style)//.style('marginTop'))

			if (new_scale > 1) {
				this.setPixelated(true);
				if (sign == 1) {
					// If we're zooming in, zoom towards the mouse is (keep mouse in same location after zoom)
					let half_w = Math.floor(this.canvas.width/2);
					let half_h = Math.floor(this.canvas.height/2);
					// let prev_scale = this.scale-1;
					// this.left += ((half_w-this.left/prev_scale)*prev_scale - this.x);
					// this.top += ((half_h-this.top/prev_scale)*prev_scale - this.y);

					this.left += (half_w  - this.x) * (new_scale - this.scale);
					this.top += (half_h - this.y) * (new_scale - this.scale);


					// camera view should not leave canvas
					// below clamp will force this, but it is not necessary with the above code
					// this.left = this.clamp(this.left, -half_w*prev_scale, half_w*prev_scale);
					// this.top = this.clamp(this.top, -half_h*prev_scale, half_h*prev_scale);
				}
				else {
					// If we're zooming out, zoom back out towards the center
					this.left -= (this.left/new_scale);
					this.top -= (this.top/new_scale);
				}
				this.scale = new_scale;
			}
			else {
				this.setPixelated(false);
				this.left = 0;
				this.top = 0;
				this.scale = 1;
			}
			canvas.style.transform = `scale(${this.scale})`;
			canvas.style.setProperty('left', `${this.left}px`);
			canvas.style.setProperty('top', `${this.top}px`);
				
		},

		clamp(num, min, max) { // unused, could be useful
			return Math.min(Math.max(num, min), max);
		},

		setPixelated(p) {
			if (p === this.pixelated) return;
			this.pixelated = p;
			let c = this.canvas;
            if (p) {
                c.style['image-rendering'] = 'pixelated';
                c.style['-ms-interpolation-mode'] = 'nearest-neighbor';
            }
            else {
                c.style['image-rendering'] = 'auto';
                c.style['-ms-interpolation-mode'] = 'auto';  
            }
            Controller.renderer.updateDisplay();
		}
	},
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#canvasContainer, canvas {
	position: absolute;
	border: none;
	padding: 0px;
	/* margin: 0px; */
	/* margin: auto;
	left: 0;
	top: 0;
	bottom: 0;
	right: 0;
	z-index: 0; */
}
</style>
