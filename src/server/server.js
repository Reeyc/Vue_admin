const port = "8090";

const express = require("express");
const expressStatic = require("express-static");
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require("express-session");

const expressJwt = require("express-jwt");
const vertoken = require("./token_vertify.js");

const app = express();

/** 解析post参数 **/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/** 处理跨域 **/
app.use(
  cors({
    origin: ["http://localhost:8080"],
    methods: ["GET", "POST"],
    alloweHeaders: ["Conten-Type", "Authorization"]
  })
);

/** 启动Token机制 **/
app.use(
  expressJwt({ secret: "Reeyc" }).unless({
    path: ["/login"],
    custom: req => {
      return req.headers["sec-fetch-dest"] === "image";
    }
  })
);
app.use((err, req, res, next) => {
  if (err.status === 401) {
    res.status(401);
    if (err.inner.name === "JsonWebTokenError") {
      return res.json({ code: 50008, message: "invalid token" });
    } else if (err.inner.name === "TokenExpiredError") {
      return res.json({ code: 50014, message: "expired token" });
    }
  }
  res.json(err); //for debug
  next();
});

/** 启动session **/
app.use(session({ secret: "Reeyc" }));

/** 请求拦截 **/
app.all("*", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:8080");
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
  //把token分发给其他路由
  const token = req.headers["authorization"];
  if (token) {
    vertoken.verToken(token).then(data => {
      req.user_token = data;
      next();
    });
  } else {
    next();
  }
});

/** 启动服务 **/
app.listen(port, () => {
  console.log(`Your api-server is running here: http://localhost:${port}/`);
});

const login = require("./router/login");
const profile = require("./router/profile");
const home = require("./router/home");
const device = require("./router/device");
const ad = require("./router/ad");
const merchant = require("./router/merchant");
const statement = require("./router/statement");
const authority = require("./router/authority");
const sms = require("./router/sms");
const log = require("./router/log");

app.use("/login", login);
app.use("/profile", profile);
app.use("/home", home);
app.use("/device", device);
app.use("/ad", ad);
app.use("/merchant", merchant);
app.use("/statement", statement);
app.use("/authority", authority);
app.use("/sms", sms);
app.use("/log", log);

/** 访问静态资源权限 **/
app.use(expressStatic(__dirname + "/static"));
