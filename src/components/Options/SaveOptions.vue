<template>
    <div>
        <button v-on:click="save">Save and Download</button>
        <a id="download-el" style="display: none;"></a>
    </div>
</template>

<script>

import Controller from '../../js/controller'

export default {
    name: 'SaveOptions',

    methods: {
        save() {
            let config = {};
            console.log(Controller.filter)
            config["reset_type"] = Controller.reset_type;
            config["filter"] = Controller.filter;
            config["activation"] = Controller.activationSource;
            config["color"] = Controller.color;
            config["persistent"] = Controller.renderer.persistent;

            let data = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(config));
            let downloadEl = document.getElementById('download-el');
            downloadEl.setAttribute("href", data);
            downloadEl.setAttribute("download", "config.json");
            downloadEl.click();
            this.$emit('close');
        },
    }
}
</script>

<style scoped>
div{
    font-size: 14px;
}
</style>
