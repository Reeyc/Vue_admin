import timeFormat from "js/timeFormat";

function adFormat(type) {
  switch (type) {
    case "i":
      return {
        tag: "",
        text: "首页曝光"
      };
    case "c":
      return {
        tag: "success",
        text: "登录轮播"
      };
    case "c2":
      return {
        tag: "info",
        text: "资讯页轮播"
      };
    case "c4":
      return {
        tag: "info",
        text: "资讯页卡片"
      };
    case "c5":
      return {
        tag: "info",
        text: "生活页卡片"
      };
  }
}

function timeFrame(time1, time2) {
  if (time1 === "00:00:00" && time2 === "00:00:00") {
    return "全天";
  } else if (time1 === "00:00:00" && time2 === "23:59:59") {
    return "全天";
  } else {
    return time1 + " - " + time2;
  }
}

function voucherFormet(key) {
  switch (key) {
    case 1:
      return {
        tag: "info",
        text: "银联"
      };
    case 2:
      return {
        tag: "success",
        text: "支付宝"
      };
    case 3:
      return {
        tag: "",
        text: "微信"
      };
  }
}

function voucherStateFormet(key) {
  switch (key) {
    case 0:
      return {
        tag: "warning",
        text: "待审"
      };
    case 1:
      return {
        tag: "success",
        text: "成功"
      };
    case 2:
      return {
        tag: "danger",
        text: "失败"
      };
  }
}

export const deviceList = [
  {
    label: "设备ID",
    prop: "dev_id",
    width: "80"
  },
  {
    label: "名称",
    prop: "name",
    width: "100"
  },
  {
    label: "类型",
    width: "100",
    render: (h, scope) => {
      return h(
        "el-tag",
        {
          props: {
            size: "medium",
            effect: "dark",
            type: scope.row.tp_id === 1 ? "success" : ""
          }
        },
        scope.row.tp_id === 1 ? "一类场景" : "二类场景"
      );
    }
  },
  {
    label: "IP",
    prop: "ip",
    width: "200"
  },
  {
    label: "最新在线时间",
    prop: "ts",
    width: "200"
  },
  {
    label: "在线时长",
    prop: "upt",
    width: "260"
  },
  {
    label: "联系电话",
    prop: "phone",
    width: "140"
  },
  {
    label: "地区",
    prop: "area",
    width: "100"
  },
  {
    label: "地址",
    prop: "address",
    showOverflowTooltip: true
  },
  {
    label: "状态",
    width: "100",
    render: (h, scope) => {
      return h(
        "el-tag",
        {
          props: {
            size: "medium",
            effect: "dark",
            type: scope.row.status === 0 ? "danger" : ""
          }
        },
        scope.row.status === 0 ? "离线" : "在线"
      );
    }
  }
];

export const deviceType = [
  {
    label: "类别名称",
    prop: "name"
  },
  {
    label: "操作",
    render: (h, scope) => {
      return h(
        "el-button",
        {
          props: {
            size: "mini",
            type: "primary"
          },
          on: {
            click() {
              scope.vm.open("edit", scope.row);
            }
          }
        },
        "编辑"
      );
    }
  }
];

