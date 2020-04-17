const { router, Mock, code } = require("../common");
const { userInfo, roles } = require("../user_info");

const { setToken } = require("../token_vertify.js");

//登陆
router.post("", (req, res) => {
  const { username, password } = req.body;
  const flag = Object.keys(userInfo).every(key => username !== key);

  if (flag || password !== "123456") {
    res.json({
      code: code.ERROR_CODE,
      msg: "用户名或密码错误"
    });
  } else {
    setToken(username, "111").then(token => {
      req.session.currentUser = userInfo[username];
      res.json({
        code: code.SUCCESS_CODE,
        msg: "登陆成功",
        data: {
          token,
          info: userInfo[username]
        }
      });
    });
  }
});

//权限菜单
router.post("/assignRuleTree", (req, res) => {
  const { group_id } = req.session.currentUser;
  res.json(
    Mock.mock({
      code: code.SUCCESS_CODE,
      data: roles.find(item => item.group_id === group_id)["roles"]
    })
  );
});

//退出登录
router.post("/loginout", (req, res) => {
  res.json({ code: code.SUCCESS_CODE });
});

module.exports = router;
