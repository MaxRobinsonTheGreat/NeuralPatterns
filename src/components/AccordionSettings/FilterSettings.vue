<template>
    <div id="filter-settings">
        <table>
            <tr v-for="(row, j) in filter" :key="row.id">
                <td v-for="(val, i) in row.vals" :key="j+','+i">
                    <input 
                        class="filter-val"
                        :value="val"
                        ref="filterInputs"
                        @change="updateFilter($event, row, i)"  
                        @focus="$event.target.select()"
                        type="number"
                    >
                </td>
            </tr>
        </table>

        <div id="rand-form">
            <button type='button' v-on:click="randomize()">Randomize Filter</button>
            <input v-model.number="min" type="number">
            <input v-model.number="max" type="number">
            <input v-model="hor_sym" type="checkbox" @change="setSymmetry()">
            <input v-model="ver_sym" type="checkbox" @change="setSymmetry()">
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
        return {
            filter: {},
            min: -1,
            max: 1,
            hor_sym: false,
            ver_sym: false
        }
    },

    mounted() {
        this.setFilter(Controller.filter);
    },

    methods: {
        updateFilter(event, row, i) {
            let val = event.target.value;
            val = val ? val : 0;
            let index = parseInt(row.id)*3 + i;
            Controller.filter[index] = parseFloat(val);
            this.setFilter(Controller.filter)
            Controller.apply();
        },

        randomize() {
            let filter = Utils.randomKernel(this.min, this.max, this.hor_sym, this.ver_sym);
            this.setFilter(filter);
            Controller.filter = filter;
            Controller.apply();
        }, 

        setSymmetry() {
            let f = Controller.filter;
            let disabled = [];
            if (this.hor_sym){
                f = Utils.hSymmetry(f);
                disabled.push(...[6, 7, 8]);
            }
            if (this.ver_sym) {
                f = Utils.vSymmetry(f);
                disabled.push(...[2, 5, 8]);
            }
            for (let input of this.$refs.filterInputs) {
                input.disabled = false; // re enable all inputs
            }
            for (let i of disabled) {
                this.$refs.filterInputs[i].disabled = true;
            }
            
            Controller.kernel = f;
            Controller.apply();

            this.setFilter(Controller.filter);
        },

        setFilter(f) {
            const _ = (i) => { return parseFloat(f[i].toFixed(4)) }

            Vue.set(this.filter, 0, {id:0, vals:[_(0), _(1), _(2)]});
            Vue.set(this.filter, 1, {id:1, vals:[_(3), _(4), _(5)]});
            Vue.set(this.filter, 2, {id:2, vals:[_(6), _(7), _(8)]});
            return this.filter;
        },
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

input {
    width: 50px;
}

.filter-val {
    width: 50px;
    color: white;
    text-align: center;
    background-color: #380658;
    
    border: 2px rgb(43, 32, 68) solid;
    border-style: inset;

    padding: 3px;
    margin: 0px;
}

.filter-val:hover:enabled {
    border: 2px rgb(255, 250, 181) solid;
    /* border-style: ; */
}

.filter-val:disabled {
    color: gray;
}

.filter-val::-webkit-outer-spin-button,
.filter-val::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
.filter-val[type=number] {
  -moz-appearance: textfield;
}

</style>
