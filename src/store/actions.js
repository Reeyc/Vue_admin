import API from "@/api/modules/login";

import router, { filterRouter, asyncRoutes, resetRouter } from "@/router";

const actions = {
  _login({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      API.login(userInfo)
        .then(res => {
          commit("SET_TOKEN", res.data.token);
          commit("SET_USER_INFO", res.data.info);
          resolve(res);
        })
        .catch(error => reject(error));
    });
  },

  _loginOut({ commit }) {
    return new Promise((resolve, reject) => {
      API.loginout()
        .then(res => {
          commit("CLEAR_HTTP");
          commit("DEL_TOKEN");
          commit("DEL_USER_INFO");
          commit("SET_ROLES", []);
          resetRouter();
          router.push("/login");
          resolve(res);
        })
        .catch(error => reject(error));
    });
  },

  _getRoles({ commit }) {
    return new Promise((resolve, reject) => {
      API.getRoles()
        .then(res => {
          let routes = [];
          routes = filterRouter(asyncRoutes, res.data);
          commit("SET_ROLES", routes);
          resolve(routes);
        })
        .catch(error => reject(error));
    });
  }
};

export default actions;
