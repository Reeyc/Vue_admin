const { router, Mock, code } = require("../common");
const { roles } = require("../user_info");

//管理员列表
router.post("/authority_list", (req, res) => {
  Mock.deferred(100, 1000, () => {
    res.json(
      Mock.mock({
        code: code.SUCCESS_CODE,
        count: 3,
        data: [
          {
            id: 1,
            group_id: 1,
            name: "Reeyc",
            username: "admin",
            phone: "13000000000",
            title: "超级管理员",
            remark: "超级管理员",
            status: 1,
            create_at: 1546272000,
            super: 1
          },
          {
            id: 2,
            group_id: 2,
            name: "Manager",
            username: "manager",
            phone: "13111111111",
            title: "经理",
            remark: "经理经理经理经理",
            status: 1,
            create_at: 1577808000
          },
          {
            id: 3,
            group_id: 3,
            name: "Treasurer",
            username: "treasurer",
            phone: "13222222222",
            title: "财务",
            remark: "财务财务财务财务财务财务财务",
            status: 1,
            create_at: 1577808000
          },
          {
            id: 4,
            group_id: 4,
            name: "Salesman",
            username: "salesman",
            phone: "13333333333",
            title: "业务",
            remark: "业务业务业务业务业务业务",
            status: 1,
            create_at: 1577808000
          },
          {
            id: 5,
            group_id: 5,
            name: "Guest",
            username: "guest",
            phone: "13333333333",
            title: "来宾",
            remark: "来宾来宾来宾来宾来宾",
            status: 1,
            create_at: 1577808000
          },
          {
            id: 6,
            group_id: 6,
            name: "测试",
            username: "test",
            phone: "13000000000",
            title: "测试专用",
            remark: "TEST TEST TEST TEST TEST TEST",
            status: 1,
            create_at: 1577808000,
            super: 1
          }
        ]
      })
    );
  });
});

//管理员添加
router.post("/authority_add", (req, res) => {
  Mock.deferred(100, 1000, () => {
    res.json(
      Mock.mock({
        code: req.body ? code.SUCCESS_CODE : code.ERROR_CODE
      })
    );
  });
});

//管理员编辑
router.post("/authority_edit", (req, res) => {
  Mock.deferred(100, 1000, () => {
    res.json(
      Mock.mock({
        code: req.body.id ? code.SUCCESS_CODE : code.ERROR_CODE
      })
    );
  });
});

//管理员改密
router.post("/authority_pwd", (req, res) => {
  Mock.deferred(100, 1000, () => {
    res.json(
      Mock.mock({
        code: req.body.id && req.body.password && req.body.repassword ? code.SUCCESS_CODE : code.ERROR_CODE
      })
    );
  });
});

//管理员分配角色
router.post("/authority_grant", (req, res) => {
  Mock.deferred(100, 1000, () => {
    res.json(
      Mock.mock({
        code: req.body.id && req.body.group_id ? code.SUCCESS_CODE : code.ERROR_CODE
      })
    );
  });
});

//管理员删除
router.post("/authority_del", (req, res) => {
  Mock.deferred(100, 1000, () => {
    res.json(
      Mock.mock({
        code: req.body.uid ? code.SUCCESS_CODE : code.ERROR_CODE
      })
    );
  });
});

//角色组列表
router.post("/group_list", (req, res) => {
  Mock.deferred(100, 1000, () => {
    res.json(
      Mock.mock({
        code: code.SUCCESS_CODE,
        count: 6,
        data: roles
      })
    );
  });
});

//角色组添加
router.post("/group_add", (req, res) => {
  Mock.deferred(100, 1000, () => {
    res.json(
      Mock.mock({
        code: req.body ? code.SUCCESS_CODE : code.ERROR_CODE
      })
    );
  });
});

//角色组编辑
router.post("/group_edit", (req, res) => {
  Mock.deferred(100, 1000, () => {
    res.json(
      Mock.mock({
        code: req.body.gid ? code.SUCCESS_CODE : code.ERROR_CODE
      })
    );
  });
});

//角色组删除
router.post("/group_del", (req, res) => {
  Mock.deferred(100, 1000, () => {
    res.json(
      Mock.mock({
        code: req.body.gid ? code.SUCCESS_CODE : code.ERROR_CODE
      })
    );
  });
});

//所有权限菜单
router.post("/allGrantAuth", (req, res) => {
  Mock.deferred(100, 1000, () => {
    res.json(
      Mock.mock({
        code: code.SUCCESS_CODE,
        data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]
      })
    );
  });
});

module.exports = router;
