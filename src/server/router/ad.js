const fs = require("fs");
const path = require("path");
const stringRandom = require("string-random");
const formdata = require("formidable");
const { router, Mock, code } = require("../common");

//广告列表
router.post("/ad_list", (req, res) => {
  Mock.deferred(500, 1500, () => {
    res.json(
      Mock.mock({
        code: code.SUCCESS_CODE,
        count: 10,
        data: [
          {
            id: 1,
            name: "地铁招商",
            pic: "ads/list_ad/07f7418720632c6ac46d39fe2029aad2.jpg",
            pic_url: "https://github.com/Reeyc",
            type: "c",
            tp_id: 1,
            alone: 0,
            submitter: "admin",
            time: 1584352578,
            time1: "00:00:00",
            time2: "23:59:59",
            time3: "2020-03-16",
            time4: "2022-03-16",
            code: "xs-2020-001",
            region: [4992, 4971, 4993, 4994, 4991, 2443, 4995, 2444, 2442],
            scene_name: ["海口东站", "陵水站", "美兰站", "琼海站", "文昌站", "神州站", "三亚站", "万宁站", "亚龙湾站"]
          },
          {
            id: 2,
            name: "保险",
            pic: "ads/list_ad/5257a7f07715a156b5cd6467e335edee.png",
            pic_url: "https://github.com/Reeyc",
            type: "c2",
            tp_id: 1,
            alone: 0,
            submitter: "admin",
            time: 1577073249,
            time1: "00:00:00",
            time2: "23:59:59",
            time3: "2000-01-01",
            time4: "2099-01-01",
            code: "xs-2020-002",
            region: "1",
            scene_name: "全场景"
          },
          {
            id: 3,
            name: "青岛啤酒",
            pic: "ads/list_ad/3b38bd1c7bb650d753ef5f412dd00164.png",
            pic_url: "https://github.com/Reeyc",
            type: "i",
            tp_id: 3,
            alone: 0,
            submitter: "admin",
            time: 1568907817,
            time1: "00:00:00",
            time2: "23:59:59",
            time3: "2000-01-01",
            time4: "2099-01-01",
            code: "xs-2020-003",
            region: "1",
            scene_name: "全场景"
          },
          {
            id: 4,
            name: "驴妈妈",
            pic: "ads/list_ad/6363207c43491a98fd0a9dcf0472c20c.jpg",
            pic_url: "https://github.com/Reeyc",
            type: "c5",
            tp_id: 1,
            alone: 0,
            submitter: "admin",
            time: 1568893593,
            time1: "00:00:00",
            time2: "23:59:59",
            time3: "2000-01-01",
            time4: "2099-01-01",
            code: "xs-2020-004",
            region: "1",
            scene_name: "全场景"
          },
          {
            id: 5,
            name: "饿了么",
            pic: "ads/list_ad/a0641b7f6ac274064f40be9175de0dee.png",
            pic_url: "https://github.com/Reeyc",
            type: "c4",
            tp_id: 1,
            alone: 0,
            submitter: "admin",
            time: 1568893378,
            time1: "00:00:00",
            time2: "23:59:59",
            time3: "2000-01-01",
            time4: "2099-01-01",
            code: "xs-2020-005",
            region: "1",
            scene_name: "全场景"
          },
          {
            id: 6,
            name: "海南",
            pic: "ads/list_ad/ebcb8c59e0f8367e359c69b250c28a4f.png",
            pic_url: "https://github.com/Reeyc",
            type: "c2",
            tp_id: 1,
            alone: 0,
            submitter: "admin",
            time: 1567821746,
            time1: "00:00:00",
            time2: "23:59:59",
            time3: "2000-01-01",
            time4: "2099-01-01",
            code: "xs-2020-006",
            region: "1",
            scene_name: "全场景"
          },
          {
            id: 7,
            name: "酒店",
            pic: "ads/list_ad/7941ed6ea64d8513085b9b32a7d0527d.png",
            pic_url: "https://github.com/Reeyc",
            type: "c2",
            tp_id: 1,
            alone: 0,
            submitter: "admin",
            time: 1567821705,
            time1: "00:00:00",
            time2: "23:59:59",
            time3: "2000-01-01",
            time4: "2099-01-01",
            code: "xs-2020-007",
            region: "1",
            scene_name: "全场景"
          },
          {
            id: 8,
            name: "青岛啤酒2",
            pic: "ads/list_ad/eaa60e0f737b26502303591256422184.jpg",
            pic_url: "https://github.com/Reeyc",
            type: "c",
            tp_id: 1,
            alone: 0,
            submitter: "admin",
            time: 1567820539,
            time1: "00:00:00",
            time2: "23:59:59",
            time3: "2000-01-01",
            time4: "2099-01-01",
            code: "xs-2020-008",
            region: [4992, 4993, 4994, 4991, 2443, 4995, 2441],
            scene_name: ["海口东站", "美兰站", "琼海站", "文昌站", "神州站", "三亚站", "博鳌站"]
          },
          {
            id: 9,
            name: "一汽大众",
            pic: "ads/list_ad/fbcc427545595f1edd626ff5539c56ea.jpg",
            pic_url: "https://github.com/Reeyc",
            type: "i",
            tp_id: 1,
            alone: 0,
            submitter: "admin",
            time: 1567820529,
            time1: "00:00:00",
            time2: "23:59:59",
            time3: "2000-01-01",
            time4: "2099-01-01",
            code: "xs-2020-009",
            region: [4992, 4971, 4993, 4972, 4994, 4991, 4995, 2441, 2444, 2442],
            scene_name: ["海口东站", "陵水站", "美兰站", "海口站", "琼海站", "文昌站", "三亚站", "博鳌站", "万宁站", "亚龙湾站"]
          },
          {
            id: 10,
            name: "奥迪",
            pic: "ads/list_ad/03b024d440b22e285a80c40daa3a5dc1.png",
            pic_url: "https://github.com/Reeyc",
            type: "i",
            tp_id: 3,
            alone: 0,
            submitter: "admin",
            time: 1567820499,
            time1: "00:00:00",
            time2: "23:59:59",
            time3: "2000-01-01",
            time4: "2099-01-01",
            code: "xs-2020-010",
            region: "1",
            scene_name: "全场景"
          }
        ]
      })
    );
  });
});

