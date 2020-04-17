const { router, Mock, code } = require("../common");

const getDay = require("../../assets/js/getDay");

//获取场景值
const weekDay = [];
const monthDay = [];
const years = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];
const formerlyYears = [new Date().getFullYear() - 1, new Date().getFullYear()];
const getXValue = () => {
  let weekCount = -6;
  let monthCount = -29;
  while (weekCount < 1) {
    weekDay.push(getDay(weekCount));
    weekCount++;
  }
  while (monthCount < 1) {
    monthDay.push(getDay(monthCount));
    monthCount++;
  }
};
getXValue();

//获取数据
const PVResult = [];
const UVResult = [];
const YearPVResult = [];
const YearUVResult = [];
const getXData = () => {
  let count = 0;
  while (count < 30) {
    PVResult.push(Mock.Random.integer(200, 500));
    UVResult.push(Mock.Random.integer(50, 100));
    YearPVResult.push(Mock.Random.integer(1500, 5000));
    YearUVResult.push(Mock.Random.integer(100, 500));
    count++;
  }
};
getXData();

//在线/离线
router.post("/online_users", (req, res) => {
  Mock.deferred(1000, 1500, () => {
    res.json(
      Mock.mock({
        code: code.SUCCESS_CODE,
        data: {
          online: 666,
          offline: 188
        }
      })
    );
  });
});

//热门场景
router.post("/online_station", (req, res) => {
  Mock.deferred(1000, 1500, () => {
    res.json(
      Mock.mock({
        code: code.SUCCESS_CODE,
        data: [
          { name: "海口店", value: 100 },
          { name: "陵水店", value: 90 },
          { name: "美兰店", value: 80 },
          { name: "琼海店", value: 70 },
          { name: "文昌店", value: 60 },
          { name: "神州店", value: 50 },
          { name: "三亚店", value: 40 },
          { name: "博鳌店", value: 30 },
          { name: "万宁店", value: 20 },
          { name: "亚龙湾店", value: 10 }
        ]
      })
    );
  });
});

//场景汇总
router.post("/login_total", (req, res) => {
  Mock.deferred(1000, 1500, () => {
    res.json(
      Mock.mock({
        code: code.SUCCESS_CODE,
        data: {
          d: {
            day: weekDay,
            pv: PVResult.slice(0, 7),
            uv: UVResult.slice(0, 7)
          },
          m: {
            day: monthDay,
            pv: PVResult,
            uv: UVResult
          },
          y: {
            day: years,
            pv: YearPVResult.slice(0, 12),
            uv: YearUVResult.slice(0, 12)
          }
        }
      })
    );
  });
});

//一类场景
router.post("/login_one", (req, res) => {
  Mock.deferred(1000, 1500, () => {
    res.json(
      Mock.mock({
        code: code.SUCCESS_CODE,
        data: {
          d: {
            day: weekDay,
            pv: PVResult.slice(0, 7).map(item => Math.ceil(item / 2)),
            uv: UVResult.slice(0, 7).map(item => Math.ceil(item / 2))
          },
          m: {
            day: monthDay,
            pv: PVResult.map(item => Math.ceil(item / 2)),
            uv: UVResult.map(item => Math.ceil(item / 2))
          },
          y: {
            day: formerlyYears,
            pv: YearPVResult.slice(0, 2),
            uv: YearUVResult.slice(0, 2)
          }
        }
      })
    );
  });
});

//二类场景
router.post("/login_two", (req, res) => {
  Mock.deferred(1000, 1500, () => {
    res.json(
      Mock.mock({
        code: code.SUCCESS_CODE,
        data: {
          d: {
            day: weekDay,
            pv: PVResult.slice(0, 7).map(item => Math.ceil(item / 4)),
            uv: UVResult.slice(0, 7).map(item => Math.ceil(item / 4))
          },
          m: {
            day: monthDay,
            pv: PVResult.map(item => Math.ceil(item / 4)),
            uv: UVResult.map(item => Math.ceil(item / 4))
          },
          y: {
            day: formerlyYears,
            pv: YearPVResult.slice(0, 2),
            uv: YearUVResult.slice(0, 2)
          }
        }
      })
    );
  });
});

//登陆类型
router.post("/login_type", (req, res) => {
  Mock.deferred(1000, 1500, () => {
    res.json(
      Mock.mock({
        code: code.SUCCESS_CODE,
        data: {
          auto: Mock.Random.integer(5000, 10000),
          direct: Mock.Random.integer(500, 1000)
        }
      })
    );
  });
});

