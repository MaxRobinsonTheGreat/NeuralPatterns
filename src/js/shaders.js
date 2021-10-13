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
            PERSISTENT_DISPLAY
            
            // kernel indexes
            //    0       1       2
            //    3       4       5
            //    6       7       8
            // corresponding pixel coordinates (c, r)
            // ( 1,-1) ( 0,-1) (-1,-1)
            // ( 1, 0) ( 0, 0) (-1, 0)
            // ( 1, 1) ( 0, 1) (-1, 1)
            //                                          pixel( c,  r)   kernel weight[i]
            float sum = 
                  texture2D(u_image, getCoords(texCoord, vec2( 1.,-1.))).a * u_kernel[0] 
                + texture2D(u_image, getCoords(texCoord, vec2( 0.,-1.))).a * u_kernel[1]
                + texture2D(u_image, getCoords(texCoord, vec2(-1.,-1.))).a * u_kernel[2]
                + texture2D(u_image, getCoords(texCoord, vec2( 1., 0.))).a * u_kernel[3]
                + texture2D(u_image, getCoords(texCoord, vec2( 0., 0.))).a * u_kernel[4]
                + texture2D(u_image, getCoords(texCoord, vec2(-1., 0.))).a * u_kernel[5]
                + texture2D(u_image, getCoords(texCoord, vec2( 1., 1.))).a * u_kernel[6]
                + texture2D(u_image, getCoords(texCoord, vec2( 0., 1.))).a * u_kernel[7]
                + texture2D(u_image, getCoords(texCoord, vec2(-1., 1.))).a * u_kernel[8];
            
            // Note on reversed implementation:
            // According to https://en.wikipedia.org/wiki/Kernel_(image_processing)#Convolution if the kernel
            // is not symmetric, it should be reversed before computing. This is how it is implemented in 
            // a number of python libraries, and thus how I implemented it here. I find it more intuitive.

            float x = activation(sum);
            
            gl_FragColor = vec4(x, x, x, x);

        } else {
			// color masking
            float x = texture2D(u_image, texCoord).a;
			gl_FragColor = vec4(x, x, x, x) * colorMask;
            
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

    persistentSource: `
    float cur = texture2D(u_image, getCoords(texCoord, vec2(0.0, 0.0))).a;
    if (cur != 0.) {
        gl_FragColor = vec4(cur, cur, cur, cur);
        return;
	}
    `,

    defaultActivationSource: 
    `float activation(float x) {\n\treturn x;\n}`,
}

export default Shaders;