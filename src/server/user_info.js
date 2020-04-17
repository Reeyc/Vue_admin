const userInfo = {
  admin: { group_id: 1, name: "Reeyc", phone: "13000000000", pic: "profile/admin.jpg", remark: "超级管理员", username: "admin", super: 1 },
  manager: { group_id: 2, name: "Manager", phone: "13111111111", pic: "profile/manager.jpg", remark: "经理", username: "manager" },
  treasurer: { group_id: 3, name: "Treasurer", phone: "13222222222", pic: "profile/treasurer.jpg", remark: "财务", username: "treasurer" },
  salesman: { group_id: 4, name: "Salesman", phone: "13333333333", pic: "profile/salesman.jpg", remark: "业务", username: "salesman" },
  guest: { group_id: 5, name: "Guest", phone: "13444444444", pic: "profile/guest.jpg", remark: "来宾", username: "guest" },
  test: { group_id: 6, name: "TEST", phone: "13555555555", pic: "profile/test.jpg", remark: "测试", username: "test", super: 1 }
};

const roles = [
  {
    group_id: 1,
    title: "超级管理员",
    remark: "",
    status: 1,
    roles: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
    super: 1
  },
  {
    group_id: 2,
    title: "经理",
    remark: "",
    status: 1,
    roles: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 28, 29]
  },
  {
    group_id: 3,
    title: "财务",
    remark: "",
    status: 1,
    roles: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
  },
  {
    group_id: 4,
    title: "业务",
    remark: "",
    status: 1,
    roles: [5, 6, 7, 8, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]
  },
  {
    group_id: 5,
    title: "来宾",
    remark: "",
    status: 1,
    roles: [1, 2]
  },
  {
    group_id: 6,
    title: "测试专用",
    remark: "",
    status: 1,
    roles: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]
  }
];

module.exports = { userInfo, roles };
