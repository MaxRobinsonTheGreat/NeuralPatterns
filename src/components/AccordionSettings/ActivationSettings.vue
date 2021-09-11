<template>
    <div>
        <!-- <codemirror v-model='code' ref='editor' id='thing' :options="{
            viewportMargin: Infinity,
            theme: 'glsl',
            mode: 'glsl',
        }"></codemirror> -->
        <textarea id='editor' class='CodeMirror' v-model='code'></textarea>
        <button v-on:click="apply()">Apply</button>
        <!-- <div class='error-container'>
            <pre v-if='model.error' class='error hl'>{{model.error}}</pre>
            <pre v-if='model.errorDetail' class='error detail'>{{model.errorDetail}}<span v-if='model.isFloatError'>
                Did you forget to add a dot symbol? E.g. <span class='hl'>10</span> should be <span class='hl'>10.</span> and <span class='hl'>42</span> should be <span class='hl'>42.</span>
            </span></pre>
        </div>  -->
    </div>
</template>

<script>
import Controller from '../../js/controller';
// import { codemirror } from 'vue-codemirror-lite';
// var CodeMirror = require('codemirror/lib/codemirror.js')
// CodeMirror
// console.log(CodeMirror)

// import Vue from 'vue'
// Vue.use(codemirror)

// let CodeMirror = require('codemirror/lib/codemirror.js')
// import glslMode from './glslmode.js';
// glslMode(CodeMirror);

// Vue.use(codemirror)
// import Utils from '../../js/utils';

export default {
    name: 'ActivationSettings',
    components: {
        // codemirror
    },
    mounted() {
        // console.log(document.getElementById('thing'))
        // CodeMirror.fromTextArea(document.getElementById('thing'), {
        //     lineNumbers: true,
        //     value: "function myScript(){return 100;}\n",
        //     mode:  "javascript"
        // });
        // glslMode(CodeMirror)
    },
    data() {
        return {
            code: Controller.activationSource
        }
    },

    methods: {
        apply() {
            Controller.activationSource = this.code;
            console.log(this.code)
            Controller.apply(true);
        }
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style src='codemirror/lib/codemirror.css'>
    /* global styles */
</style> 
