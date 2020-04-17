const base = require("../base");
import http from "../http";

const showLoading = true;

const API = {
  adminList: params => http.post(base.adminList, params),
  adminAdd: params => http.post(base.adminAdd, params),
  adminEdit: params => http.post(base.adminEdit, params),
  adminDel: params => http.post(base.adminDel, params),
  adminPwd: params => http.post(base.adminPwd, Object.assign(params, { showLoading })),
  adminGrant: params => http.post(base.adminGrant, params),

  allGrant: () => http.post(base.allGrant),
  groupList: params => http.post(base.groupList, params),
  groupAdd: params => http.post(base.groupAdd, params),
  groupEdit: params => http.post(base.groupEdit, params),
  groupDel: params => http.post(base.groupDel, params)
};

export default API;
