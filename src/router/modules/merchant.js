import Layout from "@/layout";
export default {
  path: "/merchant",
  redirect: "/merchant/list",
  component: Layout,
  meta: { id: 10, label: "商家管理", icon: "el-icon-s-shop" },
  children: [
    {
      path: "/merchant/list",
      component: () => import("@/views/merchant/list"),
      meta: { id: 11, label: "商家列表" }
    },
    {
      path: "/merchant/voucher",
      component: () => import("@/views/merchant/voucher"),
      meta: { id: 12, label: "充值中心" }
    },
    {
      path: "/merchant/meal",
      component: () => import("@/views/merchant/meal"),
      meta: { id: 13, label: "短信套餐" }
    }
  ]
};