//广告审核列表
router.post("/check", (req, res) => {
  Mock.deferred(500, 1500, () => {
    res.json(
      Mock.mock({
        code: code.SUCCESS_CODE,
        count: 5,
        data: [
          {
            id: 1,
            name: "地铁招商",
            pic: "ads/check_ad/07f7418720632c6ac46d39fe2029aad2.jpg",
            pic_url: "http://www.xxx.com/xxx/xxx",
            type: "i",
            status: 2,
            tp_id: 1,
            alone: 0,
            submitter: "admin",
            time: 1586588824,
            time1: "00:00:00",
            time2: "23:59:59",
            time3: "2020-01-01",
            time4: "2020-12-31",
            remark: "",
            code: "xs-2020-001",
            scene_name: ["海口东站", "陵水站", "美兰站", "海口站", "琼海站", "文昌站", "三亚站", "博鳌站", "万宁站"],
            status_name: "经理审核"
          },
          {
            id: 2,
            name: "青岛啤酒",
            pic: "ads/check_ad/3b38bd1c7bb650d753ef5f412dd00164.png",
            pic_url: "http://www.xxx.com/xxx/xxx",
            type: "c",
            status: 2,
            tp_id: 2,
            alone: 0,
            submitter: "admin",
            time: 1586588824,
            time1: "00:00:00",
            time2: "23:59:59",
            time3: "2020-01-01",
            time4: "2020-09-30",
            remark: "",
            code: "xs-2020-002",
            scene_name: 0,
            status_name: "财务审核"
          },
          {
            id: 3,
            name: "一汽大众",
            pic: "ads/check_ad/fbcc427545595f1edd626ff5539c56ea.jpg",
            pic_url: "http://www.xxx.com/xxx/xxx",
            type: "c",
            status: 2,
            tp_id: 1,
            alone: 0,
            submitter: "admin",
            time: 1586588824,
            time1: "00:00:00",
            time2: "23:59:59",
            time3: "2020-01-01",
            time4: "2099-12-31",
            remark: "",
            code: "xs-2020-003",
            scene_name: ["海口东站", "陵水站", "美兰站", "海口站", "琼海站", "文昌站"],
            status_name: "财务审核"
          },
          {
            id: 4,
            name: "胡桃里",
            pic: "ads/check_ad/UjDbM2zrUfzIIURQ.jpg",
            pic_url: "http://www.xxx.com/xxx/xxx",
            type: "i",
            status: 2,
            tp_id: 1,
            alone: 0,
            submitter: "admin",
            time: 1586588824,
            time1: "00:00:00",
            time2: "23:59:59",
            time3: "2020-04-01",
            time4: "2020-09-30",
            remark: "",
            code: "xs-2020-004",
            scene_name: 0,
            status_name: "财务审核"
          },
          {
            id: 5,
            name: "饿了么",
            pic: "ads/check_ad/a0641b7f6ac274064f40be9175de0dee.png",
            pic_url: "http://www.xxx.com/xxx/xxx",
            type: "c4",
            status: 2,
            tp_id: 1,
            alone: 0,
            submitter: "admin",
            time: 1586588824,
            time1: "00:00:00",
            time2: "23:59:59",
            time3: "2020-02-01",
            time4: "2020-11-30",
            remark: "",
            code: "xs-2020-005",
            scene_name: 0,
            status_name: "经理审核"
          }
        ]
      })
    );
  });
});