export const adList = [
  {
    label: "品牌名称",
    prop: "name",
    fixed: "left",
    showOverflowTooltip: true
  },
  {
    label: "投放类型",
    width: "120",
    render: (h, scope) => {
      return h(
        "el-tag",
        {
          props: {
            size: "medium",
            type: adFormat(scope.row.type)["tag"]
          }
        },
        adFormat(scope.row.type)["text"]
      );
    }
  },
  {
    label: "投放图片",
    render: (h, scope) => {
      return h("img", {
        class: ["toPreview"],
        attrs: {
          src: scope.row.showPic
        }
      });
    }
  },
  {
    label: "是否冠名",
    width: "80",
    render: (h, scope) => {
      return h("span", null, scope.row.alone === 1 ? "是" : "否");
    }
  },
  {
    label: "投放场景",
    width: "110",
    render: (h, scope) => {
      if (!Array.isArray(scope.row.scene_name)) {
        return h("span", null, "所有场景");
      }
      const result = scope.row.scene_name.map(item => {
        return h("el-dropdown-item", null, item);
      });
      return h(
        "el-dropdown",
        {
          props: { trigger: "click" }
        },
        [
          h("span", { class: ["el-dropdown-link"] }, "查看详情"),
          h(
            "el-dropdown-menu",
            {
              props: { slot: "dropdown" }
            },
            result
          )
        ]
      );
    }
  },
  {
    label: "有效期",
    width: "200",
    render: (h, scope) => {
      return h("span", null, scope.row.time3 + " 至 " + scope.row.time4);
    }
  },
  {
    label: "时段",
    width: "200",
    render: (h, scope) => {
      return h("span", null, timeFrame(scope.row.time1, scope.row.time2));
    }
  },
  {
    label: "提交者",
    prop: "submitter",
    width: "120"
  },
  {
    label: "上刊时间",
    width: "180",
    render: (h, scope) => {
      return h("span", null, timeFormat(scope.row.time * 1000, true));
    }
  },
  {
    label: "合同编号",
    prop: "code",
    showOverflowTooltip: true
  },
  {
    label: "操作",
    width: "280",
    render: (h, scope) => {
      return h("div", [
        h(
          "el-button",
          {
            props: {
              type: "primary",
              size: "small",
              icon: "el-icon-view"
            },
            on: {
              click: event => {
                event.stopPropagation();
                scope.vm.onPreview(scope.row.showPic);
              }
            }
          },
          "大图预览"
        ),
        h(
          "el-button",
          {
            props: {
              type: "warning",
              size: "small",
              disabled: scope.vm.userInfo.group_id !== 1
            },
            on: {
              click: event => {
                event.stopPropagation();
                scope.vm.edit(scope.row);
              }
            }
          },
          "编辑"
        ),
        h(
          "el-button",
          {
            props: {
              type: "danger",
              size: "small",
              disabled: scope.vm.userInfo.group_id !== 1
            },
            on: {
              click: event => {
                event.stopPropagation();
                scope.vm.xiakan(scope.row);
              }
            }
          },
          "下刊"
        )
      ]);
    }
  }
];

