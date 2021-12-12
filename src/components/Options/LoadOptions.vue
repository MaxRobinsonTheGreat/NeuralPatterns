<template>
    <div>
        Load Settings: 
        <select v-model="selected" @change="select()">
            <option v-for="(option, i) in options "
                v-bind:value="option" 
                :key="i" >
                {{option.name}}
            </option>
        </select>
        <div>
            <input id="uploadFile" type="file" @change="uploadFile" v-show="uploadingCustom">
        </div>
        <button id="load-btn" @click="load" v-if="can_load">Load</button>
        <label for='reset_on_load' :title="reset_on_load">Reset on load: </label>
        <input id='reset_on_load' type='checkbox' v-model="reset_on_load">
    </div>
</template>

<script>

import IsMobile from '../../js/ismobile'

export default {
    name: 'SaveOptions',
    data() {
        let filelist = require('../../assets/settings/_file_list.json');
        let options = JSON.parse(JSON.stringify(filelist)); // deep copy, will modify
        if (!IsMobile)
            options.unshift(
            {
                "name": "Upload custom...", 
                "isCustom": true
            });
        return {
            selected: undefined,
            config: undefined,
            uploadingCustom: false,
            options,
            can_load: false,
            reset_on_load: true,
        };
    },

    methods: {
        select() {
            this.uploadingCustom = this.selected.isCustom;
            if (!this.uploadingCustom) {
                let config = require('../../assets/settings/'+this.selected.path);
                this.config = JSON.parse(JSON.stringify(config))
                this.config.filter = this.toFloat32(this.config.filter);
                this.can_load = true;
            }
            else {
                document.getElementById('uploadFile').click();
            }
        },
        uploadFile(e) {
            let files = e.srcElement.files;
            if (!files.length) return;
            let reader = new FileReader();
            reader.onload = this.loadConfigFromFile;
            reader.readAsText(files[0]);
        },

        loadConfigFromFile(e) {
            this.can_load = true;
            this.config = JSON.parse(e.target.result);
            this.config.filter = this.toFloat32(this.config.filter);
        },

        toFloat32(arr) {
            let farr = [];
            for (let i in arr) {
                farr[i] = arr[i];
            }
            return Float32Array.from(farr);
        },

        load() {
            this.$emit('loadConfig', this.config, this.reset_on_load);
            this.$emit('close');
        }
    }
}
</script>

<style scoped>
div{
    font-size: 14px;
    color: white;
    text-align: left;
    padding: 10px;
    height: 100%;
}
#load-btn {
    position: absolute;
    right: 10px;
    bottom: 10px;
}
</style>
