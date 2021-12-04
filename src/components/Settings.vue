<template>
    <div>
        <div id="settings-panel" v-show="panel_open&&!hide_settings">
            <div id='header'>
                <button id="min-btn" v-on:click="setOpen(false)"><i class="fa fa-minus"></i></button>
                <button id="save-btn" v-on:click="$emit('save');setPaused(true);" v-if="!IsMobile">Save</button>
                <button id="load-btn" v-on:click="$emit('load');setPaused(true);">Load</button>
            </div>
            <div id='accordion'>
                <AccordionItem title='About'>
                    <About/>
                </AccordionItem>
                <AccordionItem title='Restart Options'>
                    <StateSettings ref='stateSettings'/>
                </AccordionItem>
                <AccordionItem title='Filter' :start_open=true>
                    <FilterSettings ref='filterSettings'/>
                </AccordionItem>
                <AccordionItem title='Activation' :start_open=true>
                    <ActivationSettings ref='activationSettings'/>
                </AccordionItem>
                <AccordionItem title='Display'> 
                    <DisplaySettings ref='displaySettings'/>
                </AccordionItem>
            </div>
            <div id='footer'>
                <button id='pause-btn' v-on:click="pauseToggle()" title='Pause/Play. Hotkey: Spacebar'>
                    <i class="fa fa-pause" v-if=is_playing></i>
                    <i class="fa fa-play" v-else></i>
                </button>
                <button id='step-btn' v-on:click="step()" v-if=!is_playing title='Step the simulation once. Hotkey: A'>
                    <i class="fa fa-step-forward"></i>
                </button>
                <button id='randomize-btn' v-on:click="randomize()" title='Randomize filter and color. Hotkey: F'>Randomize</button>
                <button id='reset-btn' v-on:click="reset()" title='Reset all pixel values as defined in Restart Options. Hotkey: D'>Restart</button>
            </div>
        </div>
        <div id="hotbar" v-show="!panel_open&&!hide_settings">
            <button id='settings-btn' v-on:click="setOpen(true)">
                <i class="fa fa-gear"></i>
            </button>
            <button id='pause-btn-hot' v-on:click="pauseToggle()" title='Pause/Play. Hotkey: Spacebar'>
                <i class="fa fa-pause" v-if=is_playing></i>
                <i class="fa fa-play" v-else></i>
            </button>
            <button id='randomize-btn-hot' v-on:click="randomize()" title='Randomize filter and color. Hotkey: F'>Randomize</button>
        </div>

    </div>
</template>

<script>
import Utils from '../js/utils'
import Controller from '../js/controller'
import IsMobile from '../js/ismobile'

import AccordionItem from './AccordionSettings/AccordionItem'
import About from './AccordionSettings/About'
import StateSettings from './AccordionSettings/StateSettings'
import FilterSettings from './AccordionSettings/FilterSettings'
import DisplaySettings from './AccordionSettings/DisplaySettings'
import ActivationSettings from './AccordionSettings/ActivationSettings'


export default {
    name: 'Settings',
    components: {
        AccordionItem,
        About,
        StateSettings,
        FilterSettings,
        DisplaySettings,
        ActivationSettings,
    },
    data() {
        return {
            filter: Utils.randomKernel(),
            is_playing: true,
            panel_open: !IsMobile,
            IsMobile: IsMobile,
            hide_settings: false,
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
                    case('s'): {
                        this.$refs.stateSettings.reset('empty');
                        break;
                    }
                    case('a'): {
                        if (!this.is_playing)
                            this.step();
                        break;
                    }
                    case('v'): {
                        this.hide_settings = !this.hide_settings;
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
        setPaused(paused) {
            Controller.setPaused(paused);
            this.is_playing = !Controller.paused;
        },
        step() {
            Controller.step();
        },
        randomize() {
            this.$refs.filterSettings.randomize();
            if (this.$refs.displaySettings.always_randomize)
                this.$refs.displaySettings.randomize();
            if (this.$refs.stateSettings.reset_on_random)
                this.reset();
        },
        reset() {
            this.$refs.stateSettings.reset();
        },
        loadConfig(config, reset) {
            this.$refs.stateSettings.persistent = config.persistent;
            this.$refs.stateSettings.active_button = config.active_button;
            this.$refs.filterSettings.clearSymmetry();
            this.$refs.filterSettings.setFilter(config.filter);
            this.$refs.activationSettings.code = config.activation;
            if (config.color === "random")
                this.$refs.displaySettings.randomize();
            else
                this.$refs.displaySettings.setColor(config.color);
            this.$refs.displaySettings.persistent = config.persistent;
            Controller.load(config, reset);
        },
        setOpen(open) {
            this.panel_open=open;
        },
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
    max-width: 350px;
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

#min-btn, #pause-btn, #step-btn {
    float: left;
    border-style: solid;
    width: 40px;
}

#save-btn, #load-btn {
    float: right;
}

#accordion {
    max-height: 85vh;
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

#min-btn, #pause-btn, #step-btn, #settings-btn, #randomize-btn, #reset-btn, #save-btn, #load-btn  {
    height: 40px;
    font-size: 15px;
}

#hotbar {
    position: fixed;
    z-index: 1;
    left: 10px;
    top: 10px;
}
#settings-btn, #pause-btn-hot, #randomize-btn-hot {
    height: 40px;
    min-width: 40px;
    margin-top: 0px;
}

</style>

