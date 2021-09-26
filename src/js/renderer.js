import Shaders from './shaders'

class Renderer {
	constructor(canvas) {
		this.canvas = canvas;
		canvas.height = window.innerHeight;
		canvas.width = window.innerWidth;
		this.height = canvas.height;
		this.width = canvas.width;
		
		this.gl = canvas.getContext("webgl");

		this.setBrush(5, 1);
		this.activationSource = '';
		this.persistent = false;
	}

	compileShaders(vertexSource, fragSource, activationSource=undefined) {
		this.vertexSource = vertexSource; // saved without string replacements
		this.fragSource = fragSource;
		let gl = this.gl;

		if (activationSource){
			this.setActivationSource(activationSource);
		}
		fragSource = this.setFragValues(fragSource);

		// Create a vertex shader object
		let vertShader = gl.createShader(gl.VERTEX_SHADER);

		// Attach vertex shader source code
		gl.shaderSource(vertShader, vertexSource);

		// Compile the vertex shader
		gl.compileShader(vertShader);

		// Create fragment shader object
		let fragShader = gl.createShader(gl.FRAGMENT_SHADER);

		// Attach fragment shader source code
		gl.shaderSource(fragShader, fragSource);

		// Compile the fragmentt shader
		gl.compileShader(fragShader);

		// Create a shader program object to store
		// the combined shader program
		let shaderProgram = gl.createProgram();
		this.shader = shaderProgram;

		// Attach a vertex shader
		gl.attachShader(shaderProgram, vertShader); 

		// Attach a fragment shader
		gl.attachShader(shaderProgram, fragShader);

		// Link both programs
		gl.linkProgram(shaderProgram);

		// Use the combined shader program object
		gl.useProgram(shaderProgram);

		if(gl.getShaderInfoLog(fragShader)){
			// console.error("FRAGMENT SHADER ERROR:", gl.getShaderInfoLog(fragShader));
			return gl.getShaderInfoLog(fragShader);
		}
		if(gl.getShaderInfoLog(vertShader)){
			console.error("VERTEX SHADER ERROR:", gl.getShaderInfoLog(vertShader));
		}
		if(gl.getProgramInfoLog(shaderProgram)){
			console.error("SHADER PROGRAM ERROR:", gl.getProgramInfoLog(shaderProgram));
		}
		let vertexBuffer = gl.createBuffer();

		/*==========Defining and storing the geometry=======*/

		let vertices = [
			-1.0, -1.0,
			1.0, -1.0,
			-1.0,  1.0,
			-1.0,  1.0,
			1.0, -1.0,
			1.0,  1.0
		];

		this.size = ~~(vertices.length/2);
		
		gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
		gl.bindBuffer(gl.ARRAY_BUFFER, null);

		gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

		// Get the attribute location
		let coord = gl.getAttribLocation(shaderProgram, "coordinates");

		// Point an attribute to the currently bound VBO
		gl.vertexAttribPointer(coord, 2, gl.FLOAT, false, 0, 0);

		// Enable the attribute
		gl.enableVertexAttribArray(coord);
		
		// define attributes
		this.onePixelAttr = gl.getUniformLocation(shaderProgram, "onePixel");
		this.doStepAttr = gl.getUniformLocation(shaderProgram, "doStep");
		this.kernelAttr = gl.getUniformLocation(this.shader, "u_kernel[0]");
		this.colorMaskAttr = gl.getUniformLocation(this.shader, "colorMask");
		return null;
	}

	setFragValues(fragSource, activationSource=this.activationSource, persistent=this.persistent) {
		fragSource = fragSource.replace("ACTIVATION_FUNCTION", activationSource);
		let persistentSource = persistent ? Shaders.persistentSource : '';
		fragSource = fragSource.replace("PERSISTENT_DISPLAY", persistentSource);
		return fragSource;
	}

	recompile() {
		return this.compileShaders(this.vertexSource, this.fragSource);
	}

	getState() {
		let gl = this.gl;
		gl.bindFramebuffer(gl.FRAMEBUFFER, this.fbb);
		let data = new Uint8Array(this.width * this.height * 4);
		gl.readPixels(0, 0, this.width, this.height, gl.RGBA, gl.UNSIGNED_BYTE, data);
		return data;
	}

