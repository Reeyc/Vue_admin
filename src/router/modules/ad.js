import Layout from "@/layout";
export default {
  path: "/ad",
  redirect: "/ad/listAd",
  component: Layout,
  meta: { id: 6, label: "广告管理", icon: "el-icon-picture" },
  children: [
    {
      path: "/ad/listAd",
      component: () => import("@/views/ad/listAd"),
      meta: { id: 7, label: "广告列表", icon: "el-icon-s-order" }
    },
    {
      path: "/ad/addAd",
      component: () => import("@/views/ad/addAd"),
      meta: { id: 8, label: "广告投放", icon: "el-icon-circle-plus" }
    },
    {
      name: "editAd",
      path: "/ad/editAd/:editAd",
      component: () => import("@/views/ad/editAd"),
      meta: { label: "广告编辑", noRenderMenu: true }
    },
    {
      path: "/ad/auditAd",
      component: () => import("@/views/ad/auditAd"),
      meta: { id: 9, label: "广告审核", icon: "el-icon-s-check" }
    }
  ]
};
