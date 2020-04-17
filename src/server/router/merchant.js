const { router, Mock, code } = require("../common");

const fs = require("fs");
const path = require("path");
const file = path.join(__dirname, "../static/json/city.json");

//省份列表
router.post("/province", (req, res) => {
  Mock.deferred(100, 1000, () => {
    res.json(
      Mock.mock({
        code: code.SUCCESS_CODE,
        data: [
          { id: 2, pid: 1, name: "北京", type: 1 },
          { id: 3, pid: 1, name: "安徽", type: 1 },
          { id: 4, pid: 1, name: "福建", type: 1 },
          { id: 5, pid: 1, name: "甘肃", type: 1 },
          { id: 6, pid: 1, name: "广东", type: 1 },
          { id: 7, pid: 1, name: "广西", type: 1 },
          { id: 8, pid: 1, name: "贵州", type: 1 },
          { id: 9, pid: 1, name: "海南", type: 1 },
          { id: 10, pid: 1, name: "河北", type: 1 },
          { id: 11, pid: 1, name: "河南", type: 1 },
          { id: 12, pid: 1, name: "黑龙江", type: 1 },
          { id: 13, pid: 1, name: "湖北", type: 1 },
          { id: 14, pid: 1, name: "湖南", type: 1 },
          { id: 15, pid: 1, name: "吉林", type: 1 },
          { id: 16, pid: 1, name: "江苏", type: 1 },
          { id: 17, pid: 1, name: "江西", type: 1 },
          { id: 18, pid: 1, name: "辽宁", type: 1 },
          { id: 19, pid: 1, name: "内蒙古", type: 1 },
          { id: 20, pid: 1, name: "宁夏", type: 1 },
          { id: 21, pid: 1, name: "青海", type: 1 },
          { id: 22, pid: 1, name: "山东", type: 1 },
          { id: 23, pid: 1, name: "山西", type: 1 },
          { id: 24, pid: 1, name: "陕西", type: 1 },
          { id: 25, pid: 1, name: "上海", type: 1 },
          { id: 26, pid: 1, name: "四川", type: 1 },
          { id: 27, pid: 1, name: "天津", type: 1 },
          { id: 28, pid: 1, name: "西藏", type: 1 },
          { id: 29, pid: 1, name: "新疆", type: 1 },
          { id: 30, pid: 1, name: "云南", type: 1 },
          { id: 31, pid: 1, name: "浙江", type: 1 },
          { id: 32, pid: 1, name: "重庆", type: 1 },
          { id: 33, pid: 1, name: "香港", type: 1 },
          { id: 34, pid: 1, name: "澳门", type: 1 },
          { id: 35, pid: 1, name: "台湾", type: 1 }
        ]
      })
    );
  });
});

//省市列表
router.post("/city", (req, res) => {
  Mock.deferred(100, 1000, () => {
    fs.readFile(file, "utf-8", function(err, data) {
      const newData = JSON.parse(data);
      if (req.body.pid) {
        //根据省份查询城市
        const { pid } = req.body;
        const result = { code: code.SUCCESS_CODE, data: [] };
        result.data = newData.filter(item => item.pid == pid);
        res.send(result);
      } else {
        //直接查询省份和城市
        const { province, city } = req.body;
        const result = { code: code.SUCCESS_CODE, data: {} };
        newData.forEach(item => {
          if (item.id == province) {
            result.data.province = item.name;
          }
          if (item.id == city && item.pid == province) {
            result.data.city = item.name;
          }
        });
        res.send(result);
      }
    });
  });
});

//商家添加
router.post("/merchant_add", (req, res) => {
  Mock.deferred(100, 1000, () => {
    res.json(
      Mock.mock({
        code: req.body ? code.SUCCESS_CODE : code.ERROR_CODE
      })
    );
  });
});

