import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './assets/css/golbal.css'
import '@/assets/fonts/iconfont.css'
import Axios from "axios";

Axios.defaults.baseURL='http://127.0.0.1:8888/api/private/v1/'
Vue.prototype.$axios=Axios
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