//场景列表
router.post("/scene_detail", (req, res) => {
  Mock.deferred(100, 1000, () => {
    if (req.body.tp_id == 1) {
      res.json(
        Mock.mock({
          code: code.SUCCESS_CODE,
          data: [
            { dev_id: 4992, name: "海口东站" },
            { dev_id: 4971, name: "陵水站" },
            { dev_id: 4993, name: "美兰站" },
            { dev_id: 4972, name: "海口站" },
            { dev_id: 4994, name: "琼海站" },
            { dev_id: 4991, name: "文昌站" },
            { dev_id: 2443, name: "神州站" },
            { dev_id: 4995, name: "三亚站" },
            { dev_id: 2441, name: "博鳌站" },
            { dev_id: 2444, name: "万宁站" },
            { dev_id: 2442, name: "亚龙湾站" }
          ]
        })
      );
    } else {
      res.json(
        Mock.mock({
          code: code.SUCCESS_CODE,
          data: [{ dev_id: 3371, name: "星巴克" }]
        })
      );
    }
  });
});

//图片上传
router.post("/upload", (req, res) => {
  const form = new formdata.IncomingForm();
  form.uploadDir = path.join(__dirname, "../upload/ad/");
  form.parse(req, (err, fields, files) => {
    const name = stringRandom(16);
    const extname = path.extname(files.file.name);
    const newPath = form.uploadDir + name + extname;
    fs.rename(files.file.path, newPath, err => {
      if (err) throw err;
      res.json({ code: code.SUCCESS_CODE, file_name: name + extname });
    });
  });
});

//广告添加
router.post("/addad", (req, res) => {
  Mock.deferred(100, 1000, () => {
    res.json(
      Mock.mock({
        code: req.body ? code.SUCCESS_CODE : code.ERROR_CODE
      })
    );
  });
});

//广告审核
router.post("/do_check", (req, res) => {
  Mock.deferred(100, 1000, () => {
    res.json(
      Mock.mock({
        code: req.body.id && req.body.status ? code.SUCCESS_CODE : code.ERROR_CODE
      })
    );
  });
});

//广告编辑
router.post("/edit", (req, res) => {
  Mock.deferred(100, 1000, () => {
    res.json(
      Mock.mock({
        code: req.body.pid ? code.SUCCESS_CODE : code.ERROR_CODE
      })
    );
  });
});