//商家列表
router.post("/merchant_list", (req, res) => {
  Mock.deferred(100, 1000, () => {
    res.json(
      Mock.mock({
        code: code.SUCCESS_CODE,
        count: 8,
        data: [
          {
            id: 1,
            dev_id: 3371,
            company: "星巴克",
            legal_person: "叶先生",
            province: 9,
            city: 120,
            address: "海秀中路精彩融创2612号",
            realname: "叶先生",
            email: "111@163.com",
            desc: "星巴克咖啡厅欢迎您",
            phone: "13000000000",
            card_number: "460000000000000000",
            card_back: "merchant/card_back.jpg",
            card_front: "merchant/card_front.jpg",
            license: "merchant/license.jpg",
            state: 1,
            status: 1,
            login_status: 0,
            time: 1585644230,
            mobile: "13000000000",
            first_time: 1585039908,
            is_vip: 1,
            tp_id: 2
          },
          {
            id: 2,
            dev_id: 3372,
            company: "半岛快餐",
            legal_person: "李先生",
            province: 9,
            city: 120,
            address: "龙华区复兴城C3区16号",
            realname: "李先生",
            email: "222@163.com",
            desc: "半岛快餐店欢迎您",
            phone: "18000000000",
            card_number: "460000000000000000",
            card_back: "merchant/card_back.jpg",
            card_front: "merchant/card_front.jpg",
            license: "merchant/license.jpg",
            state: 2,
            status: 2,
            login_status: 0,
            time: 1585644230,
            mobile: "18000000000",
            first_time: 1585039908,
            is_vip: 1,
            tp_id: 1
          },
          {
            id: 3,
            dev_id: 3373,
            company: "月上庭",
            legal_person: "王先生",
            province: 9,
            city: 120,
            address: "骑楼老街888号",
            realname: "王先生",
            email: "333@163.com",
            desc: "月上庭休闲饮吧欢迎您",
            phone: "15000000000",
            card_number: "460000000000000000",
            card_back: "merchant/card_back.jpg",
            card_front: "merchant/card_front.jpg",
            license: "merchant/license.jpg",
            state: 1,
            status: 1,
            login_status: 0,
            time: 1585644230,
            mobile: "15000000000",
            first_time: 1585039908,
            is_vip: 0,
            tp_id: 2
          },
          {
            id: 4,
            dev_id: 3374,
            company: "谧绮咖啡",
            legal_person: "张先生",
            province: 9,
            city: 120,
            address: "文化北路100号",
            realname: "张先生",
            email: "444@163.com",
            desc: "谧绮咖啡欢迎您",
            phone: "17000000000",
            card_number: "460000000000000000",
            card_back: "merchant/card_back.jpg",
            card_front: "merchant/card_front.jpg",
            license: "merchant/license.jpg",
            state: 0,
            status: 0,
            login_status: 1,
            time: 1585644230,
            mobile: "17000000000",
            first_time: 1585039908,
            is_vip: 1,
            tp_id: 1
          },
          {
            id: 5,
            dev_id: 3371,
            company: "星巴克",
            legal_person: "叶先生",
            province: 9,
            city: 120,
            address: "海秀中路精彩融创2612号",
            realname: "叶先生",
            email: "111@163.com",
            desc: "星巴克咖啡厅欢迎您",
            phone: "13000000000",
            card_number: "460000000000000000",
            card_back: "merchant/card_back.jpg",
            card_front: "merchant/card_front.jpg",
            license: "merchant/license.jpg",
            state: 1,
            status: 1,
            login_status: 0,
            time: 1585644230,
            mobile: "13000000000",
            first_time: 1585039908,
            is_vip: 1,
            tp_id: 2
          },
          {
            id: 6,
            dev_id: 3372,
            company: "半岛快餐",
            legal_person: "李先生",
            province: 9,
            city: 120,
            address: "龙华区复兴城C3区16号",
            realname: "李先生",
            email: "222@163.com",
            desc: "半岛快餐店欢迎您",
            phone: "18000000000",
            card_number: "460000000000000000",
            card_back: "merchant/card_back.jpg",
            card_front: "merchant/card_front.jpg",
            license: "merchant/license.jpg",
            state: 2,
            status: 2,
            login_status: 0,
            time: 1585644230,
            mobile: "18000000000",
            first_time: 1585039908,
            is_vip: 1,
            tp_id: 1
          },
          {
            id: 7,
            dev_id: 3373,
            company: "月上庭",
            legal_person: "王先生",
            province: 9,
            city: 120,
            address: "骑楼老街888号",
            realname: "王先生",
            email: "333@163.com",
            desc: "月上庭休闲饮吧欢迎您",
            phone: "15000000000",
            card_number: "460000000000000000",
            card_back: "merchant/card_back.jpg",
            card_front: "merchant/card_front.jpg",
            license: "merchant/license.jpg",
            state: 1,
            status: 1,
            login_status: 0,
            time: 1585644230,
            mobile: "15000000000",
            first_time: 1585039908,
            is_vip: 0,
            tp_id: 2
          },
          {
            id: 8,
            dev_id: 3374,
            company: "谧绮咖啡",
            legal_person: "张先生",
            province: 9,
            city: 120,
            address: "文化北路100号",
            realname: "张先生",
            email: "444@163.com",
            desc: "谧绮咖啡欢迎您",
            phone: "17000000000",
            card_number: "460000000000000000",
            card_back: "merchant/card_back.jpg",
            card_front: "merchant/card_front.jpg",
            license: "merchant/license.jpg",
            state: 0,
            status: 0,
            login_status: 1,
            time: 1585644230,
            mobile: "17000000000",
            first_time: 1585039908,
            is_vip: 1,
            tp_id: 1
          }
        ]
      })
    );
  });
});

//场景切换
router.post("/scene_toggle", (req, res) => {
  Mock.deferred(100, 1000, () => {
    res.json(
      Mock.mock({
        code: req.body.id && req.body.tp_id ? code.SUCCESS_CODE : code.ERROR_CODE
      })
    );
  });
});

