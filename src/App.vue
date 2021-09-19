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

button {
    font-size: 14px;
    padding: 4px;
    background-color: #3c0058;
    color: white;
    /* margin: 2px; */
    border: 2px rgb(100, 64, 134) outset;
}

button:hover {
    background-color: #53445a;
    /* border: 2px rgb(56, 53, 33) outset; */

    /* border: 2px rgb(255, 250, 181) solid; */
}

button:active {
    background-color: #3c0058;
    border-style: inset;

}

@import 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css';
</style>