//广告下刊
router.post("/xiakan", (req, res) => {
  Mock.deferred(100, 1000, () => {
    res.json(
      Mock.mock({
        code: req.body.id ? code.SUCCESS_CODE : code.ERROR_CODE
      })
    );
  });
});

//上刊广告统计明细
router.post("/detail", (req, res) => {
  Mock.deferred(1000, 2000, () => {
    res.json(
      Mock.mock({
        code: code.SUCCESS_CODE,
        count: 62799,
        data: [
          { show_count: 1, logintime: 1559610662, mac: "68-a3-c4-72-ff-32", scenario: "美兰机场站" },
          { show_count: 1, logintime: 1559610674, mac: "68-a3-c4-72-ff-32", scenario: "陵水站" },
          { show_count: 1, logintime: 1559610701, mac: "68-a3-c4-72-ff-32", scenario: "博鳌站" },
          { show_count: 1, logintime: 1559610709, mac: "68-a3-c4-72-ff-32", scenario: "陵水站" },
          { show_count: 2, logintime: 1559610712, mac: "68-a3-c4-72-ff-32", scenario: "凤凰机场" },
          { show_count: 2, logintime: 1559610717, mac: "8c-ec-4b-ab-58-8f", scenario: "凤凰机场" },
          { show_count: 1, logintime: 1559610777, mac: "1c-da-27-a4-f5-25", scenario: "琼海站" },
          { show_count: 1, logintime: 1559611112, mac: "c4-f0-81-06-1a-98", scenario: "博鳌站" },
          { show_count: 1, logintime: 1559611559, mac: "8c-ec-4b-ab-58-8f", scenario: "文昌站" },
          { show_count: 1, logintime: 1559611772, mac: "98-10-e8-b3-ff-1c", scenario: "海口东站" },
          { show_count: 1, logintime: 1559611840, mac: "74-d2-1d-b1-5d-d6", scenario: "海口东站" },
          { show_count: 1, logintime: 1559611873, mac: "00-9d-6b-25-af-56", scenario: "海口站" },
          { show_count: 1, logintime: 1559611887, mac: "7c-50-49-64-e4-68", scenario: "海口东站" },
          { show_count: 2, logintime: 1559611955, mac: "88-5a-06-49-28-b1", scenario: "陵水站" },
          { show_count: 2, logintime: 1559611992, mac: "74-d2-1d-b1-5d-d6", scenario: "海口东站" },
          { show_count: 1, logintime: 1559612292, mac: "38-a4-ed-d9-5b-18", scenario: "海口东站" },
          { show_count: 1, logintime: 1559612498, mac: "98-10-e8-b3-ff-1c", scenario: "海口东站" },
          { show_count: 1, logintime: 1559612595, mac: "f4-70-ab-9a-80-20", scenario: "海口东站" },
          { show_count: 1, logintime: 1559612684, mac: "90-c5-4a-e0-4a-c5", scenario: "琼海站" },
          { show_count: 2, logintime: 1559612692, mac: "90-c5-4a-e0-4a-c5", scenario: "琼海站" }
        ]
      })
    );
  });
});

