<template>
  <div>
    <el-card>
      <div slot="header">
        <comm-card-header title="一类场景明细" iconClass="iconfont el-icon-ft-subway-o" refresh>
          <el-button-group>
            <el-button type="primary" size="small" round @click="getData('tab', 'pv')" :disabled="currentType === 'pv'">
              PV明细
            </el-button>
            <el-button type="primary" size="small" round @click="getData('tab', 'uv')" :disabled="currentType === 'uv'">
              UV明细
            </el-button>
          </el-button-group>
        </comm-card-header>
      </div>

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
            <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
          </el-form-item>
        </el-form>

        <comm-table :tableData="tableData" :columns="columns" :pagination="pagination" :showLoading="showLoading"></comm-table>
        <comm-pagination :total="pagination.total" @pageChange="pageChange"></comm-pagination>

        <el-drawer :visible.sync="showDrawer" direction="ltr" class="drawer-win">
          <div slot="title">
            <div style="font-size: 20px;">用户【{{ currentPhone }}】接入记录</div>
          </div>
          <table-win :phone="currentPhone" :mac="currentMac" :tp_id="1"></table-win>
        </el-drawer>
      </div>
    </el-card>
  </div>
</template>

<script>
import CommCardHeader from "@/components/CommCardHeader";
import CommTable from "@/components/CommTable";
import CommPagination from "@/components/CommPagination";
import { sceneDetail } from "js/tableConfig";
import tableWin from "./children/tableWin";
import hasSceneList from "@/mixins/hasSceneList";
import getDay from "js/getDay";
export default {
  data: () => ({
    showLoading: false,
    columns: sceneDetail,
    tableData: [],
    formData: { time: "", phone: "", dev_id: "" },
    pagination: { total: 0, currentPage: 1, pageSize: 10 },
    currentType: "pv",
    currentPhone: "",
    currentMac: "",
    showDrawer: false
  }),
  mixins: [hasSceneList],
  computed: {
    currentSceneList() {
      return this.sceneList.filter(item => item.tp_id === 1);
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
        this.$bus.$emit("clearPage");
        return;
      }
      this.showLoading = true;
      return this.$http.statement
        .oneDetail({
          phone: this.formData.phone || "",
          dev_id: this.formData.dev_id || "",
          time1: this.formData.time ? this.formData.time[0] : "",
          time2: this.formData.time ? this.formData.time[1] : "",
          time: getDay(-6),
          week_time: getDay(1),
          type: this.currentType,
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
  components: { CommCardHeader, CommTable, CommPagination, tableWin }
};
</script>

<style lang="scss" scoped>
::v-deep .el-drawer {
  min-width: 650px;
}
</style>