export const adAuditList = [
  {
    label: "品牌名称",
    prop: "name",
    showOverflowTooltip: true
  },
  {
    label: "投放类型",
    width: "120",
    render: (h, scope) => {
      return h(
        "el-tag",
        {
          props: {
            size: "medium",
            type: adFormat(scope.row.type)["tag"]
          }
        },
        adFormat(scope.row.type)["text"]
      );
    }
  },
  {
    label: "投放图片",
    render: (h, scope) => {
      return h("img", {
        class: ["toPreview"],
        attrs: {
          src: scope.row.showPic
        }
      });
    }
  },
  {
    label: "是否冠名",
    render: (h, scope) => {
      return h("span", null, scope.row.alone === 1 ? "是" : "否");
    }
  },
  {
    label: "投放场景",
    width: "100",
    render: (h, scope) => {
      if (!Array.isArray(scope.row.scene_name)) {
        return h("span", null, "所有场景");
      }
      const result = scope.row.scene_name.map(item => {
        return h("el-dropdown-item", null, item);
      });
      return h(
        "el-dropdown",
        {
          props: { trigger: "click" }
        },
        [
          h("span", { class: ["el-dropdown-link"] }, "查看详情"),
          h(
            "el-dropdown-menu",
            {
              props: { slot: "dropdown" }
            },
            result
          )
        ]
      );
    }
  },
  {
    label: "有效期",
    width: "220",
    render: (h, scope) => {
      return h("span", null, scope.row.time3 + " 至 " + scope.row.time4);
    }
  },
  {
    label: "提交者",
    prop: "submitter",
    width: "120"
  },
  {
    label: "提交时间",
    width: "200",
    render: (h, scope) => {
      return h("span", null, timeFormat(scope.row.time * 1000, true));
    }
  },
  {
    label: "审核状态",
    width: "120",
    render: (h, scope) => {
      const isRefuse = scope.row.status === 5;
      return h("div", [
        h(
          "el-tag",
          {
            props: {
              size: "medium",
              type: isRefuse ? "danger" : scope.row.status === 2 ? "success" : ""
            }
          },
          scope.row.status_name
        ),
        h(
          "el-tooltip",
          {
            style: {
              display: isRefuse ? "inline-block" : "none"
            },
            props: {
              content: scope.row.remark || "未填写原因",
              placement: "bottom"
            }
          },
          [
            h(
              "el-button",
              {
                props: { type: "text", size: "small" }
              },
              "查看原因"
            )
          ]
        )
      ]);
    }
  },
  {
    label: "合同编号",
    prop: "code",
    width: "120",
    showOverflowTooltip: true
  },
  {
    label: "操作",
    width: "220",
    fixed: "right",
    render: (h, scope) => {
      const isSalesman = scope.vm.userInfo.group_id === 4;
      const isRefuse = scope.row.status === 5;
      return h("div", [
        h(
          "el-button",
          {
            props: {
              type: "primary",
              size: "small",
              icon: "el-icon-view"
            },
            on: {
              click: event => {
                event.stopPropagation();
                scope.vm.onPreview(scope.row.showPic);
              }
            }
          },
          "大图预览"
        ),
        h(
          "el-button",
          {
            style: { display: !isSalesman ? "inline-block" : "none" },
            props: { type: "primary", size: "small" },
            on: {
              click: event => {
                event.stopPropagation();
                scope.vm.onAudit(scope.row);
              }
            }
          },
          "去审核"
        ),
        h(
          "el-button",
          {
            style: { display: isSalesman ? "inline-block" : "none" },
            props: { type: "danger", size: "small", disabled: !isRefuse },
            on: {
              click: event => {
                event.stopPropagation();
                scope.vm.edit(scope.row);
              }
            }
          },
          "编辑"
        )
      ]);
    }
  }
];

export const adStatement = [
  {
    label: "品牌名称",
    prop: "name",
    showOverflowTooltip: true
  },
  {
    label: "广告图片",
    render: (h, scope) => {
      return h("img", {
        class: ["toPreview"],
        attrs: {
          src: scope.row.pic
        }
      });
    }
  },
  {
    label: "曝光次数",
    prop: "show_count"
  },
  {
    label: "曝光占比",
    prop: "ratio"
  },
  {
    label: "操作",
    width: "250",
    render: (h, scope) => {
      return h("div", [
        h(
          "el-button",
          {
            props: {
              type: "primary",
              size: "small",
              icon: "el-icon-view"
            },
            on: {
              click: event => {
                event.stopPropagation();
                scope.vm.onPreview(scope.row.pic);
              }
            }
          },
          "大图预览"
        ),
        h(
          "el-button",
          {
            props: {
              type: "primary",
              size: "small"
            },
            on: {
              click: event => {
                event.stopPropagation();
                scope.vm.openDetail(scope.row);
              }
            }
          },
          "查看详情"
        )
      ]);
    }
  }
];

