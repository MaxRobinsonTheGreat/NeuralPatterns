<template>
    <div class="accordion-item">
        <div class='noselect' id='title-box' v-on:click="select">
            <b>{{this.title}}</b>
            <b class='noselect' id='min-button'>
                <i class="fa fa-minus" v-if=is_open></i>
                <i class="fa fa-plus" v-else></i>
            </b>
        </div>
        <div id="content" v-show="is_open">
            <slot></slot>
        </div>
    </div>
</template>

<script>

export default {
    name: 'AccordionItem',
    data() {
        return {
            is_open: this.start_open,
        }
    },
    props: {
        title: String,
        start_open: Boolean,
    },
    methods: {
        select() {
            this.is_open = !this.is_open;
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.accordion-item {
    border: 1px solid white;
    margin: 5px;
    position: relative
}

#min-button {
    float: right;
}

#title-box {
    background-color: #3c0058;
    text-align: left;
    padding: 5px;
    margin: 0px;
}

#title-box:hover {
    cursor: pointer;
    background-color: #5b4764;
}

#title-box:active {
    background-color: #3c0058;
}

#content {
    border-top: 1px solid rgb(126, 126, 126);
}

.noselect {
  -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Old versions of Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
}

</style>