import Layout from "@/layout";
export default {
  path: "/authority",
  redirect: "/authority/administrator",
  component: Layout,
  meta: { id: 25, label: "权限管理", icon: "el-icon-s-help" },
  children: [
    {
      path: "/authority/administrator",
      component: () => import("@/views/authority/administrator"),
      meta: { id: 26, label: "管理员" }
    },
    {
      path: "/authority/role",
      component: () => import("@/views/authority/role"),
      meta: { id: 27, label: "角色" }
    }
  ]
};
