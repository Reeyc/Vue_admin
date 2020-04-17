const base = require("../base");
import http from "../http";

const API = {
  deviceList: params => http.post(base.deviceList, params),
  deviceType: () => http.post(base.deviceType),
  deviceAdd: params => http.post(base.deviceAdd, params),
  deviceEdit: params => http.post(base.deviceEdit, params)
};

export default API;