export const adStatementXK = [
  {
    label: "品牌名称",
    prop: "name",
    showOverflowTooltip: true
  },
  {
    label: "分类",
    width: "120",
    render: (h, scope) => {
      return h(
        "el-tag",
        {
          props: {
            size: "medium",
            type: adFormat(scope.row.type)["tag"]
          }
        },
        adFormat(scope.row.type)["text"]
      );
    }
  },
  {
    label: "广告图片",
    render: (h, scope) => {
      return h("img", {
        class: ["toPreview"],
        attrs: {
          src: scope.row.showPic
        }
      });
    }
  },
  {
    label: "下刊方式",
    width: "120",
    render: (h, scope) => {
      return h(
        "el-tag",
        {
          props: {
            type: scope.row.is_lock === 1 ? "warning" : "danger"
          }
        },
        scope.row.is_lock === 1 ? "到期下刊" : "人为下刊"
      );
    }
  },
  {
    label: "曝光次数",
    prop: "show_count"
  },
  {
    label: "操作",
    width: "280",
    render: (h, scope) => {
      return h("div", [
        h(
          "el-button",
          {
            props: {
              type: "primary",
              size: "small",
              icon: "el-icon-view"
            },
            on: {
              click: event => {
                event.stopPropagation();
                scope.vm.onPreview(scope.row.showPic);
              }
            }
          },
          "大图预览"
        ),
        h(
          "el-button",
          {
            props: {
              type: "warning",
              size: "small",
              disabled: scope.vm.userInfo.group_id > 2
            },
            on: {
              click: event => {
                event.stopPropagation();
                scope.vm.edit(scope.row);
              }
            }
          },
          "编辑"
        ),
        h(
          "el-button",
          {
            props: {
              type: "danger",
              size: "small",
              disabled: scope.vm.userInfo.group_id > 2
            },
            on: {
              click: event => {
                event.stopPropagation();
                scope.vm.del(scope.row);
              }
            }
          },
          "删除"
        )
      ]);
    }
  }
];

