<template>
    <div id='container'>
        <div id='mask'></div>
        <div id='box'>
            <div id='header'>
                {{this.title}}
                <button id="close-btn" v-on:click="close"><i class="fa fa-times" ></i></button>
            </div>
            <slot id='content'></slot>
        </div>
    </div>

</template>

<script>

export default {
    name: 'OptionsBox',
    props: {
        title: String,
    },
    methods: {
        close() {
            this.$emit('close');
        }
    }
}
</script>

<style scoped>
#mask {
    position: absolute;
    height: 100%;
    width: 100%;
    margin: 0px;
    padding: 0px;
    background-color: black;
    opacity: 0.5;
    z-index: 3;
}
#box {
    position: absolute;
    display: block;
    background-color: green;
    min-height: 200px;
    width: 300px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 4;

    border: 1px solid var(--panel-border);
    background-color: var(--panel-bg);
}
#header {
    font-size: 20px;
    color: white;
    height: auto;
    background-color: var(--btn-bg);
    text-align: left;
    padding: 10px;
    margin: 0px;
    border-bottom: 1px solid rgb(126, 126, 126);
}
#close-btn {
    margin: 0px;
    width: 30px;
    height: 30px;
    color: white;
    float: right;
    height: 100%;
}
</style>
