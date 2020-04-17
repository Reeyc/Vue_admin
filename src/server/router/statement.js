const { router, Mock, code } = require("../common");

/**
 * Mock
 */

const getDay = require("../../assets/js/getDay");

const scenarioList = [
  "三亚站",
  "海口东站",
  "凤凰机场站",
  "海口站",
  "陵水站",
  "美兰站",
  "老城站",
  "福山站",
  "琼海站",
  "博鳌站",
  "神州站",
  "亚龙湾站",
  "崖州站",
  "乐东站",
  "尖峰站",
  "金月湾站",
  "东方站",
  "棋子湾站",
  "海头站",
  "临高站"
];

const macList = [
  "c0-2e-25-49-ef-7f",
  "34-12-f9-70-5d-6f",
  "6c-ab-31-e4-48-98",
  "98-9c-57-58-26-8a",
  "08-31-8b-3f-db-dc",
  "04-39-0b-3d-da-cf",
  "cc-66-0a-e1-48-ea"
];

const weekDay = [];
const oneResult = { PV: [], UV: [] };
const twoResult = { PV: [], UV: [] };
const getData = () => {
  let weekCount = 7;
  while (weekCount > 0) {
    weekDay.push(getDay(weekCount));
    oneResult.PV.push(Mock.Random.integer(200, 500));
    twoResult.PV.push(Mock.Random.integer(200, 500));
    oneResult.UV.push(Mock.Random.integer(50, 100));
    twoResult.UV.push(Mock.Random.integer(50, 100));
    weekCount--;
  }
};
getData();

/**
 * End
 */

//设备列表
router.post("/scene_list", (req, res) => {
  const { tp_id } = req.body;
  const one_scene = [
    { dev_id: 4992, name: "海口东站", tp_id: 1 },
    { dev_id: 4971, name: "陵水站", tp_id: 1 },
    { dev_id: 4993, name: "美兰站", tp_id: 1 },
    { dev_id: 4972, name: "海口站", tp_id: 1 },
    { dev_id: 4994, name: "琼海站", tp_id: 1 },
    { dev_id: 4991, name: "文昌站", tp_id: 1 },
    { dev_id: 2443, name: "神州站", tp_id: 1 },
    { dev_id: 4995, name: "三亚站", tp_id: 1 },
    { dev_id: 2441, name: "博鳌站", tp_id: 1 },
    { dev_id: 2444, name: "万宁站", tp_id: 1 },
    { dev_id: 2442, name: "亚龙湾站", tp_id: 1 }
  ];
  const two_scene = [{ dev_id: 3371, name: "星巴克", tp_id: 2 }];
  Mock.deferred(100, 1000, () => {
    if (tp_id == 1) {
      res.json(Mock.mock({ code: code.SUCCESS_CODE, data: one_scene }));
    } else if (tp_id == 2) {
      res.json(Mock.mock({ code: code.SUCCESS_CODE, data: two_scene }));
    } else {
      res.json(Mock.mock({ code: code.SUCCESS_CODE, data: [...one_scene, ...two_scene] }));
    }
  });
});

//历史用户（2年内）
router.post("/user_list", (req, res) => {
  const dataLen = `data|${req.body.limit}`;
  Mock.deferred(100, 1000, () => {
    res.json(
      Mock.mock({
        code: code.SUCCESS_CODE,
        count: 54457,
        [dataLen]: [
          {
            "id|+1": 1,
            phone: /^1[3578][1-9]\d{8}/,
            "mac|1": macList,
            "scenario|1": scenarioList,
            login_count: function() {
              return Mock.mock("@integer(10, 1000)");
            },
            login_time: function() {
              const now = new Date().getTime() / 1000;
              return now - Mock.mock("@integer(1, 63072000)");
            }
          }
        ]
      })
    );
  });
});

//场景分类 - 一类场景（2年内）
router.post("/rail_list", (req, res) => {
  const dataLen = `data|${req.body.limit}`;
  Mock.deferred(100, 1000, () => {
    res.json(
      Mock.mock({
        code: code.SUCCESS_CODE,
        count: 34439,
        [dataLen]: [
          {
            "id|+1": 1,
            phone: /^1[3578][1-9]\d{8}/,
            "mac|1": macList,
            "scenario|1": scenarioList,
            login_count: function() {
              return Mock.mock("@integer(10, 1000)");
            },
            login_time: function() {
              const now = new Date().getTime() / 1000;
              return now - Mock.mock("@integer(1, 63072000)");
            }
          }
        ]
      })
    );
  });
});

//场景分类 - 二类场景（2年内）
router.post("/mct_list", (req, res) => {
  const dataLen = `data|${req.body.limit}`;
  Mock.deferred(100, 1000, () => {
    res.json(
      Mock.mock({
        code: code.SUCCESS_CODE,
        count: 20018,
        [dataLen]: [
          {
            "id|+1": 1,
            phone: /^1[3578][1-9]\d{8}/,
            "mac|1": macList,
            "scenario|1": scenarioList,
            login_count: function() {
              return Mock.mock("@integer(10, 1000)");
            },
            login_time: function() {
              const now = new Date().getTime() / 1000;
              return now - Mock.mock("@integer(1, 63072000)");
            }
          }
        ]
      })
    );
  });
});

//场景分类 - 一类场景图表
router.post("/login_rail", (req, res) => {
  Mock.deferred(100, 1000, () => {
    res.json(
      Mock.mock({
        code: code.SUCCESS_CODE,
        d: {
          day: weekDay,
          pv: oneResult.PV,
          uv: oneResult.UV
        }
      })
    );
  });
});

