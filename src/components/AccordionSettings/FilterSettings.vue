<template>
    <div id="filter-settings">
        <table>
            <tr v-for="(row, j) in filter" :key="row.id">
                <td v-for="(val, i) in row.vals" :key="j+','+i">
                    <input :value="val" @change="updateConfig($event, row, i)" type="number">
                </td>
            </tr>
        </table>

        <div id="rand-form">
            <button type='button' v-on:click="randomize()">Randomize Filter</button>
            <input v-model.number="min" type="number">
            <input v-model.number="max" type="number">
            <input v-model="hor_sym" type="checkbox">
            <input v-model="ver_sym" type="checkbox">
        </div>
        
    </div>
</template>

<script>

import Vue from 'vue'
import Utils from '../../js/utils'
import Controller from '../../js/controller'

export default {
    name: 'FilterSettings',
    data() {
        let f = Controller.filter;
        let filter =[{id:0, vals:[f[0], f[1], f[2]]},
                     {id:1, vals:[f[3], f[4], f[5]]},
                     {id:2, vals:[f[6], f[7], f[8]]}]
        return {
            filter,
            min: -1,
            max: 1,
            hor_sym: false,
            ver_sym: false
        }
    },

    methods: {
        updateConfig(event, row, i) {
            let index = parseInt(row.id)*3 + i;
            Controller.filter[index] = parseFloat(event.target.value);
        },

        randomize() {
            let filter = Utils.randomKernel(this.min, this.max, this.hor_sym, this.ver_sym);
            this.setFilter(filter);
            Controller.filter = filter;
            Controller.apply();
        }, 

        setFilter(f) {
            Vue.set(this.filter, 0, {id:0, vals:[f[0], f[1], f[2]]});
            Vue.set(this.filter, 1, {id:1, vals:[f[3], f[4], f[5]]});
            Vue.set(this.filter, 2, {id:2, vals:[f[6], f[7], f[8]]});
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

input {
    width: 50px;
}

</style>
