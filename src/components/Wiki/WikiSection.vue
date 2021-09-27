<template>
    <div id='container'>
        <div id='icon'>
            <i class="fa fa-question-circle" v-on:click="is_open=!is_open"></i>
            <i class="fa fa-sort-down" v-if=!is_open v-on:click="is_open=true"></i>
            <i class="fa fa-sort-up" v-if=is_open v-on:click="is_open=false"></i>
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
    }
}
</script>

<style scoped>
div {
    text-align: left;
    margin: 5px;
}
#content {
    border: black 1px solid;
}
#icon {
    display: inline-block;
    white-space: nowrap;
}
</style>
