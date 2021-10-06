<template>
    <div id='box' v-if="open">
        <i class="fa fa-times" v-on:click="close"></i>
        {{message}}
    </div>

</template>

<script>

export default {
    name: 'FooterMessage',
    props: {
        message: String,
    },
    data() {
        return {open: true}
    },
    mounted() {
        setTimeout(()=>{
            this.close();
        }, 5000)
    },
    methods: {
        close() {
            this.open = false;
        }
    }
}
</script>

<style scoped>
#box {
    position: absolute;
    z-index: 3;
    background-color: black;
    color: red;
    padding: 5px;
    text-align: center;
    width: 100%;
    bottom: 0px;
    /* white-space: nowrap; */
}
</style>
