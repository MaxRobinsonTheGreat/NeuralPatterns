<template>
    <div>
        Save as: <input v-model='filename' id='filename-in'>.json
        Randomize color on load: <input type='checkbox' v-model='randomcolor'>
        <br><br>
        <button v-on:click="save">Save and Download</button>
        <a id="download-el" style="display: none;"></a>
    </div>
</template>

<script>

import Controller from '../../js/controller'

export default {
    name: 'SaveOptions',
    data() {
        return {
            filename: "settings",
            randomcolor: false
        }
    },
    methods: {
        save() {
            let config = {};
            
            config["reset_type"] = Controller.reset_type;
            
            config["filter"] = Controller.filter;
            config["hor_sym"] = Controller.hor_sym;
            config["ver_sym"] = Controller.ver_sym;
            config["full_sym"] = Controller.full_sym;

            config["activation"] = Controller.activationSource;
            
            config["color"] = this.randomcolor ? "random": Controller.color;
            config["bg_color"] = Controller.bgColor;
            config["persistent"] = Controller.renderer.persistent;
            config["skip_frames"] = Controller.renderer.skip_frames;

            let data = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(config));
            let downloadEl = document.getElementById('download-el');
            downloadEl.setAttribute("href", data);
            downloadEl.setAttribute("download", this.filename+".json");
            downloadEl.click();
            this.$emit('close');
        },
    }
}
</script>

<style scoped>
div{
    padding: 10px;
    text-align: left;
    color: white;
    font-size: 14px;
}
#filename-in {
    margin-left: 10px;
    margin-bottom: 10px;
    width: 100px;
    color: white;
    text-align: center;
    background-color: var(--in-bg);    
    border: 2px var(--in-border) inset;
}
#filename-in:hover {
    border: 2px var(--in-border-hover) solid;
}
</style>
