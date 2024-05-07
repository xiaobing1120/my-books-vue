<template>
  <router-view></router-view>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>
*{
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
html{
  -webkit-text-size-adjust: 100%;
  -ms-text-size-adjust: 100%;
  -ms-overflow-style: scrollbar;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
body{
  color: rgba(0, 0, 0, .85);
  font-size: 14px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
html, body, #app {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
ul,ol,li{
  list-style: none;
}
img{
  display: block;
}
</style>




<!-- <template>
  <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js App"/>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
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
  margin-top: 60px;
}
</style>
 -->
