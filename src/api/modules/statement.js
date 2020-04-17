const base = require("../base");
import http from "../http";

const API = {
  sceneList: () => http.post(base.sceneList),
  totalUser: params => http.post(base.totalUser, params),
  oneSceneUser: params => http.post(base.oneSceneUser, params),
  oneSceneEcharts: () => http.post(base.oneSceneEcharts),
  twoSceneUser: params => http.post(base.twoSceneUser, params),
  twoSceneEcharts: () => http.post(base.twoSceneEcharts),
  onlineUser: params => http.post(base.onlineUser, params),
  offlineUser: params => http.post(base.offlineUser, params),
  offlineDevice: params => http.post(base.offlineDevice, params),
  oneDetail: params => http.post(base.oneDetail, params),
  twoDetail: params => http.post(base.twoDetail, params),
  loginRecord: params => http.post(base.loginRecord, params)
};

export default API;
