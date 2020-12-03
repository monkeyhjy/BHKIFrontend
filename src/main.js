import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Element from "element-ui";
import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/animate.min.css';
import './assets/css/style.css';
import './assets/css/forSearch/iconfont.css';
import './assets/css/forSearch/demo.css';
import axios from "axios";
import qs from "qs";
axios.defaults.baseURL='http://127.0.0.1:8000'
axios.defaults.headers={'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }
Vue.use(Element);
Vue.prototype.$axios = axios;
Vue.prototype.qs = qs;

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