//修改密码
router.post("/merchant_pwd", (req, res) => {
  Mock.deferred(100, 1000, () => {
    res.json(
      Mock.mock({
        code: req.body.id && req.body.password ? code.SUCCESS_CODE : code.ERROR_CODE
      })
    );
  });
});

//认证切换
router.post("/vip", (req, res) => {
  Mock.deferred(100, 1000, () => {
    res.json(
      Mock.mock({
        code: req.body.id && req.body.vip ? code.SUCCESS_CODE : code.ERROR_CODE
      })
    );
  });
});

//锁定切换
router.post("/lock", (req, res) => {
  Mock.deferred(100, 1000, () => {
    res.json(
      Mock.mock({
        code: req.body.id && req.body.lock ? code.SUCCESS_CODE : code.ERROR_CODE
      })
    );
  });
});

//审核提交
router.post("/examine", (req, res) => {
  Mock.deferred(100, 1000, () => {
    res.json(
      Mock.mock({
        code: req.body.id ? code.SUCCESS_CODE : code.ERROR_CODE
      })
    );
  });
});

//订单列表
router.post("/recharge_list", (req, res) => {
  Mock.deferred(100, 1000, () => {
    res.json(
      Mock.mock({
        code: code.SUCCESS_CODE,
        count: 6,
        data: [
          {
            id: 1,
            order: 931908486926541123,
            legal_person: "陈先生",
            dev_id: 3371,
            mode: 2,
            state: 0,
            mid: 1,
            remarks: "",
            time: 1585040341,
            name: "套餐一",
            money: 600,
            number: 1000
          },
          {
            id: 2,
            order: 931908486926541124,
            legal_person: "李先生",
            dev_id: 3372,
            mode: 3,
            state: 0,
            mid: 2,
            remarks: "",
            time: 1585040341,
            name: "套餐二",
            money: 800,
            number: 1500
          },
          {
            id: 3,
            order: 931908486926541125,
            legal_person: "王先生",
            dev_id: 3373,
            mode: 1,
            state: 1,
            mid: 1,
            remarks: "",
            time: 1585040341,
            name: "套餐一",
            money: 600,
            number: 1000
          },
          {
            id: 4,
            order: 931908486926541126,
            legal_person: "叶先生",
            dev_id: 3374,
            mode: 2,
            state: 1,
            mid: 3,
            remarks: "",
            time: 1585040341,
            name: "套餐三",
            money: 1000,
            number: 2000
          },
          {
            id: 5,
            order: 931908486926541126,
            legal_person: "黄先生",
            dev_id: 3375,
            mode: 3,
            state: 0,
            mid: 1,
            remarks: "",
            time: 1585040341,
            name: "套餐一",
            money: 600,
            number: 1000
          },
          {
            id: 6,
            order: 931908486926541127,
            legal_person: "张先生",
            dev_id: 3376,
            mode: 3,
            state: 1,
            mid: 1,
            remarks: "",
            time: 1585040341,
            name: "套餐一",
            money: 600,
            number: 1000
          }
        ]
      })
    );
  });
});

//订单添加
router.post("/recharge_add", (req, res) => {
  Mock.deferred(100, 1000, () => {
    res.json(
      Mock.mock({
        code: req.body ? code.SUCCESS_CODE : code.ERROR_CODE
      })
    );
  });
});

//订单审核
router.post("/recharge_audit", (req, res) => {
  Mock.deferred(100, 1000, () => {
    res.json(
      Mock.mock({
        code: req.body.order_id ? code.SUCCESS_CODE : code.ERROR_CODE
      })
    );
  });
});

//套餐列表
router.post("/meal_list", (req, res) => {
  Mock.deferred(100, 1000, () => {
    res.json(
      Mock.mock({
        code: code.SUCCESS_CODE,
        count: 3,
        data: [
          { meal_id: 1, name: "套餐一", money: 600, number: 1000 },
          { meal_id: 2, name: "套餐二", money: 800, number: 1500 },
          { meal_id: 3, name: "套餐三", money: 1000, number: 2000 }
        ]
      })
    );
  });
});

//套餐添加
router.post("/meal_add", (req, res) => {
  Mock.deferred(100, 1000, () => {
    res.json(
      Mock.mock({
        code: req.body ? code.SUCCESS_CODE : code.ERROR_CODE
      })
    );
  });
});

//套餐编辑
router.post("/meal_edit", (req, res) => {
  Mock.deferred(100, 1000, () => {
    res.json(
      Mock.mock({
        code: req.body ? code.SUCCESS_CODE : code.ERROR_CODE
      })
    );
  });
});

//套餐删除
router.post("/meal_del", (req, res) => {
  Mock.deferred(100, 1000, () => {
    res.json(
      Mock.mock({
        code: req.body.id ? code.SUCCESS_CODE : code.ERROR_CODE
      })
    );
  });
});

module.exports = router;
