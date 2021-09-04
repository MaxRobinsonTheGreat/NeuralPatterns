<template>
    <div id="state-settings">
        <div id="buttons">
            <button type='button' id='random' v-on:click="reset('random')">Random</button>
            <button type='button' id='random_bool' v-on:click="reset('random_bool')">Random Boolean</button><br>
            <button type='button' id='center' v-on:click="reset('center')">Center</button>
            <button type='button' id='center_top' v-on:click="reset('center_top')">Center Top</button>
        </div>
        <input type='checkbox' v-model="cumulative" @change="setCumulative()">
    </div>
</template>

<script>
import Controller from '../../js/controller';
// import Utils from '../../js/utils';

export default {
    name: 'StateSettings',
    data() {
        return {
            active_button: Controller.reset_type,
            cumulative: false
        }
    },

    methods: {
        reset(type=undefined) {
            if (type!==undefined) {
                this.active_button = type;
            }
            Controller.resetState(this.active_button);
        },

        setCumulative() {
            Controller.setCumulative(this.cumulative)
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
