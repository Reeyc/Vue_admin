const base = require("../base");
import http from "../http";

const API = {
  sms: params => http.post(base.sms, params)
};

export default API;
