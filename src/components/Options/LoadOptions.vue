<template>
    <div>
        <input id="loadFile" type="file" @change="loadFile">
    </div>
</template>

<script>

export default {
    name: 'SaveOptions',

    methods: {
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
            this.$emit('loadConfig', config);
            this.$emit('close');
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

<style scoped>
div{
    font-size: 14px;
}
</style>
