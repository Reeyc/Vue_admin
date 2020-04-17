const base = require("../base");
import http from "../http";

const showLoading = true;

const API = {
  uploadImg: params => http.post(base.uploadImg, params),
  listAd: params => http.post(base.listAd, params),
  checkListAd: params => http.post(base.checkListAd, params),
  checkSubmit: params => http.post(base.checkSubmit, params),
  sceneDetail: params => http.post(base.sceneDetail, params),
  addAd: params => http.post(base.addAd, Object.assign(params, { showLoading })),
  editAd: params => http.post(base.editAd, Object.assign(params, { showLoading })),
  xiakanAd: params => http.post(base.xiakanAd, params),
  adStatement: params => http.post(base.adStatement, params),
  adDel: params => http.post(base.adDel, params),
  adDetail: params => http.post(base.adDetail, params)
};

export default API;