//地图设备
router.post("/online_map", (req, res) => {
  Mock.deferred(1000, 1500, () => {
    res.json(
      Mock.mock({
        code: code.SUCCESS_CODE,
        command: { name: "海口店", status: 1, ip: "222.61.16.178", upt: "12小时37分", value: 897, coords: [110.161461, 20.02744] },
        data: [
          { name: "陵水店", status: 1, ip: "222.61.21.90", upt: "13小时37分", value: 310, coords: [110.033396, 18.535868] },
          { name: "美兰店", status: 1, ip: "222.61.21.85", upt: "13小时38分", value: 564, coords: [110.532791, 19.940758] },
          { name: "琼海店", status: 1, ip: "222.61.21.92", upt: "5小时35分", value: 684, coords: [110.491326, 19.310309] },
          { name: "文昌店", status: 1, ip: "222.61.21.86", upt: "6小时55分", value: 784, coords: [110.737578, 19.606088] },
          { name: "神州店", status: 1, ip: "222.61.21.91", upt: "13小时38分", value: 855, coords: [110.30777, 18.691717] },
          { name: "三亚店", status: 1, ip: "222.61.18.141", upt: "12小时45分", value: 164, coords: [109.512866, 18.296346] },
          { name: "博鳌店", status: 1, ip: "222.61.21.89", upt: "14小时08分", value: 214, coords: [110.486734, 19.136195] },
          { name: "万宁店", status: 0, ip: "222.61.21.88", upt: "13小时34分", value: 0, coords: [110.381221, 18.850682] },
          { name: "亚龙湾店", status: 1, ip: "222.61.21.93", upt: "13小时38分", value: 540, coords: [109.692503, 18.302125] },
          { name: "凤凰机场店", status: 1, ip: "222.61.16.178", upt: "12小时37分", value: 897, coords: [109.314693, 18.303395] },
          { name: "崖州店", status: 1, ip: "222.61.16.178", upt: "12小时37分", value: 310, coords: [109.157599, 18.376103] },
          { name: "乐东店", status: 1, ip: "222.61.16.178", upt: "12小时37分", value: 564, coords: [108.939147, 18.445813] },
          { name: "黄流店", status: 0, ip: "222.61.16.178", upt: "12小时37分", value: 0, coords: [108.831268, 18.528414] },
          { name: "尖峰店", status: 1, ip: "222.61.21.90", upt: "12小时37分", value: 684, coords: [108.752478, 18.620812] },
          { name: "金月湾店", status: 1, ip: "222.61.21.85", upt: "12小时37分", value: 784, coords: [108.715065, 18.778563] },
          { name: "东方店", status: 1, ip: "222.61.20.132", upt: "12小时37分", value: 855, coords: [108.691224, 19.088709] },
          { name: "棋子湾店", status: 1, ip: "222.61.21.92", upt: "12小时37分", value: 164, coords: [108.807291, 19.337655] },
          { name: "海头店", status: 1, ip: "222.61.21.86", upt: "12小时37分", value: 214, coords: [108.993651, 19.494028] },
          { name: "白马井店", status: 0, ip: "222.61.21.91", upt: "12小时37分", value: 0, coords: [109.253828, 19.658956] },
          { name: "银滩店", status: 0, ip: "222.61.18.141", upt: "12小时37分", value: 0, coords: [109.489131, 19.790278] },
          { name: "临高店", status: 1, ip: "222.61.21.89", upt: "12小时37分", value: 897, coords: [109.758397, 19.868456] },
          { name: "福山店", status: 1, ip: "222.61.21.88", upt: "12小时37分", value: 310, coords: [109.980108, 19.773954] },
          { name: "老城店", status: 1, ip: "222.61.16.178", upt: "12小时37分", value: 564, coords: [110.117662, 19.912714] }
        ]
      })
    );
  });
});

//卡片数据
router.post("/card_data", (req, res) => {
  Mock.deferred(1000, 1500, () => {
    res.json(
      Mock.mock({
        code: code.SUCCESS_CODE,
        data: {
          users: 54457,
          users_pv: 201996,
          dev_sum: 24,
          online_dev: 20,
          merchants: 8
        }
      })
    );
  });
});

module.exports = router;
