<template>
    <div id="filter-settings">
        <table>
            <tr v-for="(row, j) in filter" :key="row.id">
                <td v-for="(val, i) in row.vals" :key="j+','+i">
                    <input 
                        class="filter-val"
                        :value="val"
                        step="0.001"
                        ref="filterInputs"
                        @change="updateFilter($event, row, i)"  
                        @focus="$event.target.select()"
                        type="number"
                    >
                </td>
            </tr>
        </table>
        <!-- <button type='button' v-on:click="randomize()">Randomize Filter</button> -->

        <div id="options">
            <label for="range" :title="range_tooltip">Random Range: </label>
            <input v-model.number="min" class="range" type="number" id="range">
            <input v-model.number="max" class="range" type="number">
            <br>
            <input v-model="ver_sym" id="ver_sym" type="checkbox" @change="setSymmetry(0)" :title="ver_tooltip">
            <label for="ver_sym" :title="ver_tooltip">Vertical Symmetry</label>
            <br>
            <input v-model="hor_sym" id="hor_sym" type="checkbox" @change="setSymmetry(1)" :title="hor_tooltip">
            <label for="hor_sym" :title="hor_tooltip">Horizontal Symmetry</label>
            <br>
            <input v-model="full_sym" id="full_sym" type="checkbox" @change="setSymmetry(2)" :title="fullsym_tooltip">
            <label for="full_sym" :title="fullsym_tooltip">Full Symmetry</label>
        </div>
        <WikiSection><ConvolutionWiki/></WikiSection>
        
    </div>
</template>

<script>

import Vue from 'vue'
import Utils from '../../js/utils'
import Controller from '../../js/controller'
import WikiSection from '../Wiki/WikiSection';
import ConvolutionWiki from '../Wiki/ConvolutionWiki.vue';

// const VERTICAL=0, HORIZONTAL=1; //commented to avoid lint issues
const FULL=2;

export default {
    name: 'FilterSettings',
    components: {
        WikiSection,
        ConvolutionWiki
    },
    data() {
        return {
            filter: {},
            min: -1,
            max: 1,
            ver_sym: false,
            hor_sym: false,
            full_sym: false,
            wiki_open: false,
            range_tooltip: 'Min/max that filter values can be set to when randomizing',
            ver_tooltip: 'Right column filter values mirror left column ones, resulting in a vertically symmetrical update rule',
            hor_tooltip: 'Bottom row filter values mirror top row ones, resulting in a horizontally symmetrical update rule',
            fullsym_tooltip: 'Enforces horizontal, vertical, and diagonal symmetry',
        }
    },

    mounted() {
        this.setFilter(Controller.filter);
    },

    watch: {
        min(val) {
            this.min = Math.min(val, this.max);
        },
        max(val) {
            this.max = Math.max(val, this.min);
        }
    },

    methods: {
        updateFilter(event, row, i) {
            let val = event.target.value;
            val = val ? val : 0;
            let index = parseInt(row.id)*3 + i;
            Controller.filter[index] = parseFloat(val);
            Controller.filter = this.enforceSymmetry(Controller.filter);
            this.setFilter(Controller.filter)
            Controller.apply();
        },

        randomize() {
            let filter = Utils.randomKernel(this.min, this.max, this.hor_sym, this.ver_sym);
            filter = this.enforceSymmetry(filter);
            this.setFilter(filter);
            Controller.filter = filter;
            Controller.apply();
        },

        clearSymmetry() {
            this.hor_sym = false;
            this.ver_sym = false;
            this.setSymmetry();
        },

        setSymmetry(changed) {
            let f = Controller.filter;
            let disabled = []; // indexes of disabled values

            if (this.full_sym && changed !== FULL) {
                // if vertical sym or horizontal sym are tuned off, then full symmetry is turned off
                this.full_sym = false;
            }
            else if (this.full_sym && changed === FULL) {
                // if full symmetry is turned on, then hor/vert should be turned on too
                f = Utils.fullSymmetry(f);
                this.hor_sym = true;
                this.ver_sym = true;
                disabled.push(...[3]);
            }
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
            Controller.hor_sym = this.hor_sym;
            Controller.ver_sym=this.ver_sym;
            Controller.full_sym=this.full_sym;

            this.setFilter(Controller.filter);
        },

        enforceSymmetry(f) {
            if (this.full_sym)
                f = Utils.fullSymmetry(f); // if full symmetry it will do hor/ver symmetry too
            else {
                if (this.hor_sym)
                    f = Utils.hSymmetry(f);
                if (this.ver_sym)
                    f = Utils.vSymmetry(f);
            }
            return f;
        },

        setFilter(f) {
            // c formats floats to 4 decimals without trailing zeros
            const c = (i) => { return parseFloat(f[i].toFixed(3)) }

            Vue.set(this.filter, 0, {id:0, vals:[c(0), c(1), c(2)]});
            Vue.set(this.filter, 1, {id:1, vals:[c(3), c(4), c(5)]});
            Vue.set(this.filter, 2, {id:2, vals:[c(6), c(7), c(8)]});
            return this.filter;
        },
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

table {
    margin: auto;
}

input {
    color: white;
    text-align: center;
    background-color: var(--in-bg);
    
    border: 2px var(--in-border) inset;

    padding: 3px;
    margin: 0px;
}

input:hover:enabled {
    border: 2px var(--in-border-hover) solid;
}

.filter-val {
    width: 55px;
}

.filter-val:disabled {
    color: gray;
}

/* .filter-val::-webkit-outer-spin-button,
.filter-val::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
/* .filter-val[type=number] {
  -moz-appearance: textfield;
} */

#options {
    text-align: left;
    margin-left: 10px;
}

.range {
    width: 50px;
    margin-top: 5px;
    margin-bottom: 5px;
}

#ver_sym, #hor_sym {
    margin-top: 5px;
    margin-bottom: 5px;
}

</style>
