<template>
    <div id="state-settings">
        <button  v-for="val in reset_types" :key="val.type" 
            type='button'
            :title="val.tooltip"
            v-bind:class="{selected: selected_type === val.type}"
            v-on:click="reset(val.type)">
                {{val.title}}
        </button>
        <button type='button' id='empty' v-on:click="reset('empty')">Clear</button>
    </div>
</template>

<script>
import Controller from '../../js/controller';

export default {
    name: 'StateSettings',
    data() {
        return {
            reset_types: [
                {type: 'random', title: 'Random Floats', tooltip: 'Random decimal values between 0 and 1'},
                {type: 'random_bool', title: 'Random Ints', tooltip: 'Random 1s and 0s'},
                {type: 'center', title: 'Center', tooltip: 'A single 1 in the center'},
                {type: 'center_top', title: 'Center Top', tooltip: 'A single 1 at the top (wraps to bottom)'}
            ],
            selected_type: Controller.reset_type,
        }
    },

    methods: {
        reset(type=undefined) {
            if (type!==undefined && type!==`empty`) {
                this.selected_type = type;
            }
            Controller.resetState(type);
        },
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#state-settings {
    margin-top: 5px;
    margin-bottom: 5px;
}

button:not(#empty) {
    width: 120px;
}

.selected {
    background-color: rgb(160, 127, 20);
}

.selected:hover {
    background-color: rgb(214, 174, 43);
    /* border: 2px rgb(56, 53, 33) outset; */

    /* border: 2px rgb(255, 250, 181) solid; */
}

.selected:active {
    background-color: #4d3a07;
    border-style: inset;
}
</style>
