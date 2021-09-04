<template>
    <div class="accordion-item">
        <div  class='noselect' id='title-box' v-on:click="select">
            <b>{{this.title}}</b>
            <b class='noselect' id='min-button'>{{this.icon}}</b>
        </div>
        <div v-show="is_open">
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
            icon: this.start_open ? '-' : '+',
        }
    },
    props: {
        title: String,
        start_open: Boolean,
    },
    methods: {
        select() {
            this.is_open = !this.is_open;
            this.icon = this.is_open ? '-' : '+';
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.accordion-item {
    border: 1px solid white;
    margin: 5px;

}

#min-button {
    float: right;
}

#title-box {
    background-color: #3d0069;
    text-align: left;
    padding: 5px;
    /* margin: 5px; */
    border: 1px solid bottom green;
}

#title-box:hover {
    cursor: pointer;
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