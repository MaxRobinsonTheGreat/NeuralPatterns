<template>
    <div id="display-settings">
        <input id='name' type='color' v-model="hexColor" @change="changeColor()">
        <button type='button' v-on:click="randomize()">Randomize Color</button>
    </div>
</template>

<script>
import Controller from '../../js/controller';
import Utils from '../../js/utils';

export default {
    name: 'DisplaySettings',
    data() {
        return {
            rgbColor: [0, 0, 0],
            hexColor: '#000000'
        }
    },

    mounted() {
        this.rgbColor = Controller.color;
        this.hexColor = this.rgbToHex(Controller.color);
    },

    methods: {
        randomize() {
            this.rgbColor = Utils.randomColor();
            this.hexColor = this.rgbToHex(this.rgbColor);
            this.changeColor();
        },

        changeColor() {
            Controller.color = this.hexToRgb(this.hexColor);
            Controller.apply();
        },

        hexToRgb(hex) {
            let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            return result ? [
                parseInt(result[1], 16) / 255,
                parseInt(result[2], 16) / 255,
                parseInt(result[3], 16) / 255
            ] : null;
        },

        rgbToHex(rgb) {
            let r = Math.ceil(rgb[0]*255);
            let g = Math.ceil(rgb[1]*255);
            let b = Math.ceil(rgb[2]*255);
            return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
