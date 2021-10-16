<template>
    <div id='container'>
        <div id='icon'>
            <b>{{title}} </b>
            <i class="fa fa-question-circle" v-on:click="is_open=!is_open"></i>
        </div>
        <slot id="content" v-if=is_open></slot>
    </div>

</template>

<script>

export default {
    name: 'WikiSection',
    data() {
        return {
            is_open: false
        }
    },
    props: {
        title: String
    }
}
</script>

<style scoped>
div {
    text-align: left;
    margin: 5px;
}
#icon {
    /* display: inline-block; */
    display: block;
    white-space: nowrap;
    width: 50px;
}
#icon:hover {
    /* display: inline-block; */
    color: rgb(255, 208, 0);
}
</style>
