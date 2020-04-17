import Layout from "@/layout";
export default {
  path: "/log",
  redirect: "/log/index",
  component: Layout,
  meta: { id: 30, label: "操作日志", topMenu: true },
  children: [
    {
      path: "/log/index",
      component: () => import("@/views/log"),
      meta: { id: 31, icon: "el-icon-s-order", label: "操作日志" }
    }
  ]
};
