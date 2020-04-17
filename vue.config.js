const path = require("path");
const API = require("./src/api/base");

function resolve(dir) {
  return path.join(__dirname, dir);
}

const PROXY_CONFIG = {
  target: process.env.VUE_APP_BASE_URL,
  ws: true,
  changeOrigin: true
};

const PROXY = {};
for (let [, v] of Object.entries(API)) {
  PROXY[v] = PROXY_CONFIG;
}

module.exports = {
  publicPath: process.env.VUE_APP_BASE_PUBLIC_PATH,
  productionSourceMap: false,
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/assets/css/sass/variable.scss";`
      }
    }
  },
  transpileDependencies: ["element-ui"],
  chainWebpack: config => {
    config.entry("main").add("babel-polyfill");
    config.resolve.alias
      .set("@", resolve("src"))
      .set("api", resolve("src/api"))
      .set("js", resolve("src/assets/js"))
      .set("css", resolve("src/assets/css"))
      .set("icon", resolve("src/assets/icon"))
      .set("img", resolve("src/assets/img"));
  },
  devServer: {
    https: false,
    hotOnly: false,
    proxy: PROXY
  }
};
