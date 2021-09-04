const Utils = {
	generateState(width, height, option='random') {
		let cells = new Uint8Array(height * width * 4);
		switch(option) {
			case 'random': {
				for(let i = 0; i < cells.length; i++){
					cells[i] = Math.floor(255 * Math.random())
				}
				cells[height * width * 2 + width*2] = 255;
				break;
            }

			case 'random_bool': {
				for(let i = 0; i < cells.length; i++){
					cells[i] = 255 * Math.floor(Math.random()*2);
				}
				break;
            }

			case 'center': {
				for(let i = 0; i < cells.length; i++){
					cells[i] = 0;
				}
				let center = Math.floor(cells.length/2) - 2;
				if (height%2 === 0) {
					// if height is even, it breaks for some reason
					center += width*2;
				}
				cells[center] = 255;
				cells[center+1] = 255;
				cells[center+2] = 255;
				cells[center+3] = 255;
				break;
            }
			
			case 'center_top': {
				for(let i = 0; i < cells.length; i++){
					cells[i] = 0;
				}
				cells[width*2] = 255;
				cells[width*2+1] = 255;
				cells[width*2+2] = 255;
				cells[width*2+3] = 255;
				break;
            }

			case 'empty': {
				for(let i = 0; i < cells.length; i++){
					cells[i] = 0;
				}
				break;
            }
		}
		return cells;
	},

    randomColor() {
        let color = [0, 0, 0];
        for (let i in color) {
            color[i] = Math.random();
        }
        color[Math.floor(Math.random()*3)] = 1;
        return color;
    },

    randomKernel(min=-1, max=1, h_symmetry=false, v_symmetry=false) {
        let range = max - min;
        let kernel = new Float32Array(9);
    
        for (let i in kernel){
            kernel[i] = Math.random()*range + min;
        }
    
        if (h_symmetry && v_symmetry){
            kernel[2] = kernel[0];
            kernel[6] = kernel[0];
            kernel[8] = kernel[0];
            kernel[7] = kernel[1];
            kernel[5] = kernel[3];
        }
        else if (h_symmetry){
            kernel[6] = kernel[0];
            kernel[7] = kernel[1];
            kernel[8] = kernel[2];
        }
        else if (v_symmetry){
            kernel[2] = kernel[0];
            kernel[5] = kernel[3];
            kernel[8] = kernel[6];
        }
        return kernel;
    },

    // structureKernel(kernel) {
    //     let s_kernel = [];
    //     while(kernel.length) s_kernel.push(kernel.splice(0,3));
    //     return s_kernel;
    // },
}

export default Utils