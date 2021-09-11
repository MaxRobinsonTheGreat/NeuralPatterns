import Utils from './utils'
import Renderer from '../js/renderer';
import Shaders from '../js/shaders';

const Controller = {
    init() {
        this.filter = Utils.randomKernel();
        this.color = Utils.randomColor();
        this.paused = false;
        this.reset_type = 'random';
        this.activationSource = `
		float activation(float x) {
			return x;
		}
		`;
    },

    initRenderer(canvas) {
        let renderer = new Renderer(canvas);
        renderer.setColor(this.color);
        renderer.setActivationSource(this.activationSource);
        renderer.setKernel(this.filter);
        renderer.compileShaders(Shaders.vertexShader, Shaders.fragmentShader);
        renderer.setState(Utils.generateState(renderer.width, renderer.height, 'random'));
        renderer.beginRender();
        this.renderer = renderer;

        window.onresize = () => {
			if (window.innerWidth === this.renderer.width && window.innerHeight === this.renderer.height)
				return;
			this.renderer.stopRender();
			canvas.height = window.innerHeight;
			canvas.width = window.innerWidth;
			this.renderer.height = canvas.height;
			this.renderer.width = canvas.width;
			this.renderer.gl.viewport(0, 0, this.renderer.width, this.renderer.height);
			this.renderer.setState(Utils.generateState(this.renderer.width, this.renderer.height, this.reset_type));
            if (!this.paused)
                this.renderer.beginRender();
		};
    }, 

    load(config) {
        this.reset_type = config.reset_type;
        this.filter = config.filter;
        this.activationSource = config.activation;
        this.color = config.color;
        this.setPersistent(config.persistent);
        this.apply(true);
        this.resetState();
    },

    setRenderer(r) {
        this.renderer = r;
    },

    apply(recompile=false) {
        if (!this.paused) {
            this.renderer.stopRender();
            this._apply(recompile);
            this.renderer.beginRender();
        }
        else 
            this._apply(recompile);
    },

    _apply(recompile) {
        this.renderer.setKernel(this.filter);
        this.renderer.setColor(this.color);
        this.renderer.activationSource = this.activationSource;
        if (recompile)
            this.renderer.recompile();
    },

    resetState(type = this.reset_type) {
        this.reset_type = type;
        let state = Utils.generateState(this.renderer.width, this.renderer.height, this.reset_type);
        this.renderer.setState(state);
    },

    setPersistent(c) {
        this.renderer.persistent = c;
        this.apply(true);
    },

    pauseToggle() {
        this.paused = !this.paused;
        if (this.paused)
            this.renderer.stopRender();
        else 
            this.renderer.beginRender();
        return this.paused;
    },
}
Controller.init()
export default Controller