import Utils from './utils'
import Renderer from '../js/renderer';
import Shaders from '../js/shaders';

const Controller = {
    init() {
        this.filter = Utils.randomKernel();
        this.color = Utils.randomColor();
        this.paused = false;
        this.reset_type = 'random';
    },

    initRenderer(canvas) {
        let renderer = new Renderer(canvas);
        renderer.setColor(this.color);
        renderer.compileShaders(Shaders.vertexShader, Shaders.fragmentShader);
        renderer.setState(Utils.generateState(renderer.width, renderer.height, 'random'));
        renderer.setKernel(this.filter);
        renderer.beginRender();
        this.renderer = renderer;
    }, 

    setRenderer(r) {
        this.renderer = r;
    },

    apply() {
        if (!this.paused) {
            this.renderer.stopRender();
            this._apply();
            this.renderer.beginRender();
        }
        else 
            this._apply();
    },

    _apply() {
        let recompile = false;
        this.renderer.setKernel(this.filter);
        this.renderer.setColor(this.color);
        if (recompile)
            this.renderer.recompile();
    },

    resetState(type = this.reset_type) {
        this.reset_type = type;
        let state = Utils.generateState(this.renderer.width, this.renderer.height, this.reset_type);
        this.renderer.setState(state);
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