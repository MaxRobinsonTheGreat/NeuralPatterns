<template>
    <div id="settings-panel">
        <div id='header'>
            min, load, save
        </div>
        <div id='accordion'>
            <AccordionItem title='State'>
                <StateSettings ref='stateSettings'></StateSettings>
            </AccordionItem>
            <AccordionItem title='Filter' :start_open=true>
                <FilterSettings ref='filterSettings'></FilterSettings>
            </AccordionItem>
            <AccordionItem title='Activation'> empty </AccordionItem>
            <AccordionItem title='Display'> 
                <DisplaySettings ref='displaySettings'></DisplaySettings>
            </AccordionItem>
        </div>
        <div id='footer'>
            <button v-on:click="pauseToggle()">{{pauseText}}</button>
            <button v-on:click="randomize()">Randomize</button>
            <button v-on:click="reset()">Reset</button>
        </div>
    </div>
</template>

<script>
import Utils from '../js/utils'
import Controller from '../js/controller'

import AccordionItem from './AccordionSettings/AccordionItem'
import StateSettings from './AccordionSettings/StateSettings'
import FilterSettings from './AccordionSettings/FilterSettings'
import DisplaySettings from './AccordionSettings/DisplaySettings'


export default {
    name: 'Settings',
    data() {
        return {
            filter: Utils.randomKernel(),
            pauseText: 'Pause',
        }
    },
    mounted() {
        document.body.onkeyup = (e) => {
            if (document.activeElement.tagName !== "INPUT") {
                // console.log(e.key)
                switch (e.key.toLowerCase()) {
                    case(' '): {
                        this.pauseToggle();
                        break;
                    }
                    case('f'): {
                        this.randomize();
                        break;
                    }
                    case('d'): {
                        this.$refs.stateSettings.reset();
                        break;
                    }
                }
            }
        }
    },
    components: {
        AccordionItem,
        StateSettings,
        FilterSettings,
        DisplaySettings,
    },
    methods: {
        pauseToggle() {
            Controller.pauseToggle();
            this.pauseText = Controller.paused ? 'Play' : 'Pause'
        },
        randomize() {
            this.$refs.filterSettings.randomize();
            this.$refs.displaySettings.randomize();
        },
        reset() {
            this.$refs.stateSettings.reset();
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#settings-panel {
    position: fixed;
    width: 300px;
    height: auto;
    margin: 10px;

    color: white;
    background-color: #421f59;
    border: 1px solid #e7c4ff;
}


</style>
