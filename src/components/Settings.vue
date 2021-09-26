<template>
    <div>
        <div id="settings-panel" v-show="panel_open">
            <div id='header'>
                <!-- <a id="downloadEl" style="display: none;"></a> -->
                <button id="min-btn" v-on:click="setOpen(false)"><i class="fa fa-minus"></i></button>
                <button id="save-btn" v-on:click="save()">Save</button>
                <button id="load-btn" v-on:click="loadFile">Load</button>
                <!-- <input id="loadFile" type="file" @change="loadFile"> -->
            </div>
            <div id='accordion'>
                <AccordionItem title='Reset Options'>
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
                <button id='pause-btn' v-on:click="pauseToggle()">
                    <i class="fa fa-pause" v-if=is_playing></i>
                    <i class="fa fa-play" v-else></i>
                </button>
                <button id='randomize-btn' v-on:click="randomize()">Randomize</button>
                <button id='reset-btn' v-on:click="reset()">Reset State</button>
            </div>
        </div>
        <button id='settings-btn' v-on:click="setOpen(true)" v-show="!panel_open">
            <i class="fa fa-gear"></i>
        </button>

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
            is_playing: true,
            panel_open: true,
        }
    },
    mounted() {
        document.body.onkeyup = (e) => {
        let focused = document.activeElement.tagName;
        if (focused !== "INPUT" && focused !== "TEXTAREA") {
                switch (e.key.toLowerCase()) {
                    case(' '): {
                        this.pauseToggle();
                        if (focused ==="BUTTON") 
                            e.preventDefault();
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
            this.is_playing = !Controller.paused;
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
        setOpen(open) {
            this.panel_open=open;
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

        toFloat32(arr) {
            let farr = [];
            for (let i in arr) {
                farr[i] = arr[i];
            }
            return Float32Array.from(farr);
        }

    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

#settings-panel {
    position: fixed;
    z-index: 1;
    /* display: inline-block; */
    /* min-width: 300px; */
    width: 100%;
    max-width: 300px;
    /* height: auto; */
    margin: 10px;

    color: white;
    background-color: var(--panel-bg);
    /* max-height: 95vh; */
    /* border: 1px solid #e7c4ff; */

    border: 2px white solid;

    /* border-style: outset; */
}

#header {
    display: block;
    height: 40px;
    border-bottom: 1px solid rgb(126, 126, 126);
    /* position:relative; */
    /* width: 100%; */
}

#min-btn, #pause-btn {
    float: left;
    border-style: solid;
}

#save-btn, #load-btn {
    float: right;
}

#loadFile {
    /* float: right; */
}

#accordion {
    /* overflow: auto; */ 
    /* position: relative; */
    max-height: 85vh;
    /* height: 100px; */
    margin-left: 5px;
    margin-right: 5px;
    overflow-y: auto;
}

#footer {
    border-top: 1px solid rgb(126, 126, 126);
}

#randomize-btn, #reset-btn, #save-btn, #load-btn {
    float: right;
}

#min-btn, #pause-btn {
    width: 40px;
}

#min-btn, #pause-btn, #settings-btn, #randomize-btn, #reset-btn {
    height: 40px;
    font-size: 15px;
}

#settings-btn {
    position: fixed;
    z-index: 1;
    left: 0;
    width: 40px;
    margin: 10px;
}

</style>

