import Layout from "@/layout";
export default {
  path: "/adStatistics",
  redirect: "/adStatistics/exposure",
  component: Layout,
  meta: { id: 14, label: "广告统计", icon: "el-icon-s-grid" },
  children: [
    {
      path: "/adStatistics/onlineAd",
      component: () => import("@/views/adStatistics/onlineAd"),
      meta: { id: 15, label: "上刊广告" }
    },
    {
      path: "/adStatistics/offAd",
      component: () => import("@/views/adStatistics/offAd"),
      meta: { id: 16, label: "下刊广告" }
    }
  ]
};
