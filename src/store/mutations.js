import * as Type from "./mutation-types";

const mutations = {
  [Type.PUSH_HTTP](state, src) {
    state.cancelHttpArr.push(src.cancelToken);
  },
  [Type.CLEAR_HTTP]({ cancelHttpArr }) {
    cancelHttpArr.forEach(item => item({ fromRouter: true }));
    cancelHttpArr = [];
  },
  [Type.SET_OPENED](state, payload) {
    state.slideBar = String(payload);
    sessionStorage.setItem("slideBar", payload);
  },
  [Type.SET_MSGISOPEN](state, newVal) {
    state.msgIsShow = newVal;
  },
  [Type.SET_TOKEN](state, token) {
    state.token = token;
    localStorage.setItem("token", token);
  },
  [Type.DEL_TOKEN](state) {
    state.token = "";
    localStorage.removeItem("token");
  },
  [Type.SET_USER_INFO](state, info) {
    state.userInfo = info;
    localStorage.setItem("userinfo", JSON.stringify(info));
  },
  [Type.DEL_USER_INFO](state) {
    state.userInfo = {};
    localStorage.removeItem("userinfo");
  },
  [Type.SET_ROLES](state, roles) {
    state.roles = roles;
  },
  [Type.SET_SCENE_LIST](state, list) {
    state.sceneList = list;
  },
  [Type.SET_PROVINCE_LIST](state, list) {
    state.provinceList = list;
  },
  [Type.SET_CITY_LIST](state, list) {
    state.cityList = list;
  }
};

export default mutations;
