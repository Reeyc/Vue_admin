/**
 * axios封装
 */

import Vue from "vue";
import router, { resetRouter } from "@/router";
import store from "@/store";
import axios from "axios";
import Qs from "qs";
import { Message, Loading } from "element-ui";

let loading = null;
let loadingRequestCount = 0;

const showLoading = () => {
  if (loadingRequestCount >= 0) {
    loading = Loading.service({ text: "拼命加载中", customClass: "full-loading" });
  }
  loadingRequestCount++;
};

const hideLoading = () => {
  if (loadingRequestCount > 0) {
    loadingRequestCount--;
  }
  if (loadingRequestCount <= 0) {
    Vue.nextTick(() => loading.close());
  }
};

const tokenError = tips => {
  store.commit("CLEAR_HTTP");
  store.commit("DEL_TOKEN");
  store.commit("DEL_USER_INFO");
  store.commit("SET_ROLES", []);
  resetRouter();
  Message.error(tips);
  router.push("/login");
};

const http = axios.create({ timeout: 10000 });
const SUCCESS_CODE = 20000;

http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded;charset=utf-8";

http.defaults.transformRequest = [
  function(data) {
    if (data) {
      if (data.showLoading) {
        showLoading();
        delete data.showLoading;
      }
    }
    return Qs.stringify(data);
  }
];

http.interceptors.request.use(
  config => {
    const token = store.state.token;
    if (token) {
      config.headers.Authorization = "Bearer " + token;
    }
    config.cancelToken = new axios.CancelToken(cancel => {
      store.commit("PUSH_HTTP", { cancelToken: cancel });
    });
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  response => {
    loading && hideLoading();
    const data = response.data;
    if (data.code !== SUCCESS_CODE) {
      Message.error(data.msg || "网络繁忙，请稍后再试");
      return Promise.reject(data);
    } else {
      return Promise.resolve(data);
    }
  },
  error => {
    if (loading && !error.message.fromRouter) {
      hideLoading();
    }
    const errorRes = error.response;
    const resData = errorRes.data;
    if (errorRes) {
      /** 具体看约定的接口状态码来判断 **/
      switch (errorRes.status) {
        case 401:
          if (resData.code === 50014) {
            tokenError("登录已过期，请重新登录");
          } else if (resData.code === 50008) {
            tokenError("出错了，请重新登录");
          }
          break;
        case 404:
          tokenError("请求不存在");
          break;
        default:
          Message.error(resData.message || "error");
      }
    } else {
      Message.closeAll();
      if (error.message.includes("timeout")) {
        Message({
          duration: 0,
          showClose: true,
          message: "请求超时！请检查网络是否正常",
          type: "error"
        });
        Message.error();
      } else {
        Message({
          duration: 0,
          showClose: true,
          message: "请求失败，请检查网络是否已连接",
          type: "error"
        });
      }
    }
    return Promise.reject(error);
  }
);

export default http;
