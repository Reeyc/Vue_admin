import Layout from "@/layout";
export default {
  path: "/device",
  redirect: "/device/list",
  component: Layout,
  meta: { id: 3, label: "场景管理", icon: "el-icon-s-platform" },
  children: [
    {
      path: "/device/list",
      component: () => import("@/views/device/list"),
      meta: { id: 4, label: "场景列表" }
    },
    {
      path: "/device/type",
      component: () => import("@/views/device/type"),
      meta: { id: 5, label: "场景类型" }
    }
  ]
};
