<template>
  <div>
    <el-card>
      <div slot="header">
        <comm-card-header title="场景分类" iconClass="iconfont el-icon-fenlei" refresh>
          <el-button-group>
            <el-button
              v-for="item of buttonList"
              :key="item.type"
              type="primary"
              size="small"
              round
              :disabled="item.type === currentType"
              @click="getData('tab', item.type)"
            >
              {{ item.text }}
            </el-button>
          </el-button-group>
        </comm-card-header>
      </div>

      <bar-charts></bar-charts>
      <el-divider><i class="el-icon-document"></i></el-divider>

      <div class="table-wrap">
        <el-form :model="formData" inline>
          <el-form-item>
            <el-date-picker
              v-model="formData.time"
              type="datetimerange"
              time-arrow-control
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd HH:mm:ss"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-input v-model="formData.phone" placeholder="请输入手机号查询" prefix-icon="el-icon-tickets"></el-input>
          </el-form-item>
          <el-form-item>
            <el-select v-model="formData.dev_id" placeholder="选择场景查询" clearable>
              <el-option v-for="item of currentSceneList" :key="item.dev_id" :label="item.name" :value="item.dev_id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select v-model="formData.order_type" placeholder="选择排序方式">
              <el-option label="按次数排序" :value="0"></el-option>
              <el-option label="按时间排序" :value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="search">
              搜索
            </el-button>
          </el-form-item>
        </el-form>
        <comm-table :tableData="tableData" :columns="columns" :pagination="pagination" :showLoading="showLoading"></comm-table>
        <comm-pagination :total="pagination.total" @pageChange="pageChange"></comm-pagination>
        <el-drawer :visible.sync="showDrawer" direction="ltr" class="drawer-win">
          <div slot="title">
            <div style="font-size: 20px;">用户【{{ currentPhone }}】接入记录</div>
          </div>
          <table-win :phone="currentPhone" :mac="currentMac" :tp_id="currentTpID"></table-win>
        </el-drawer>
      </div>
    </el-card>
  </div>
</template>

<script>
import barCharts from "./children/barCharts";
import CommCardHeader from "@/components/CommCardHeader";
import CommTable from "@/components/CommTable";
import CommPagination from "@/components/CommPagination";
import { typeScene } from "js/tableConfig";
import tableWin from "./children/tableWin";
import hasSceneList from "@/mixins/hasSceneList";
const option = {
  one: {
    API: "oneSceneUser",
    echartsAPI: "oneSceneEcharts",
    title: "一类场景最近7日接入趋势",
    currentTpID: 1
  },
  two: {
    API: "twoSceneUser",
    echartsAPI: "twoSceneEcharts",
    title: "二类场景最近7日接入趋势",
    currentTpID: 2
  }
};
export default {
  data: () => ({
    buttonList: [
      { type: "one", text: "一类场景" },
      { type: "two", text: "二类场景" }
    ],
    formData: {
      time: "",
      phone: "",
      dev_id: "",
      order_type: 1
    },
    showLoading: false,
    columns: typeScene,
    tableData: [],
    pagination: { total: 0, currentPage: 1, pageSize: 10 },
    API: "oneSceneUser",
    currentType: "one",
    currentPhone: "",
    currentMac: "",
    currentTpID: 1,
    showDrawer: false
  }),
  mixins: [hasSceneList],
  computed: {
    currentSceneList() {
      if (this.currentType === "one") {
        return this.sceneList.filter(item => item.tp_id === 1);
      } else {
        return this.sceneList.filter(item => item.tp_id === 2);
      }
    }
  },
  methods: {
    pageChange(data) {
      this.pagination.currentPage = data.currentPage;
      this.pagination.pageSize = data.pageSize;
      this.getData();
    },
    getData(params, type) {
      if (params === "tab") {
        Object.keys(this.formData).forEach(key => (this.formData[key] = ""));
        this.currentType = type;
        this.API = option[type].API;
        this.currentTpID = option[type].currentTpID;
        this.$bus.$emit("clearPage");
        this.$bus.$emit("typeChange", { title: option[type].title, API: option[type].echartsAPI });
        return;
      }
      this.showLoading = true;
      return this.$http.statement[this.API]({
        phone: this.formData.phone || "",
        dev_id: this.formData.dev_id || "",
        order_type: this.formData.order_type,
        time1: this.formData.time ? this.formData.time[0] : "",
        time2: this.formData.time ? this.formData.time[1] : "",
        page: this.pagination.currentPage,
        limit: this.pagination.pageSize
      })
        .then(res => {
          this.showLoading = false;
          this.tableData = res.data;
          this.pagination.total = res.count;
        })
        .catch(() => {
          this.showLoading = false;
          this.tableData = [];
          this.pagination.total = 0;
        });
    },
    search() {
      this.$bus.$emit("clearPage");
    },
    open(row) {
      this.currentPhone = row.phone;
      this.currentMac = row.mac;
      this.showDrawer = true;
    }
  },
  components: { CommCardHeader, barCharts, CommTable, CommPagination, tableWin }
};
</script>

<style lang="scss" scoped>
.el-divider {
  margin: 20px 0;
}

.table-wrap {
  padding: 20px 40px;
}

::v-deep .el-drawer {
  min-width: 650px;
}
</style>