export const marchantList = [
  {
    label: "商家名称",
    prop: "company",
    width: "140",
    showOverflowTooltip: true,
    fixed: "left"
  },
  {
    label: "场景",
    width: "100",
    showOverflowTooltip: true,
    render: (h, scope) => {
      return h(
        "el-tag",
        {
          props: {
            size: "medium",
            type: scope.row.tp_id === 1 ? "success" : ""
          }
        },
        scope.row.tp_id === 1 ? "一类场景" : "二类场景"
      );
    }
  },
  {
    label: "法人",
    prop: "legal_person",
    width: "100",
    showOverflowTooltip: true
  },
  {
    label: "管理员",
    prop: "realname",
    width: "100",
    showOverflowTooltip: true
  },
  {
    label: "管理员手机",
    prop: "phone",
    width: "120",
    showOverflowTooltip: true
  },
  {
    label: "商家地址",
    prop: "address",
    showOverflowTooltip: true
  },
  {
    label: "信息审核",
    width: "90",
    showOverflowTooltip: true,
    render: (h, scope) => {
      return h(
        "el-tag",
        {
          props: {
            size: "medium",
            type: voucherStateFormet(scope.row.state).tag
          }
        },
        voucherStateFormet(scope.row.state).text
      );
    }
  },
  {
    label: "登录审核",
    width: "90",
    showOverflowTooltip: true,
    render: (h, scope) => {
      return h(
        "el-tag",
        {
          props: {
            size: "medium",
            type: voucherStateFormet(scope.row.status).tag
          }
        },
        voucherStateFormet(scope.row.status).text
      );
    }
  },
  {
    label: "申请时间",
    showOverflowTooltip: true,
    render: (h, scope) => {
      return h("span", null, timeFormat(scope.row.time * 1000, true));
    }
  },
  {
    label: "操作",
    width: "440",
    render: (h, scope) => {
      //未锁定
      const noLock = scope.row.login_status !== 1;
      //已审核
      const checked = scope.row.state === 1 && scope.row.status === 1;
      //未锁定 + 已审核
      const noLockAndChecked = noLock && checked;
      //未锁定 + 未审核
      const noLockAndNoChecked = noLock && !checked;
      //二类场景 + 已认证
      const isTwoAndVIP = scope.row.tp_id === 2 && scope.row.is_vip === 0;
      //二类场景 + 未认证
      const isTwoAndNoVIP = scope.row.tp_id === 2 && scope.row.is_vip !== 0;

      return h("div", [
        h(
          "el-button",
          {
            style: {
              display: noLock ? "inline-block" : "none"
            },
            props: {
              type: "primary",
              size: "small"
            },
            on: {
              click() {
                scope.vm.toggleScene(scope.row);
              }
            }
          },
          "场景"
        ),
        h(
          "el-button",
          {
            style: {
              display: noLock ? "inline-block" : "none"
            },
            props: {
              type: "primary",
              size: "small"
            },
            on: {
              click() {
                scope.vm.openPassword(scope.row);
              }
            }
          },
          "修改密码"
        ),
        h(
          "el-button",
          {
            style: {
              display: noLockAndChecked ? "inline-block" : "none"
            },
            props: {
              type: "primary",
              size: "small"
            },
            on: {
              click() {
                scope.vm.toLoing(scope.row);
              }
            }
          },
          "去登陆"
        ),
        h(
          "el-button",
          {
            style: {
              display: noLockAndNoChecked ? "inline-block" : "none"
            },
            attrs: { "loading-index": scope.index },
            props: {
              type: "primary",
              size: "small",
              loading: scope.vm.auditLoading == scope.index
            },
            on: {
              click($event) {
                if ($event.target.tagName.toLowerCase() === "span") {
                  scope.vm.open(1, scope.row, $event.target.parentNode);
                } else {
                  scope.vm.open(1, scope.row, $event.target);
                }
              }
            }
          },
          "去审核"
        ),
        h(
          "el-button",
          {
            style: { display: noLockAndChecked && isTwoAndVIP ? "inline-block" : "none" },
            attrs: { "loading-index": scope.index },
            props: {
              type: "warning",
              size: "small",
              loading: scope.vm.tovipLoading == scope.index
            },
            on: {
              click($event) {
                if ($event.target.tagName.toLowerCase() === "span") {
                  scope.vm.beToVIP(scope.row, 0, $event.target.parentNode);
                } else {
                  scope.vm.beToVIP(scope.row, 0, $event.target);
                }
              }
            }
          },
          "认证"
        ),
        h(
          "el-button",
          {
            style: { display: noLockAndChecked && isTwoAndNoVIP ? "inline-block" : "none" },
            attrs: { "loading-index": scope.index },
            props: {
              type: "warning",
              size: "small",
              loading: scope.vm.recusalLoading == scope.index
            },
            on: {
              click($event) {
                if ($event.target.tagName.toLowerCase() === "span") {
                  scope.vm.beToVIP(scope.row, 1, $event.target.parentNode);
                } else {
                  scope.vm.beToVIP(scope.row, 1, $event.target);
                }
              }
            }
          },
          "取消认证"
        ),
        h(
          "el-button",
          {
            style: { display: !noLock ? "inline-block" : "none" },
            attrs: { "loading-index": scope.index },
            props: {
              type: "success",
              size: "small",
              loading: scope.vm.recoverLoading == scope.index
            },
            on: {
              click($event) {
                if ($event.target.tagName.toLowerCase() === "span") {
                  scope.vm.lock(scope.row, 0, $event.target.parentNode);
                } else {
                  scope.vm.lock(scope.row, 0, $event.target);
                }
              }
            }
          },
          "恢复"
        ),
        h(
          "el-button",
          {
            style: { display: noLock ? "inline-block" : "none" },
            attrs: { "loading-index": scope.index },
            props: {
              type: "danger",
              size: "small",
              loading: scope.vm.lockLoading == scope.index
            },
            on: {
              click($event) {
                if ($event.target.tagName.toLowerCase() === "span") {
                  scope.vm.lock(scope.row, 1, $event.target.parentNode);
                } else {
                  scope.vm.lock(scope.row, 1, $event.target);
                }
              }
            }
          },
          "锁定"
        )
      ]);
    }
  }
];

