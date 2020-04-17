/**
 * API Modules
 */

const URL = {
  //登录注销
  login: "/login",
  loginOut: "/login/loginout",
  roles: "/login/assignRuleTree",

  //头部功能
  loginPwd: "/profile/pwd",
  profile: "/profile/info",
  notices: "/profile/notice",
  noticeDel: "/profile/notice_del",

  //首页
  welcomeData: "/home/card_data",
  userOnline: "/home/online_users",
  sceneOnline: "/home/online_station",
  sceneTotal: "/home/login_total",
  oneScene: "/home/login_one",
  twoScene: "/home/login_two",
  loginType: "/home/login_type",
  mapDevice: "/home/online_map",

  //设备列表
  deviceList: "/device/buss_list",
  deviceType: "/device/buss_type_list",
  deviceAdd: "/device/do_buss_type_add",
  deviceEdit: "/device/do_buss_type_edit",

  //广告
  uploadImg: "/ad/upload",
  sceneDetail: "/ad/scene_detail",
  addAd: "/ad/addad",
  listAd: "/ad/ad_list",
  checkListAd: "/ad/check",
  checkSubmit: "/ad/do_check",
  editAd: "/ad/edit",
  xiakanAd: "/ad/xiakan",
  adDel: "/ad/del",
  adStatement: "/ad/statement",
  adDetail: "/ad/detail",

  //商家
  merchantList: "/merchant/merchant_list",
  merchantAdd: "/merchant/merchant_add",
  merchanAudit: "/merchant/examine",
  merchantPwd: "/merchant/merchant_pwd",
  merchantScene: "/merchant/scene_toggle",
  merchantVIP: "/merchant/vip",
  merchantLock: "/merchant/lock",
  provinceCity: "/merchant/city",
  provinceList: "/merchant/province",
  rechargeList: "/merchant/recharge_list",
  rechargeAdd: "/merchant/recharge_add",
  rechargeAudit: "/merchant/recharge_audit",
  mealList: "/merchant/meal_list",
  mealAdd: "/merchant/meal_add",
  mealEdit: "/merchant/meal_edit",
  mealDel: "/merchant/meal_del",

  //报表中心
  sceneList: "/statement/scene_list",
  totalUser: "/statement/user_list",
  oneSceneUser: "/statement/rail_list",
  twoSceneUser: "/statement/mct_list",
  oneSceneEcharts: "/statement/login_rail",
  twoSceneEcharts: "/statement/login_mct",
  onlineUser: "/statement/online_list",
  offlineUser: "/statement/offline_list",
  offlineDevice: "/statement/offdev_list",
  oneDetail: "/statement/rail_detail",
  twoDetail: "/statement/mct_detail",
  loginRecord: "/statement/login_record",

  //权限管理
  adminList: "/authority/authority_list",
  adminAdd: "/authority/authority_add",
  adminEdit: "/authority/authority_edit",
  adminDel: "/authority/authority_del",
  adminPwd: "/authority/authority_pwd",
  adminGrant: "/authority/authority_grant",
  groupList: "/authority/group_list",
  groupAdd: "/authority/group_add",
  groupEdit: "/authority/group_edit",
  allGrant: "/authority/allGrantAuth",
  groupDel: "/authority/group_del",

  //其他
  sms: "/sms/sms_list",
  log: "/log/log_list"
};

module.exports = URL;
