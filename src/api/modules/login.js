const base = require("../base");
import http from "../http";

const showLoading = true;

const API = {
  login: userInfo => http.post(base.login, Object.assign(userInfo, { showLoading })),
  loginout: () => http.post(base.loginOut, { showLoading }),
  getRoles: () => http.post(base.roles, { showLoading })
};

export default API;
