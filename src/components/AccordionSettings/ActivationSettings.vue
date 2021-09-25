<template>
    <div>
        <codemirror v-model='code' ref='editor' :options="{
            viewportMargin: Infinity,
            indentWithTabs: true,
            theme: 'glsl',
            mode: 'glsl',
        }"></codemirror>
    </div>
</template>

<script>
import Controller from '../../js/controller';
import { codemirror } from 'vue-codemirror-lite';
var CodeMirror = require('codemirror/lib/codemirror.js');
require('./glslmode')(CodeMirror);

// have to require it for commenting to work. idk why
let toggleComment = require('codemirror/addon/comment/comment.js');
toggleComment
function toggleGLSLComment(cm) {
    cm.toggleComment({
        indent: true,
        lineComment: '//'
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
        this.$refs.editor.editor.refresh();

    },
    data() {
        return {
            code: Controller.activationSource
        }
    },

    watch: {
        code() {
            if (this.pendingSetCode) {
                clearTimeout(this.pendingSetCode);
            }

            this.pendingSetCode = setTimeout(() => {
                Controller.activationSource = this.code;
                Controller.apply(true);
            }, 500);
        }
    }
}

</script>