export const voucher = [
  {
    label: "订单",
    prop: "order",
    showOverflowTooltip: true
  },
  {
    label: "法人",
    prop: "legal_person"
  },
  {
    label: "设备ID",
    prop: "dev_id",
    width: "150"
  },
  {
    label: "套餐",
    width: "300",
    render: (h, scope) => {
      return h("span", null, `${scope.row.name} / ${scope.row.money}元 / ${scope.row.number}条短信`);
    }
  },
  {
    label: "充值时间",
    width: "250",
    render: (h, scope) => {
      return h("span", null, timeFormat(scope.row.time * 1000, true));
    }
  },
  {
    label: "充值方式",
    width: "200",
    render: (h, scope) => {
      return h(
        "el-tag",
        {
          props: {
            size: "medium",
            type: voucherFormet(scope.row.mode).tag
          }
        },
        voucherFormet(scope.row.mode).text
      );
    }
  },
  {
    label: "充值状态",
    width: "200",
    render: (h, scope) => {
      return h(
        "el-tag",
        {
          props: {
            size: "medium",
            type: voucherStateFormet(scope.row.state).tag
          }
        },
        voucherStateFormet(scope.row.state).text
      );
    }
  },
  {
    label: "操作",
    width: "150",
    fixed: "right",
    render: (h, scope) => {
      if (scope.row.state === 1) {
        return h("span", null, "/");
      }
      return h(
        "el-button",
        {
          props: {
            size: "small",
            type: "primary"
          },
          on: {
            click() {
              scope.vm.doCheck(scope.row);
            }
          }
        },
        "去审核"
      );
    }
  }
];

export const mealList = [
  {
    label: "套餐名称",
    prop: "name"
  },
  {
    label: "套餐价格",
    prop: "money"
  },
  {
    label: "短信数量",
    prop: "number"
  },
  {
    label: "操作",
    width: "300",
    render: (h, scope) => {
      return h("div", [
        h(
          "el-button",
          {
            props: {
              size: "small",
              type: "primary"
            },
            on: {
              click() {
                scope.vm.editOpen(scope.row);
              }
            }
          },
          "编辑"
        ),
        h(
          "el-button",
          {
            attrs: { "loading-index": scope.index },
            props: {
              size: "small",
              type: "danger",
              loading: scope.vm.delLoading == scope.index
            },
            on: {
              click($event) {
                if ($event.target.tagName.toLowerCase() === "span") {
                  scope.vm.del(scope.row, $event.target.parentNode);
                } else {
                  scope.vm.del(scope.row, $event.target);
                }
              }
            }
          },
          "删除"
        )
      ]);
    }
  }
];

export const totalUser = [
  {
    label: "手机号",
    prop: "phone",
    width: "200"
  },
  {
    label: "Mac",
    prop: "mac",
    width: "300"
  },
  {
    label: "登录次数",
    prop: "login_count"
  },
  {
    label: "最近登录时间",
    width: "350",
    render: (h, scope) => {
      return h("span", null, timeFormat(scope.row.login_time * 1000, true));
    }
  },
  {
    label: "登录场景",
    render: (h, scope) => {
      return h("el-tag", null, scope.row.scenario);
    }
  },
  {
    label: "操作",
    width: "200",
    fixed: "right",
    render: (h, scope) => {
      return h(
        "el-button",
        {
          props: {
            size: "small",
            type: "primary"
          },
          on: {
            click() {
              scope.vm.open(scope.row);
            }
          }
        },
        "登录记录"
      );
    }
  }
];

export const typeScene = [
  {
    label: "手机号",
    prop: "phone",
    width: "200"
  },
  {
    label: "Mac",
    prop: "mac",
    width: "200"
  },
  {
    label: "登录次数",
    prop: "login_count"
  },
  {
    label: "最近登录时间",
    width: "350",
    render: (h, scope) => {
      return h("span", null, timeFormat(scope.row.login_time * 1000, true));
    }
  },
  {
    label: "登录场景",
    render: (h, scope) => {
      return h("el-tag", null, scope.row.scenario);
    }
  },
  {
    label: "操作",
    width: "150",
    fixed: "right",
    render: (h, scope) => {
      return h(
        "el-button",
        {
          props: {
            size: "small",
            type: "primary"
          },
          on: {
            click() {
              scope.vm.open(scope.row);
            }
          }
        },
        "登录记录"
      );
    }
  }
];

