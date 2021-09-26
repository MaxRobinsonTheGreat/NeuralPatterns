<template>
    <div>
        <codemirror v-model='code' ref='editor' :options="{
            viewportMargin: Infinity,
            indentWithTabs: true,
            theme: 'glsl',
            mode: 'glsl',
        }"></codemirror>
        <div id='error'> {{this.error}} </div>
    </div>
</template>

<script>
import Controller from '../../js/controller';
import { codemirror } from 'vue-codemirror-lite';
var CodeMirror = require('codemirror/lib/codemirror.js');
require('./glslmode')(CodeMirror);

// have to require it for commenting to work. idk why
let toggleComment = require('codemirror/addon/comment/comment.js');
toggleComment // using it so linting doesn't get mad
function toggleGLSLComment(cm) {
    cm.toggleComment({
        indent: true,
        lineComment: '//',
    });
}

export default {
    name: 'ActivationSettings',
    components: {
        codemirror
    },
    mounted() {
        this.$refs.editor.editor.setOption('extraKeys', {
            'Cmd-/': toggleGLSLComment,
            'Ctrl-/': toggleGLSLComment
        });
        setTimeout(()=>{
            this.$refs.editor.editor.refresh();
        }, 1000)
    },
    data() {
        return {
            code: Controller.activationSource,
            error: ''
        }
    },

    methods: {
        parseError(error) {
            if (error) {
                error = error.substring(0, error.length-1);
                if (error.includes('float') && error.includes('int')){
                    error = '(Use 1. instead of 1 for floats) '.concat(error);
                }
                this.error = error;
            }
            else {
                this.error = '';
            }
        }
    },

    watch: {
        code() {
            if (this.pendingSetCode) {
                clearTimeout(this.pendingSetCode);
            }

            this.pendingSetCode = setTimeout(() => {
                Controller.activationSource = this.code;
                let error = Controller.apply(true);
                this.parseError(error);
                this.pendingSetCode = 0;
            }, 500);
        }
    }
}

</script>

<style scoped>
#error {
    margin: 5px;
    text-align: left;
    color: rgb(255, 0, 0);
    font-size: 14px;
    font-family: Consolas, 'SourceCodePro-Medium', monaco, monospace;
}
</style>