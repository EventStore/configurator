<template>
  <div id="app">
    <Deployment></Deployment>
  </div>
</template>

<script>
import Deployment from "./modules/esdbConfig/components/Deployment";

export default {
    components: {Deployment},
    created() {
        document.title = "EventStore Configurator"
    }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  position: absolute;
  width: 780px;
  left: 50%;
  margin-left: -390px;
  box-sizing: border-box;
}

code[class*="language-"],
pre[class*="language-"] {
  font-size: 0.8rem !important;
}
</style>
