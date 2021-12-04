import Utils from './utils'
import Renderer from '../js/renderer';
import Shaders from '../js/shaders';
import IsMobile from '../js/ismobile';

const Controller = {
    init() {
        this.filter = Utils.randomKernel();
        this.color = Utils.randomColor();
        this.paused = false;
        this.reset_type = 'random';
        this.activationSource = Shaders.defaultActivationSource;
    },

    initRenderer(canvas) {
        let renderer = new Renderer(canvas);
        renderer.setActivationSource(this.activationSource);
        renderer.setKernel(this.filter);
        renderer.compileShaders(Shaders.vertexShader, Shaders.fragmentShader);
        renderer.setColor(this.color);
        renderer.setState(Utils.generateState(renderer.width, renderer.height, 'random'));
        renderer.beginRender();
        this.renderer = renderer;

        function nearestPow2(n){
            return Math.pow(2, Math.ceil(Math.log(n) / Math.log(2))); 
        }

        window.onresize = () => {
			if (window.innerWidth === this.renderer.width && window.innerHeight === this.renderer.height)
				return;
			this.renderer.stopRender();
			canvas.height = IsMobile ? nearestPow2(window.innerHeight) : window.innerHeight;
			canvas.width = IsMobile? nearestPow2(window.innerWidth) : window.innerWidth;
            // canvas.height = 256;
			// canvas.width = 512;
			this.renderer.height = canvas.height;
			this.renderer.width = canvas.width;
			this.renderer.gl.viewport(0, 0, this.renderer.width, this.renderer.height);
			this.renderer.setState(Utils.generateState(this.renderer.width, this.renderer.height, this.reset_type));
            if (!this.paused)
                this.renderer.beginRender();
		};
        window.onresize();
    }, 

    load(config, reset) {
        this.reset_type = config.reset_type;
        this.filter = config.filter;
        this.activationSource = config.activation;
        if (config.color !== "random")
            this.color = config.color;
        this.setPersistent(config.persistent);
        this.apply(true);
        if (reset)
            this.resetState();
    },

    setRenderer(r) {
        this.renderer = r;
    },

    apply(recompile=false) {
        if (!this.paused) {
            this.renderer.stopRender();
            let error = this._apply(recompile);
            this.renderer.beginRender();
            return error;
        }
        else {
            let error =  this._apply(recompile);
            this.renderer.applyValues();
            return error;
        }
    },

    _apply(recompile) {
        this.renderer.setKernel(this.filter);
        this.renderer.setColor(this.color);
        this.renderer.activationSource = this.activationSource;
        
        if (recompile)
            return this.renderer.recompile();
        return null;
    },

    resetState(type = this.reset_type) {
        this.reset_type = (type!==`empty`) ? type : this.reset_type;
        let state = Utils.generateState(this.renderer.width, this.renderer.height, type);
        this.renderer.setState(state);
    },

    setColor(color) {
        this.color = color;
        this.renderer.setColor(color);
    },

    setPersistent(c) {
        this.renderer.persistent = c;
        this.apply(true);
    },

    pauseToggle() {
        this.setPaused(!this.paused)
    },

    setPaused(paused) {
        if (this.paused === paused) return;
        this.paused = paused;
        if (this.paused)
            this.renderer.stopRender();
        else 
            this.renderer.beginRender();
        return this.paused;
    },

    step() {
        this.renderer.render();
    },

    offsetSkippedFrame() {
        this.renderer.updateState();
        this.renderer.updateDisplay();
    }
}
Controller.init()
export default Controller