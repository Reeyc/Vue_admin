import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "@/layout";
import store from "@/store";

import { Message } from "element-ui";

Vue.use(VueRouter);

const Page404 = () => import("@/views/errorPage/index");

const modules = [];
const files = require.context("./modules", false, /\.js$/);
files.keys().forEach(key => modules.push(files(key)["default"]));

/** 动态路由匹配 **/
const filterRouter = (asyncRoutes, roles) => {
  const result = [];
  for (let route of asyncRoutes) {
    const itemNew = { ...route };
    const { id, noRenderMenu } = itemNew.meta;
    if (roles.includes(id) || noRenderMenu) {
      if (itemNew.children) {
        itemNew.children = filterRouter(itemNew.children, roles);
      }
      result.push(itemNew);
    }
  }
  return result;
};

export { filterRouter };

/** 动态路由排序 **/
const sortRouter = list => {
  list.sort((a, b) => a.meta.id - b.meta.id);
  list.children && sortRouter(list.children);
};
sortRouter(modules);

/**
 * 动态路由
 * meta字段说明
 * id：           对应后端接口给的权限id
 * title：        菜单名称
 * icon：         菜单图标
 * topMenu：      顶级菜单
 * noRenderMenu： 不渲染在侧边栏上（公共路由）
 */
export const asyncRoutes = modules;

/** 通用路由  **/
const constantRoutes = [
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login")
  },
  {
    path: "/refresh",
    redirect: "/refresh/index",
    component: Layout,
    children: [
      {
        path: "index",
        name: "refresh",
        component: () => import("@/views/refresh/index")
      }
    ]
  }
];

const creatRouter = () => {
  return new VueRouter({
    routes: constantRoutes,
    scrollBehavior() {
      return { x: 0, y: 0 };
    }
  });
};

const router = creatRouter();

/** 删除动态路由 **/
export const resetRouter = () => {
  const reset = creatRouter();
  router.matcher = reset.matcher;
};

router.beforeEach(async (to, from, next) => {
  //清除所有请求
  store.commit("CLEAR_HTTP");
  if (to.path === "/login") {
    next();
  } else {
    if (!store.state.token) {
      //token不存在
      next({ path: "/login" });
    } else {
      if (store.state.roles.length < 1) {
        //权限不存在
        try {
          const asyncRouter = await store.dispatch("_getRoles");
          router.addRoutes(asyncRouter);
          router.addRoutes([
            { path: "/", redirect: asyncRouter[0].path },
            { path: "*", name: "404", component: Page404 }
          ]);
          next({ ...to, replace: true });
        } catch (error) {
          Message.error(error);
        }
      } else {
        next();
      }
    }
  }
});

export default router;
