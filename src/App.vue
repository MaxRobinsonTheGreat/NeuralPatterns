<template>
  <div id="app">
    <Settings @save="save_open=true" @load="load_open=true"/>
    <Renderer/>
    <OptionsBox  v-if="save_open" title="Save Settings" @close="save_open=false">

	</OptionsBox>
    <OptionsBox  v-if="load_open" title="Load Settings File" @close="load_open=false">
		
	</OptionsBox>

  </div>
</template>

<script>
import OptionsBox from './components/Options/OptionsBox.vue'
import Renderer from './components/Renderer.vue'
import Settings from './components/Settings.vue'

export default {
	name: 'App',
	components: {
		Renderer,
		Settings,
		OptionsBox
	},
	data() {
		return {
			save_open: true,
			load_open: false
		}
	},
}
</script>

<style>

@import './assets/css-vars.css';
@import 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css';
@import './assets/glsl-theme.css';

#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin: 0px;
	padding: 0px;
}

html, body{
	height: 100%;
	width: 100%;
	border: none;
	margin: 0px;
	padding: 0px;
	background-color: black;
}

body{
	overflow: hidden;
}

button {
	font-size: 14px;
	padding: 4px;
	background-color: var(--btn-bg);
	color: var(--panel-border);
	border: 2px rgb(100, 64, 134) outset;
}

button:hover {
	background-color: var(--btn-hover);
}

button:active {
	background-color: var(--btn-active);
	border-style: inset;
}

label {
	font-size: 15px;
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

i {
	width: 100%;
}

a {
	color: rgb(80, 80, 255);
}
a:visited {
	color: rgb(216, 116, 255);
}

</style>

