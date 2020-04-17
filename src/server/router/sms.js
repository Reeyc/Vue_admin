const { router, Mock, code } = require("../common");

//短信记录
router.post("/sms_list", (req, res) => {
  const { tab } = req.body;
  const dataLen = `data|${req.body.limit}`;
  Mock.deferred(100, 1000, () => {
    res.json(
      Mock.mock({
        code: code.SUCCESS_CODE,
        count: tab == 1 ? 8956 : 7,
        [dataLen]: [
          {
            "id|+1": 1,
            phone: /^1[3578][1-9]\d{8}/,
            source: tab == 1 ? "登录后台" : "找回密码",
            v_code: function() {
              return Mock.mock("@integer(100000, 999999)");
            },
            last_sms_time: function() {
              const now = new Date().getTime() / 1000;
              return now - Mock.mock("@integer(1, 7776000)");
            },
            status: "OK"
          }
        ]
      })
    );
  });
});

module.exports = router;
