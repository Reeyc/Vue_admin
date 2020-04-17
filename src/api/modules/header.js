const base = require("../base");
import http from "../http";

const showLoading = true;

const API = {
  loginPwd: params => http.post(base.loginPwd, params),
  profile: userInfo => http.post(base.profile, Object.assign(userInfo, { showLoading })),
  notices: () => http.post(base.notices),
  noticeDel: data => http.post(base.noticeDel, data)
};

export default API;
