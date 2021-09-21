<template>
    <div id="state-settings">
        <button  v-for="val in reset_types" :key="val.type" 
            type='button'
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
                {type: 'random', title: 'Random Floats'},
                {type: 'random_bool', title: 'Random Ints'},
                {type: 'center', title: 'Center'},
                {type: 'center_top', title: 'Center Top'}
            ],
            selected_type: Controller.reset_type,
        }
    },

    methods: {
        reset(type=undefined) {
            if (type!==undefined) {
                this.selected_type = type;
            }
            Controller.resetState(this.selected_type);
        },
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
