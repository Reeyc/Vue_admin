import Layout from "@/layout";
export default {
  path: "/statement",
  redirect: "/statement/totalUser",
  component: Layout,
  meta: { id: 17, label: "报表中心", icon: "el-icon-s-data" },
  children: [
    {
      path: "/statement/totalUser",
      component: () => import("@/views/statement/totalUser"),
      meta: { id: 18, label: "历史用户", icon: "el-icon-huizong iconfont" }
    },
    {
      path: "/statement/typeScene",
      component: () => import("@/views/statement/typeScene"),
      meta: { id: 19, label: "场景分类", icon: "el-icon-fenlei iconfont" }
    },
    {
      path: "/statement/onlineUser",
      component: () => import("@/views/statement/onlineUser"),
      meta: { id: 20, label: "在线用户", icon: "el-icon-zaixian iconfont" }
    },
    {
      path: "/statement/offlineUser",
      component: () => import("@/views/statement/offlineUser"),
      meta: { id: 21, label: "离线用户", icon: "el-icon-lixian iconfont" }
    },
    {
      path: "/statement/offlineDevice",
      component: () => import("@/views/statement/offlineDevice"),
      meta: { id: 22, label: "离线设备", icon: "el-icon-lixian1 iconfont" }
    },
    {
      path: "/statement/oneDetail",
      component: () => import("@/views/statement/oneDetail"),
      meta: { id: 23, label: "一类场景", icon: "el-icon-ft-subway-o iconfont" }
    },
    {
      path: "/statement/twoDetail",
      component: () => import("@/views/statement/twoDetail"),
      meta: { id: 24, label: "二类场景", icon: "el-icon-shangjia iconfont" }
    }
  ]
};
