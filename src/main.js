import "css/reset.css";
import "css/border.css";
import "css/sass/index.scss";

import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "ie-placeholder";

import http from "./api";
Vue.prototype.$http = http;

import axios from "axios";
Vue.prototype.$axios = axios;

import "./plugins/element.js";

import "icon/iconfont.css";

import animated from "animate.css";
Vue.use(animated);

import echarts from "echarts";
import "echarts/map/js/province/hainan.js";
Vue.prototype.$echarts = echarts;

Vue.prototype.$bus = new Vue();

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