//场景分类 - 二类场景图表
router.post("/login_mct", (req, res) => {
  Mock.deferred(100, 1000, () => {
    res.json(
      Mock.mock({
        code: code.SUCCESS_CODE,
        d: {
          day: weekDay,
          pv: twoResult.PV,
          uv: twoResult.UV
        }
      })
    );
  });
});

//在线用户（半小时内）
router.post("/online_list", (req, res) => {
  const dataLen = `data|${req.body.limit}`;
  Mock.deferred(100, 1000, () => {
    res.json(
      Mock.mock({
        code: code.SUCCESS_CODE,
        count: 31,
        [dataLen]: [
          {
            "id|+1": 1,
            phone: /^1[3578][1-9]\d{8}/,
            "mac|1": macList,
            "scenario|1": scenarioList,
            login_time: function() {
              const now = new Date().getTime() / 1000;
              return now - Mock.mock("@integer(1, 1800)");
            }
          }
        ]
      })
    );
  });
});

//离线用户（今天内半小时前）
router.post("/offline_list", (req, res) => {
  const dataLen = `data|${req.body.limit}`;
  Mock.deferred(100, 1000, () => {
    //今天0点
    const todayFirst = new Date(new Date().toLocaleDateString()).getTime() / 1000;
    //半小时前
    const frontHalfHour = Math.floor(new Date().getTime()) - 1000 * 60 * 60 * 0.5;
    res.json(
      Mock.mock({
        code: code.SUCCESS_CODE,
        count: 649,
        [dataLen]: [
          {
            "id|+1": 1,
            phone: /^1[3578][1-9]\d{8}/,
            "mac|1": macList,
            "scenario|1": scenarioList,
            login_time: function() {
              return Mock.Random.integer(todayFirst, new Date(frontHalfHour).getTime() / 1000);
            }
          }
        ]
      })
    );
  });
});

//离线设备
router.post("/offdev_list", (req, res) => {
  Mock.deferred(100, 1000, () => {
    res.json(
      Mock.mock({
        code: code.SUCCESS_CODE,
        count: 4,
        data: [
          {
            id: 1,
            dev_id: 2444,
            name: "万宁站",
            phone: "13597444851",
            address: "海南省万宁市环市二西路",
            tp_id: 1,
            ip: "static-201.64.21.14",
            ts: "2020-03-16 17:40:18",
            upt: "0d:13h:34m-2.3G/121.4M-3AP",
            city: "万宁"
          },
          {
            id: 2,
            dev_id: 2445,
            name: "白马井站",
            phone: "15444954621",
            address: "海南省儋州市环城东路",
            tp_id: 1,
            ip: "static-222.61.21.88",
            ts: "2020-03-16 17:40:18",
            upt: "0d:13h:34m-2.3G/121.4M-3AP",
            city: "儋州"
          },
          {
            id: 3,
            dev_id: 2446,
            name: "黄流站",
            phone: "13669548452",
            address: "海南省乐东县文化北路",
            tp_id: 1,
            ip: "static-265.31.29.08",
            ts: "2020-03-16 17:40:18",
            upt: "0d:13h:34m-2.3G/121.4M-3AP",
            city: "乐东"
          },
          {
            id: 4,
            dev_id: 2447,
            name: "银滩站",
            phone: "18665285101",
            address: "海南省儋州人民路",
            tp_id: 1,
            ip: "static-295.66.78.01",
            ts: "2020-03-16 17:40:18",
            upt: "0d:13h:34m-2.3G/121.4M-3AP",
            city: "儋州"
          }
        ]
      })
    );
  });
});

//一类明细（近7天）
router.post("/rail_detail", (req, res) => {
  const dataCount = req.body.type === "pv" ? 1448 : 898;
  const dataLen = `data|${req.body.limit}`;
  Mock.deferred(100, 1000, () => {
    res.json(
      Mock.mock({
        code: code.SUCCESS_CODE,
        count: dataCount,
        [dataLen]: [
          {
            "id|+1": 1,
            phone: /^1[3578][1-9]\d{8}/,
            "mac|1": macList,
            "scenario|1": scenarioList,
            login_time: function() {
              const now = new Date().getTime() / 1000;
              return now - Mock.mock("@integer(1, 604800)");
            }
          }
        ]
      })
    );
  });
});

//二类明细（近7天）
router.post("/mct_detail", (req, res) => {
  const dataCount = req.body.type === "pv" ? 1028 : 668;
  const dataLen = `data|${req.body.limit}`;
  Mock.deferred(100, 1000, () => {
    res.json(
      Mock.mock({
        code: code.SUCCESS_CODE,
        count: dataCount,
        [dataLen]: [
          {
            "id|+1": 1,
            phone: /^1[3578][1-9]\d{8}/,
            "mac|1": macList,
            "scenario|1": scenarioList,
            login_time: function() {
              const now = new Date().getTime() / 1000;
              return now - Mock.mock("@integer(1, 604800)");
            }
          }
        ]
      })
    );
  });
});

//接入明细
router.post("/login_record", (req, res) => {
  const { phone, mac, tp_id } = req.body;
  Mock.deferred(100, 1000, () => {
    if (!phone || !mac || !tp_id) {
      res.json({ code: code.ERROR_CODE });
    } else {
      res.json(
        Mock.mock({
          code: code.SUCCESS_CODE,
          count: 2,
          data: [
            {
              id: 202015,
              phone: "18246006545",
              login_time: 1585633829,
              login_type: 1,
              name: "三亚站"
            },
            {
              id: 202006,
              phone: "18246006545",
              login_time: 1585631864,
              login_type: 1,
              name: "三亚站"
            }
          ]
        })
      );
    }
  });
});

module.exports = router;
