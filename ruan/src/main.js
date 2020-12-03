import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import ElementUI from "element-ui";
import axios from "axios";
import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/all.css'
import './assets/css/style.css'
import './assets/css/style1.css'
import './assets/css/tailwind.min.css'
import './assets/css/button_tabnav.css'
import Clipboard from 'clipboard';
import qs from 'qs';

axios.defaults.baseURL='http://127.0.0.1:8000'
axios.defaults.headers={'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }

Vue.use(ElementUI);
Vue.prototype.Clipboard = Clipboard;
Vue.prototype.$axios = axios;
Vue.prototype.qs = qs;

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