	setState(startState) {
		let gl = this.gl;
		
		this.stateTexture = gl.createTexture();
		gl.bindTexture(gl.TEXTURE_2D, this.stateTexture);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, this.width, this.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, startState);

		this.txa = gl.createTexture();
		gl.bindTexture(gl.TEXTURE_2D, this.txa);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
		
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, this.width, this.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
		
		this.fba = gl.createFramebuffer();
		gl.bindFramebuffer(gl.FRAMEBUFFER, this.fba);
		
		gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.txa, 0);
		
		this.txb = gl.createTexture();
		gl.bindTexture(gl.TEXTURE_2D, this.txb);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
		
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, this.width, this.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
		
		this.fbb = gl.createFramebuffer();
		gl.bindFramebuffer(gl.FRAMEBUFFER, this.fbb);
		
		gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.txb, 0);

		gl.bindTexture(gl.TEXTURE_2D, this.stateTexture);
		
		this.updateDisplay();
	}

	setActivationSource(activationSource) {
		// always requires recompilation
		this.activationSource = activationSource;
	}

	setColor(rgb) {
		this.colorMask = {r:rgb[0], g:rgb[1], b:rgb[2]};
		if (this.gl) {
			this.gl.uniform4f(this.colorMaskAttr, this.colorMask.r, this.colorMask.g, this.colorMask.b, 1.0);
			this.updateDisplay();
		}
		
	}

	setKernel(kernel) {
		this.kernel = kernel;
	}

	setBrush(size) {
		this.brush_size = size;
		let arr_size = size*size*4;
		this.brush_arr_1 = new Uint8Array(arr_size);
		this.brush_arr_0 = new Uint8Array(arr_size);
		for (let i=0; i<arr_size; i++) {
			this.brush_arr_1[i] = 255;
			this.brush_arr_0[i] = 0;
		}
	}

	beginRender(){
		let gl = this.gl;
		if (this.running)
			throw 'called beginRender() when already rendering'
		this.running = true;

		gl.uniform2f(this.onePixelAttr, 1/this.width, 1/this.height);
		gl.uniform1f(this.doStepAttr, true);
        gl.uniform1fv(this.kernelAttr, this.kernel);
		gl.uniform4f(this.colorMaskAttr, this.colorMask.r, this.colorMask.g, this.colorMask.b, 1.0);

		this.render();
	}

	stopRender(){
		this.running = false;
		if (this.updaterequest)
			window.cancelAnimationFrame(this.updaterequest);
	}

	render(){
		let gl = this.gl;
		gl.uniform1f(this.doStepAttr, true);

		gl.bindFramebuffer(gl.FRAMEBUFFER, this.fbb);
		gl.drawArrays(gl.TRIANGLES, 0, this.size);
		gl.bindTexture(gl.TEXTURE_2D, this.txb); // use texture b

		gl.bindFramebuffer(gl.FRAMEBUFFER, null);
		gl.drawArrays(gl.TRIANGLES, 0, this.size);

		gl.uniform1f(this.doStepAttr, false);

		gl.bindFramebuffer(gl.FRAMEBUFFER, this.fba);
		gl.drawArrays(gl.TRIANGLES, 0, this.size);
		gl.bindTexture(gl.TEXTURE_2D, this.txa);

		this.updateDisplay();

		if(this.running){
			this.updaterequest = window.requestAnimationFrame(()=>{this.render();});
			// setTimeout(()=>{this.render();}, 0); // set render speed
		}
	}

	updateDisplay() {
		let gl = this.gl;
		gl.bindFramebuffer(gl.FRAMEBUFFER, null);
		gl.drawArrays(gl.TRIANGLES, 0, this.size);
	}

	poke(x, y, fill_ones=true) {
		let gl = this.gl;
		y = this.height - y; // reverse y

		x = x - Math.floor(this.brush_size/2); // center brush
		y = y - Math.floor(this.brush_size/2);

		let brush_arr = fill_ones ? this.brush_arr_1 : this.brush_arr_0;

		gl.texSubImage2D(gl.TEXTURE_2D, 0, x, y, this.brush_size, this.brush_size,
                     gl.RGBA, gl.UNSIGNED_BYTE,
                     brush_arr);
		this.updateDisplay();
	}
}

export default Renderer;