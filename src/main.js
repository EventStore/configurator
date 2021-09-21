import Vue from "vue";
import App from "./App.vue";
import Vuex from "vuex";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "./styles/element-variables.scss"
import VuePrism from "vue-prism";
import "prismjs/components/prism-rust";
import "prismjs/components/prism-csharp";
import "prismjs/components/prism-java";
import "prismjs/components/prism-yaml";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-hcl";
import "prismjs/components/prism-powershell";
import "prismjs/components/prism-typescript";
import "prismjs/themes/prism.css";
import Prism from "vue-prism-component";
import store from "./store";

Vue.config.productionTip = false;

Vue.use(Vuex);
Vue.use(ElementUI);
Vue.use(VuePrism);
Vue.component("prism", Prism);

new Vue({
  store,
  render: h => h(App)
}).$mount('#app');