//广告统计
router.post("/statement", (req, res) => {
  const { type } = req.body;
  const result =
    type !== "off"
      ? [
          { id: 1, name: "公益广告", pic: "ads/sta_ad/07f7418720632c6ac46d39fe2029aad2.jpg", show_count: 25321 },
          { id: 2, name: "保险", pic: "ads/sta_ad/5257a7f07715a156b5cd6467e335edee.png", show_count: 26541 },
          { id: 3, name: "图7", pic: "ads/sta_ad/3b38bd1c7bb650d753ef5f412dd00164.png", show_count: 29024 },
          { id: 4, name: "驴妈妈", pic: "ads/sta_ad/6363207c43491a98fd0a9dcf0472c20c.jpg", show_count: 22310 },
          { id: 5, name: "饿了么", pic: "ads/sta_ad/a0641b7f6ac274064f40be9175de0dee.png", show_count: 24023 },
          { id: 6, name: "海南", pic: "ads/sta_ad/ebcb8c59e0f8367e359c69b250c28a4f.png", show_count: 25610 },
          { id: 7, name: "酒店", pic: "ads/sta_ad/7941ed6ea64d8513085b9b32a7d0527d.png", show_count: 20521 },
          { id: 8, name: "图1", pic: "ads/sta_ad/eaa60e0f737b26502303591256422184.jpg", show_count: 22316 },
          { id: 9, name: "图5", pic: "ads/sta_ad/fbcc427545595f1edd626ff5539c56ea.jpg", show_count: 29103 },
          { id: 10, name: "图2", pic: "ads/sta_ad/03b024d440b22e285a80c40daa3a5dc1.png", show_count: 24503 }
        ]
      : [
          {
            id: 1,
            name: "招商",
            pic: "ads/off_ad/07f7418720632c6ac46d39fe2029aad2.jpg",
            pic_url: "https://github.com/Reeyc",
            type: "c",
            show_count: 943,
            tp_id: 3,
            region: "1",
            alone: 0,
            submitter: "admin",
            time: 1584094130,
            time1: "00:00:00",
            time2: "23:59:59",
            time3: "2020-03-13",
            time4: "2022-03-13",
            code: "xs-2019-077",
            is_lock: 0
          },
          {
            id: 2,
            name: "公益",
            pic: "ads/off_ad/5257a7f07715a156b5cd6467e335edee.png",
            pic_url: "https://github.com/Reeyc",
            type: "c2",
            show_count: 1282,
            tp_id: 3,
            region: "1",
            alone: 0,
            submitter: "admin",
            time: 1583746063,
            time1: "00:00:00",
            time2: "23:59:59",
            time3: "2020-03-09",
            time4: "2022-03-09",
            code: "xs-2019-078",
            is_lock: 0
          },
          {
            id: 3,
            name: "青岛啤酒",
            pic: "ads/off_ad/0ee8e150fb6dfe37d656ab90205ec848.jpg",
            pic_url: "https://github.com/Reeyc",
            type: "i",
            show_count: 41793,
            tp_id: 1,
            region: [4992, 4971, 4993, 4972, 4994, 4991, 4995, 2441, 2444, 2442],
            alone: 0,
            submitter: "admin",
            time: 1569556873,
            time1: "00:00:00",
            time2: "23:59:59",
            time3: "2019-01-01",
            time4: "2020-01-01",
            code: "xs-2019-079",
            is_lock: 1
          },
          {
            id: 4,
            name: "图9",
            pic: "ads/off_ad/a0641b7f6ac274064f40be9175de0dee.png",
            pic_url: "https://github.com/Reeyc",
            type: "c4",
            show_count: 132928,
            tp_id: 3,
            region: "1",
            alone: 0,
            submitter: "admin",
            time: 1567820695,
            time1: "00:00:00",
            time2: "23:59:59",
            time3: "2000-01-01",
            time4: "2099-01-01",
            code: "xs-2019-080",
            is_lock: 0
          },
          {
            id: 5,
            name: "图8",
            pic: "ads/off_ad/90e00f7836f4bc2581104016f37373cf.jpg",
            pic_url: "https://github.com/Reeyc",
            type: "c",
            show_count: 34306,
            tp_id: 1,
            region: [4992, 4971, 4993, 4972, 4995, 2441, 2444, 2442],
            alone: 0,
            submitter: "",
            time: 1567820534,
            time1: "00:00:00",
            time2: "23:59:59",
            time3: "2000-01-01",
            time4: "2099-01-01",
            code: "xs-2019-081",
            is_lock: 0
          }
        ];
  Mock.deferred(1000, 2000, () => {
    res.json(
      Mock.mock({
        code: code.SUCCESS_CODE,
        count: result.length,
        data: result
      })
    );
  });
});

//广告删除
router.post("/del", (req, res) => {
  Mock.deferred(100, 1000, () => {
    res.json(
      Mock.mock({
        code: req.body.id ? code.SUCCESS_CODE : code.ERROR_CODE
      })
    );
  });
});

module.exports = router;
