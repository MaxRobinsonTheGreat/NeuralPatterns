const Shaders = {
    fragmentShader: `
    precision mediump float;

    uniform sampler2D u_image;

    varying vec2 texCoord;

    uniform vec2 onePixel;

    uniform bool doStep;

	uniform vec4 colorMask;

	uniform float u_kernel[9];


    vec2 getCoords(vec2 coord, vec2 offset){
        return mod(coord + onePixel * offset, 1.0);
    }

	ACTIVATION_FUNCTION

    void main(void){

        if(doStep){
            float sum = texture2D(u_image, getCoords(texCoord, vec2(1.0, -1.0))).a * u_kernel[0]
                + texture2D(u_image, getCoords(texCoord, vec2(0.0, -1.0))).a * u_kernel[1]
                + texture2D(u_image, getCoords(texCoord, vec2(-1.0, -1.0))).a * u_kernel[2]
                + texture2D(u_image, getCoords(texCoord, vec2(1.0, 0.0))).a * u_kernel[3]
                + texture2D(u_image, getCoords(texCoord, vec2(0.0, 0.0))).a * u_kernel[4]
                + texture2D(u_image, getCoords(texCoord, vec2(-1.0, 0.0))).a * u_kernel[5]
                + texture2D(u_image, getCoords(texCoord, vec2(1.0, 1.0))).a * u_kernel[6]
                + texture2D(u_image, getCoords(texCoord, vec2(0.0, 1.0))).a * u_kernel[7]
                + texture2D(u_image, getCoords(texCoord, vec2(-1.0, 1.0))).a * u_kernel[8];
            
            float x = activation(sum);

			CUMULATIVE_DISPLAY
            
            gl_FragColor = vec4(x, x, x, x);

        } else {
			// color masking
			gl_FragColor = texture2D(u_image, texCoord).rgba * colorMask;
            
        }
    }
    `,

    vertexShader: `
    attribute vec2 coordinates;

    varying vec2 texCoord;
    
    void main(void){
        
        texCoord = (coordinates/2.0 + 0.5);
        
        gl_Position = vec4(coordinates, 1.0, 1.0);
    
    }
    `,
}

export default Shaders;