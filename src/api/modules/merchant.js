const base = require("../base");
import http from "../http";

const showLoading = true;

const API = {
  merchantList: data => http.post(base.merchantList, data),
  merchantAdd: data => http.post(base.merchantAdd, Object.assign(data, { showLoading })),
  merchanAudit: data => http.post(base.merchanAudit, Object.assign(data, { showLoading })),
  merchantPwd: data => http.post(base.merchantPwd, data),
  merchantScene: data => http.post(base.merchantScene, Object.assign(data, { showLoading })),
  merchantVIP: data => http.post(base.merchantVIP, data),
  merchantLock: data => http.post(base.merchantLock, data),
  provinceCity: data => http.post(base.provinceCity, data),
  provinceList: () => http.post(base.provinceList),
  rechargeList: data => http.post(base.rechargeList, data),
  rechargeAudit: data => http.post(base.rechargeAudit, Object.assign(data, { showLoading })),
  rechargeAdd: data => http.post(base.rechargeAdd, Object.assign(data, { showLoading })),
  mealList: () => http.post(base.mealList),
  mealAdd: data => http.post(base.mealAdd, Object.assign(data, { showLoading })),
  mealEdit: data => http.post(base.mealEdit, Object.assign(data, { showLoading })),
  mealDel: data => http.post(base.mealDel, data)
};

export default API;
