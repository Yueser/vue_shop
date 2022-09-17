<template>
  <div id="app">
    <img src="./assets/logo.png" alt="logo">
    <div>
      <p>
        If Element is successfully added to this project, you'll see an
        <code v-text="'<el-button>'"></code>
        below
      </p>
      <el-button @click="openNewView">el-button</el-button>
    </div>
    <router-view/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'app',
  components: {
    HelloWorld
  },
  methods:{
    openNewView(){
      let url = window.location.hash;
      window.location.href=url==='#/'?'#/about':'#/';
    }
  }
}
</script>

<style>
html{
  overflow-y: auto;
  overflow-x: hidden;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  margin-right: calc(100% - 100vw);
}
</style>
