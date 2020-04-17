const { router, Mock, code } = require("../common");

const action = [
  "管理员【admin】查看【首页】",
  "管理员【admin】查看【设备列表】",
  "管理员【admin】查看【设备类型】",
  "管理员【admin】查看【广告列表】",
  "管理员【admin】查看【广告投放】",
  "管理员【admin】查看【广告审核】",
  "管理员【admin】查看【商家列表】",
  "管理员【admin】查看【充值中心】",
  "管理员【admin】查看【短信套餐】",
  "管理员【admin】查看【上刊广告统计】",
  "管理员【admin】查看【下刊广告统计】",
  "管理员【admin】查看【历史用户报表】",
  "管理员【admin】查看【场景分类报表】",
  "管理员【admin】查看【在线用户报表】",
  "管理员【admin】查看【离线用户报表】",
  "管理员【admin】查看【离线设备报表】",
  "管理员【admin】查看【一类场景报表】",
  "管理员【admin】查看【二类场景报表】",
  "管理员【admin】查看【管理员列表】",
  "管理员【admin】查看【角色列表】",
  "管理员【admin】查看【短信记录】",
  "管理员【admin】查看【操作日志】",
  "管理员【admin】进行【修改个人信息】",
  "管理员【admin】进行【添加广告】",
  "管理员【admin】进行【审核广告】",
  "管理员【admin】进行【编辑广告】",
  "管理员【admin】进行【下刊广告】",
  "管理员【admin】进行【删除广告】",
  "管理员【admin】进行【添加商家】",
  "管理员【admin】进行【审核商家】",
  "管理员【admin】进行【切换商家场景】",
  "管理员【admin】进行【认证商家】",
  "管理员【admin】进行【取消认证商家】",
  "管理员【admin】进行【锁定商家】",
  "管理员【admin】进行【恢复商家】",
  "管理员【admin】进行【订单充值】",
  "管理员【admin】进行【添加短信套餐】",
  "管理员【admin】进行【删除短信套餐】",
  "管理员【admin】进行【添加管理员】",
  "管理员【admin】进行【编辑管理员】",
  "管理员【admin】进行【修改密码】",
  "管理员【admin】进行【分配管理员】",
  "管理员【admin】进行【删除管理员】",
  "管理员【admin】进行【添加角色】",
  "管理员【admin】进行【分配角色权限】",
  "管理员【admin】进行【删除角色】"
];

//操作日志
router.post("/log_list", (req, res) => {
  const dataLen = `data|${req.body.limit}`;
  Mock.deferred(100, 1000, () => {
    res.json(
      Mock.mock({
        code: code.SUCCESS_CODE,
        count: 28285,
        [dataLen]: [
          {
            "id|+1": 1,
            operator: "admin",
            state: 1,
            "action|1": action,
            time: function() {
              const now = new Date().getTime() / 1000;
              return now - Mock.mock("@integer(1, 7776000)");
            }
          }
        ]
      })
    );
  });
});

module.exports = router;
