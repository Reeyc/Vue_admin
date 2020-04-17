import Layout from "@/layout";
export default {
  path: "/sms",
  redirect: "/sms/index",
  component: Layout,
  meta: { id: 28, label: "短信记录", topMenu: true },
  children: [
    {
      path: "/sms/index",
      component: () => import("@/views/sms"),
      meta: { id: 29, icon: "el-icon-s-promotion", label: "短信记录" }
    }
  ]
};