export const onlineUser = [
  {
    label: "手机号",
    prop: "phone",
    width: "200"
  },
  {
    label: "Mac",
    prop: "mac",
    width: "300"
  },
  {
    label: "最近登录时间",
    width: "350",
    render: (h, scope) => {
      return h("span", null, timeFormat(scope.row.login_time * 1000, true));
    }
  },
  {
    label: "登录场景",
    render: (h, scope) => {
      return h("el-tag", null, scope.row.scenario);
    }
  },
  {
    label: "操作",
    width: "200",
    fixed: "right",
    render: (h, scope) => {
      return h(
        "el-button",
        {
          props: {
            size: "small",
            type: "primary"
          },
          on: {
            click() {
              scope.vm.open(scope.row);
            }
          }
        },
        "登录记录"
      );
    }
  }
];

export const offlineUser = [
  {
    label: "手机号",
    prop: "phone",
    width: "200"
  },
  {
    label: "Mac",
    prop: "mac",
    width: "300"
  },
  {
    label: "最近登录时间",
    width: "350",
    render: (h, scope) => {
      return h("span", null, timeFormat(scope.row.login_time * 1000, true));
    }
  },
  {
    label: "登录场景",
    render: (h, scope) => {
      return h("el-tag", null, scope.row.scenario);
    }
  },
  {
    label: "操作",
    width: "200",
    fixed: "right",
    render: (h, scope) => {
      return h(
        "el-button",
        {
          props: {
            size: "small",
            type: "primary"
          },
          on: {
            click() {
              scope.vm.open(scope.row);
            }
          }
        },
        "登录记录"
      );
    }
  }
];

export const offlineDevice = [
  {
    label: "设备ID",
    prop: "dev_id",
    width: "80"
  },
  {
    label: "设备IP",
    prop: "ip",
    width: "180"
  },
  {
    label: "场景",
    width: "100",
    render: (h, scope) => {
      return h(
        "el-tag",
        {
          props: { effect: "dark" }
        },
        scope.row.name
      );
    }
  },
  {
    label: "最新在线时间",
    prop: "ts",
    width: "200"
  },
  {
    label: "在线时长",
    prop: "upt",
    width: "200",
    showOverflowTooltip: true
  },
  {
    label: "联系电话",
    prop: "phone",
    width: "150"
  },
  {
    label: "地区",
    prop: "city",
    width: "150"
  },
  {
    label: "商家地址",
    prop: "address",
    width: "300"
  },
  {
    label: "类型",
    render: (h, scope) => {
      return h(
        "el-tag",
        {
          props: {
            hit: true,
            type: scope.row.tp_id === 1 ? "danger" : "warning"
          }
        },
        scope.row.tp_id === 1 ? "一类场景" : "二类场景"
      );
    }
  }
];

export const sceneDetail = [
  {
    label: "手机号",
    prop: "phone",
    width: "200"
  },
  {
    label: "Mac",
    prop: "mac",
    showOverflowTooltip: true
  },
  {
    label: "最近登录时间",
    showOverflowTooltip: true,
    render: (h, scope) => {
      return h("span", null, timeFormat(scope.row.login_time * 1000, true));
    }
  },
  {
    label: "登录场景",
    render: (h, scope) => {
      return h("el-tag", null, scope.row.scenario);
    }
  },
  {
    label: "操作",
    width: "150",
    fixed: "right",
    render: (h, scope) => {
      return h(
        "el-button",
        {
          props: {
            size: "small",
            type: "primary"
          },
          on: {
            click() {
              scope.vm.open(scope.row);
            }
          }
        },
        "登录记录"
      );
    }
  }
];

