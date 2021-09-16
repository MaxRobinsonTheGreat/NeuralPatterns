<template>
    <div id="settings-panel">
        <div id='header'>
            min, load, save
            <a id="downloadEl" style="display: none;"></a>
            <button v-on:click="save()">Save</button>
            <input type="file" id="loadFile" @change="loadFile">
        </div>
        <div id='accordion'>
            <AccordionItem title='State'>
                <StateSettings ref='stateSettings'></StateSettings>
            </AccordionItem>
            <AccordionItem title='Filter' :start_open=true>
                <FilterSettings ref='filterSettings'></FilterSettings>
            </AccordionItem>
            <AccordionItem title='Activation'>
                <ActivationSettings ref='activationSettings'></ActivationSettings>    
            </AccordionItem>
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
import ActivationSettings from './AccordionSettings/ActivationSettings'


export default {
    name: 'Settings',
    components: {
        AccordionItem,
        StateSettings,
        FilterSettings,
        DisplaySettings,
        ActivationSettings
    },
    data() {
        return {
            filter: Utils.randomKernel(),
            pauseText: 'Pause',
        }
    },
    mounted() {
        document.body.onkeyup = (e) => {
        let focused = document.activeElement.tagName;
        if (focused !== "INPUT" && focused !== "TEXTAREA") {
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
        },
        save() {
            let config = {};
            console.log(Controller.filter)
            config["reset_type"] = Controller.reset_type;
            config["filter"] = Controller.filter;
            config["activation"] = Controller.activationSource;
            config["color"] = Controller.color;
            config["persistent"] = Controller.renderer.persistent;

            let data = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(config));
            let downloadEl = document.getElementById('downloadEl');
            downloadEl.setAttribute("href", data);
            downloadEl.setAttribute("download", "config.json");
            downloadEl.click();
        },

        loadFile(e) {
            let files = e.srcElement.files;
            if (!files.length) return;
            let reader = new FileReader();
            reader.onload = this.loadConfig;
            reader.readAsText(files[0]);
        },

        loadConfig(e) {
            let config = JSON.parse(e.target.result);
            config.filter = this.toFloat32(config.filter);
            console.log(config.persistent)

            this.$refs.stateSettings.persistent = config.persistent;
            this.$refs.stateSettings.active_button = config.active_button;
            this.$refs.filterSettings.setFilter(config.filter);
            this.$refs.activationSettings.code = config.activation;
            this.$refs.displaySettings.setColor(config.color);

            Controller.load(config);
        },

        toFloat32(obj) {
            let arr = [];
            for (let i in obj) {
                arr[i] = obj[i];
            }
            return Float32Array.from(arr);
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
