const { router, Mock, code } = require("../common");

//设备列表
router.post("/buss_list", (req, res) => {
  Mock.deferred(100, 1000, () => {
    res.json(
      Mock.mock({
        code: code.SUCCESS_CODE,
        count: 10,
        data: [
          {
            id: 26,
            dev_id: 4992,
            name: "海口东站",
            phone: "",
            address: "龙昆南路与凤翔西路交汇处",
            status: 1,
            tp_id: 1,
            ip: "static-222.61.16.178",
            ts: "2020-04-02 11:50:44",
            upt: "0d:7h:45m-603.9M/61.0M-10AP",
            area: "海口"
          },
          {
            id: 27,
            dev_id: 4971,
            name: "陵水站",
            phone: "",
            address: "椰林北大道269号",
            status: 0,
            tp_id: 1,
            ip: "static-222.61.21.90",
            ts: "2020-03-16 17:43:03",
            upt: "0d:13h:37m-3.7G/199.4M-3AP",
            area: "陵水"
          },
          {
            id: 28,
            dev_id: 4993,
            name: "美兰站",
            phone: "",
            address: "美兰国际机场对面",
            status: 0,
            tp_id: 1,
            ip: "static-222.61.21.85",
            ts: "2020-03-16 17:44:12",
            upt: "0d:13h:38m-3.1G/156.7M-7AP",
            area: "海口"
          },
          {
            id: 29,
            dev_id: 4972,
            name: "海口站",
            phone: "",
            address: "海口市秀英区粤海大道",
            status: 0,
            tp_id: 1,
            ip: "static-222.61.20.132",
            ts: "2020-03-06 11:54:11",
            upt: "0d:7h:48m-231.2M/17.6M-6AP",
            area: "海口"
          },
          {
            id: 30,
            dev_id: 4994,
            name: "琼海站",
            phone: "",
            address: "嘉积镇爱华东路",
            status: 0,
            tp_id: 1,
            ip: "static-222.61.21.92",
            ts: "2019-06-29 09:41:20",
            upt: "0d:5h:35m-1011.4M/67.2M-5AP",
            area: "琼海"
          },
          {
            id: 31,
            dev_id: 4991,
            name: "文昌站",
            phone: "",
            address: "文昌市文城镇火车站路",
            status: 0,
            tp_id: 1,
            ip: "static-222.61.21.86",
            ts: "2019-12-12 11:01:02",
            upt: "0d:6h:55m-668.3M/56.8M-3AP",
            area: "文昌"
          },
          {
            id: 32,
            dev_id: 2443,
            name: "神州站",
            phone: "",
            address: "万宁市礼纪镇98国道",
            status: 0,
            tp_id: 1,
            ip: "static-222.61.21.91",
            ts: "2020-03-16 17:43:58",
            upt: "0d:13h:38m-3.5G/189.3M-3AP",
            area: "万宁"
          },
          {
            id: 34,
            dev_id: 4995,
            name: "三亚站",
            phone: "",
            address: "吉阳区育秀路10号",
            status: 1,
            tp_id: 1,
            ip: "static-222.61.18.141",
            ts: "2020-04-02 11:54:49",
            upt: "0d:7h:49m-3.7G/280.8M-15AP",
            area: "三亚"
          },
          {
            id: 35,
            dev_id: 2441,
            name: "博鳌站",
            phone: "",
            address: "海市中原镇大锡村",
            status: 0,
            tp_id: 1,
            ip: "static-222.61.21.89",
            ts: "2020-01-09 18:14:24",
            upt: "0d:14h:08m-4.4G/239.2M-8AP",
            area: "琼海"
          }
        ]
      })
    );
  });
});

//设备类型
router.post("/buss_type_list", (req, res) => {
  Mock.deferred(100, 1000, () => {
    res.json(
      Mock.mock({
        code: code.SUCCESS_CODE,
        count: 2,
        data: [
          { id: 1, name: "一类场景" },
          { id: 2, name: "二类场景" }
        ]
      })
    );
  });
});

//类型添加
router.post("/do_buss_type_add", (req, res) => {
  Mock.deferred(100, 1000, () => {
    res.json(
      Mock.mock({
        code: req.body.name ? code.SUCCESS_CODE : code.ERROR_CODE
      })
    );
  });
});

//类型编辑
router.post("/do_buss_type_edit", (req, res) => {
  Mock.deferred(100, 1000, () => {
    res.json(
      Mock.mock({
        code: req.body.buss_id && req.body.name ? code.SUCCESS_CODE : code.ERROR_CODE
      })
    );
  });
});

module.exports = router;
