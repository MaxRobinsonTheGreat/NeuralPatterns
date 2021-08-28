<template>
  <div id="app">
    <Settings/>
    <Renderer/>
  </div>
</template>

<script>
import Renderer from './components/Renderer.vue'
import Settings from './components/Settings.vue'

export default {
  name: 'App',
  components: {
    Renderer,
    Settings
  }
}
</script>

<style>
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

</style>
