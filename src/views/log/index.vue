<template>
  <div id="log">
    <el-card>
      <div slot="header">
        <comm-card-header title="操作日志" iconClass="el-icon-s-order" refresh> </comm-card-header>
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
        >
        </el-date-picker>
        <el-input v-show="userInfo.super === 1" v-model="formData.operator" clearable placeholder="输入操作者搜索"></el-input>
        <el-button type="primary" icon="el-icon-search" @click="search">
          搜索
        </el-button>
      </div>

      <comm-table :tableData="tableData" :columns="columns" :pagination="pagination" :showLoading="showLoading"></comm-table>
      <comm-pagination :total="pagination.total" @pageChange="pageChange"></comm-pagination>
    </el-card>
  </div>
</template>

<script>
import CommCardHeader from "@/components/CommCardHeader";
import CommTable from "@/components/CommTable";
import CommPagination from "@/components/CommPagination";
import { log } from "js/tableConfig";
import { mapState } from "vuex";
export default {
  data: () => ({
    showLoading: false,
    columns: log,
    formData: { time: "", operator: "" },
    tableData: [],
    pagination: { total: 0, currentPage: 1, pageSize: 10 }
  }),
  computed: {
    ...mapState(["userInfo"])
  },
  methods: {
    pageChange(data) {
      this.pagination.currentPage = data.currentPage;
      this.pagination.pageSize = data.pageSize;
      this.getData();
    },
    getData() {
      this.showLoading = true;
      this.$http.log
        .log({
          page: this.pagination.currentPage,
          limit: this.pagination.pageSize,
          operator: this.formData.operator,
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
    search() {
      this.$bus.$emit("clearPage");
    }
  },
  created() {
    this.getData();
  },
  components: { CommCardHeader, CommTable, CommPagination }
};
</script>

<style lang="scss" scoped>
.filter {
  margin-bottom: 15px;
  .el-date-editor {
    margin: 0 10px 10px 0;
  }
  .el-select,
  .el-input {
    width: 200px;
    margin: 0 10px 10px 0;
  }
}
</style>
