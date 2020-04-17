import Layout from "@/layout";
export default {
  path: "/home",
  redirect: "/home/index",
  component: Layout,
  meta: { id: 1, label: "首页", topMenu: true },
  children: [
    {
      path: "/home/index",
      component: () => import("@/views/home"),
      meta: { id: 2, label: "首页", icon: "el-icon-s-home" }
    }
  ]
};
