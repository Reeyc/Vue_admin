const base = require("../base");
import http from "../http";

const API = {
  log: params => http.post(base.log, params)
};

export default API;
