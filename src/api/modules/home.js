const base = require("../base");
import http from "../http";

const API = {
  getUserOnline: () => http.post(base.userOnline),
  getSceneOnline: () => http.post(base.sceneOnline),
  getSceneTotal: () => http.post(base.sceneTotal),
  getOneScene: () => http.post(base.oneScene),
  getTwoScene: () => http.post(base.twoScene),
  getLoginType: () => http.post(base.loginType),
  getMapDevice: () => http.post(base.mapDevice),
  welcomeData: () => http.post(base.welcomeData)
};

export default API;
