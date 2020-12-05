import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Element from "element-ui";
import 'element-ui/lib/theme-chalk/index.css';
import axios from "axios";
import qs from "qs";
import echarts from 'echarts'
import Clipboard from "clipboard";

import './assets/css/user/general.css';
import './assets/css/blog/all.css'
import './assets/css/blog/style.css'
import './assets/css/blog/demo.css'
import './assets/css/blog/normalize.css'
import './assets/css/blog/style-salal.css'
import Base64 from './assets/js/base64.js'


axios.defaults.baseURL='http://127.0.0.1:8000'
axios.defaults.headers={'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }
Vue.use(Element);
Vue.prototype.$axios = axios;
Vue.prototype.$echarts = echarts
Vue.prototype.Clipboard = Clipboard;
Vue.prototype.qs = qs;
Vue.prototype.$Base64 = Base64;

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
