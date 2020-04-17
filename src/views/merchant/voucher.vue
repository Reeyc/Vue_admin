<template>
  <div id="voucher">
    <el-card>
      <div slot="header">
        <comm-card-header title="订单列表" iconClass="iconfont iconchongzhi" refresh>
          <el-button type="success" size="medium" @click="addDialog = true">
            <i class="iconduanxinchongzhijilu iconfont"></i> 短信充值
          </el-button>
        </comm-card-header>
      </div>

      <div class="filter">
        <el-date-picker
          v-model="formData.time"
          type="datetimerange"
          time-arrow-control
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd HH:mm:ss"
        ></el-date-picker>
        <el-input v-model="formData.legal_person" clearable placeholder="输入法人搜索"></el-input>
        <el-select v-model="formData.state" placeholder="充值状态" clearable>
          <el-option label="待审" :value="0"></el-option>
          <el-option label="成功" :value="1"></el-option>
        </el-select>
        <el-button type="primary" icon="el-icon-search" @click="search"> 查询 </el-button>
      </div>

      <comm-table :tableData="tableData" :columns="columns" :pagination="pagination" :showLoading="showLoading"></comm-table>
      <comm-pagination :total="pagination.total" @pageChange="pageChange"></comm-pagination>

      <el-dialog title="短信充值" :visible.sync="addDialog" :close-on-click-modal="false" @close="close" width="500px">
        <voucher-add-win :midList="midList"></voucher-add-win>
      </el-dialog>

      <el-dialog title="充值审核" :visible.sync="checkDialog" :close-on-click-modal="false" @close="close" width="500px">
        <voucher-audit-win :data="checkData" :midList="midList"></voucher-audit-win>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import CommCardHeader from "@/components/CommCardHeader";
import CommTable from "@/components/CommTable";
import CommPagination from "@/components/CommPagination";
import { voucher } from "js/tableConfig";
import voucherAddWin from "./voucherAddWin";
import voucherAuditWin from "./voucherAuditWin";
export default {
  data: () => ({
    showLoading: false,
    columns: voucher,
    tableData: [],
    checkData: [],
    formData: { time: "", legal_person: "", state: "" },
    pagination: { total: 0, currentPage: 1, pageSize: 10 },
    midList: [],
    addDialog: false,
    checkDialog: false
  }),
  methods: {
    pageChange(data) {
      this.pagination.currentPage = data.currentPage;
      this.pagination.pageSize = data.pageSize;
      this.getData();
    },
    getData() {
      this.showLoading = true;
      this.$http.merchant
        .rechargeList({
          page: this.pagination.currentPage,
          limit: this.pagination.pageSize,
          legal_person: this.formData.legal_person,
          state: this.formData.state,
          time1: this.formData.time ? this.formData.time[0] : "",
          time2: this.formData.time ? this.formData.time[1] : ""
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
    getMidList() {
      this.$http.merchant.mealList().then(res => (this.midList = res.data));
    },
    search() {
      this.getData();
    },
    doCheck(data) {
      this.checkDialog = true;
      this.checkData = data;
    },
    close() {
      this.$bus.$emit("voucherClose");
    }
  },
  async created() {
    await this.getData();
    this.getMidList();
  },
  components: {
    CommCardHeader,
    CommTable,
    CommPagination,
    voucherAddWin,
    voucherAuditWin
  }
};
</script>

<style lang="scss" scoped>
.filter {
  display: flex;
  margin-bottom: 15px;
  .el-select,
  .el-input {
    width: 200px;
    margin-right: 10px;
  }
  .el-range-editor {
    margin-right: 10px;
  }
}

::v-deep .el-dialog {
  .el-input,
  .el-select {
    width: 200px;
  }
}
</style>
