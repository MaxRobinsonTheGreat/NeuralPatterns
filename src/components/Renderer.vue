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

		onwheel(e) {
			e.preventDefault();
			let canvas = this.canvas;
			this.x = e.offsetX;
			this.y = e.offsetY;
			let sign = -Math.sign(e.deltaY);
			this.scale = Math.max(1, this.scale+(sign*1));

			console.log('mouse', this.x, this.y)
			if (this.scale > 1) {
				this.setPixelated(true);
				// console.log("left", this.left, "top", this.top);
				if (sign == 1) {
					// If we're zooming in, zoom towards wherever the mouse is

					let half_w = Math.floor(this.canvas.width/2);
					let half_h = Math.floor(this.canvas.height/2);
					this.left = (half_w - this.x) * this.scale;
					this.top = (half_h - this.y) * this.scale;
				}
				else {
					// If we're zooming out, zoom out towards the center
					// let half_w = Math.floor(this.canvas.width/2);
					// let half_h = Math.floor(this.canvas.height/2);
					this.left = -this.left/this.scale;
					this.top = -this.top/this.scale;
				}
				// console.log("delta x", delta_x)
				// const clamp = (num, min, max) => Math.min(Math.max(num, min), max);
				// let min_l = canvas.width - (canvas.width * this.scale / 2);
				// let max_l = canvas.width;
				// let max_t = canvas.height;
				// console.log(min_l, max_l, delta_l + this.left)
				// this.left = clamp(delta_l + this.left, min_l, max_l);
				// this.top = clamp(delta_t + this.top, 0, max_t);
			}
			else {
				this.setPixelated(false);
				this.left = 0;
				this.top = 0;
			}
			// console.log("final", this.left, this.top)
			canvas.style.transform = `scale(${this.scale})`;
			canvas.style.setProperty('left', `${this.left}px`);
			canvas.style.setProperty('top', `${this.top}px`);
				
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
	margin: 0px;
	left: 0px;
	top: 0px;
	z-index: 0;
}
</style>
