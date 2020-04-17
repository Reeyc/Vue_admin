const { router, Mock, code } = require("../common");

//修改个人信息
router.post("/info", (req, res) => {
  res.json({
    code: req.body ? code.SUCCESS_CODE : code.ERROR_CODE,
    data: {
      group_id: 1,
      name: "Reeyc",
      phone: "13178977869",
      pic: "profile/user01.jpg",
      remark: "超级管理员",
      username: "admin"
    }
  });
});

//修改密码
router.post("/pwd", (req, res) => {
  const { password, repassword } = req.body;
  res.json({
    code: password === repassword ? code.SUCCESS_CODE : code.ERROR_CODE
  });
});

//消息中心
router.post("/notice", (req, res) => {
  Mock.deferred(2000, 2500, () => {
    res.json({
      code: code.SUCCESS_CODE,
      adNotice: 5,
      data: [
        {
          id: 1,
          title: "放假通知",
          content:
            "根据国家相关部门发布的关于中秋节及国庆节假期安排的通知，结合我公司工作实际情况，安排如下：中秋节：2020年9月22日至9月24日休息，放假3日。9月25日至9月30日（星期二至星期日，为期6天）正常上班。国庆节：2020年10月1日至10月7日休息，放假7天。节前，请自行安排好卫生清洁，确保窗户、电源关闭好。特此通知！恭祝全体同仁： 节日快乐，万事如意！",
          create_time: "2020-04-12"
        },
        {
          id: 2,
          title: "明天开会通知",
          content: "各位领导和同事：由研发部召集的关于技术对接专题会议将于2020年12月12日在会议室（2）室召开，请大家准时参加",
          create_time: "2020-04-12"
        },
        {
          id: 3,
          title: "今晚聚餐",
          content: "今晚聚餐，大家18:30在公司楼下集合",
          create_time: "2020-04-12"
        }
      ]
    });
  });
});

//消息删除
router.post("/notice_del", (req, res) => {
  Mock.deferred(2000, 2500, () => {
    if (req.body.id) {
      res.json({
        code: code.SUCCESS_CODE,
        adNotice: 5,
        data: [
          {
            id: 1,
            title: "放假通知",
            content:
              "根据国家相关部门发布的关于中秋节及国庆节假期安排的通知，结合我公司工作实际情况，安排如下：中秋节：2020年9月22日至9月24日休息，放假3日。9月25日至9月30日（星期二至星期日，为期6天）正常上班。国庆节：2020年10月1日至10月7日休息，放假7天。节前，请自行安排好卫生清洁，确保窗户、电源关闭好。特此通知！恭祝全体同仁： 节日快乐，万事如意！",
            create_time: "2020-04-12"
          },
          {
            id: 2,
            title: "明天开会通知",
            content: "各位领导和同事：由研发部召集的关于技术对接专题会议将于2020年12月12日在会议室（2）室召开，请大家准时参加",
            create_time: "2020-04-12"
          },
          {
            id: 3,
            title: "今晚聚餐",
            content: "今晚聚餐，大家18:30在公司楼下集合",
            create_time: "2020-04-12"
          }
        ]
      });
    } else {
      res.json({ code: code.ERROR_CODE });
    }
  });
});

module.exports = router;