export const administrator = [
  {
    label: "账号",
    prop: "username",
    width: "200",
    resizable: false
  },
  {
    label: "角色",
    prop: "title",
    width: "200",
    resizable: false
  },
  {
    label: "名称",
    prop: "name",
    width: "200",
    resizable: false
  },
  {
    label: "描述",
    prop: "remark",
    resizable: false,
    showOverflowTooltip: true
  },
  {
    label: "状态",
    width: "150",
    resizable: false,
    render: (h, scope) => {
      return h(
        "el-tag",
        {
          props: { type: scope.row.status === 1 ? "success" : "danger" }
        },
        scope.row.status === 1 ? "使用中" : "已禁用"
      );
    }
  },
  {
    label: "创建时间",
    width: "200",
    resizable: false,
    render: (h, scope) => {
      return h("span", null, timeFormat(scope.row.create_at * 1000, true));
    }
  },
  {
    label: "操作",
    width: "400",
    resizable: false,
    fixed: "right",
    render: (h, scope) => {
      return h("div", [
        h(
          "el-button",
          {
            props: {
              type: "primary",
              size: "small",
              disabled: scope.row.super === 1
            },
            on: {
              click() {
                scope.vm.doEdit(scope.row);
              }
            }
          },
          "编辑"
        ),
        h(
          "el-button",
          {
            props: {
              type: "success",
              size: "small",
              disabled: scope.row.super === 1
            },
            on: {
              click() {
                scope.vm.doAllot(scope.row);
              }
            }
          },
          "分配角色"
        ),
        h(
          "el-button",
          {
            props: {
              type: "warning",
              size: "small",
              disabled: scope.row.super === 1
            },
            on: {
              click() {
                scope.vm.rePass(scope.row);
              }
            }
          },
          "修改密码"
        ),
        h(
          "el-button",
          {
            attrs: { "loading-index": scope.index },
            props: {
              type: "danger",
              size: "small",
              disabled: scope.row.super === 1,
              loading: scope.vm.delLoading == scope.index
            },
            on: {
              click($event) {
                if ($event.target.tagName.toLowerCase() === "span") {
                  scope.vm.doDelele(scope.row, $event.target.parentNode);
                } else {
                  scope.vm.doDelele(scope.row, $event.target);
                }
              }
            }
          },
          "删除"
        )
      ]);
    }
  }
];

export const role = [
  {
    label: "名称",
    prop: "title",
    showOverflowTooltip: true
  },
  {
    label: "说明",
    prop: "remark",
    showOverflowTooltip: true
  },
  {
    label: "状态",
    width: "120",
    render: (h, scope) => {
      return h(
        "el-tag",
        {
          props: { type: scope.row.status === 1 ? "success" : "danger" }
        },
        scope.row.status === 1 ? "使用中" : "已禁用"
      );
    }
  },
  {
    label: "操作",
    width: "300",
    render: (h, scope) => {
      return h("div", [
        h(
          "el-button",
          {
            props: {
              type: "primary",
              size: "small",
              disabled: scope.row.group_id === 1
            },
            on: {
              click() {
                scope.vm.doEdit(scope.row);
              }
            }
          },
          "编辑"
        ),
        h(
          "el-button",
          {
            props: {
              type: "danger",
              size: "small",
              disabled: scope.row.group_id === 1
            },
            on: {
              click() {
                scope.vm.doDelele(scope.row);
              }
            }
          },
          "删除"
        )
      ]);
    }
  }
];

export const sms = [
  {
    label: "手机号",
    width: "200",
    render: (h, scope) => {
      return h("el-tag", null, scope.row.phone);
    }
  },
  {
    label: "验证码",
    prop: "v_code"
  },
  {
    label: "操作时间",
    width: "300",
    render: (h, scope) => {
      return h("span", null, timeFormat(scope.row.last_sms_time * 1000, true));
    }
  },
  {
    label: "来源",
    prop: "source"
  },
  {
    label: "状态",
    prop: "status"
  }
];

export const log = [
  {
    label: "操作者",
    render: (h, scope) => {
      return h("el-tag", { props: { hit: true } }, scope.row.operator);
    }
  },
  {
    label: "操作",
    prop: "action",
    showOverflowTooltip: true
  },
  {
    label: "操作时间",
    render: (h, scope) => {
      return h("span", null, timeFormat(scope.row.time * 1000, true));
    }
  }
];
