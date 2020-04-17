<template>
  <div>
    <el-card>
      <div slot="header">
        <comm-card-header title="离线设备" iconClass="iconfont el-icon-lixian1" refresh> </comm-card-header>
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
import { offlineDevice } from "js/tableConfig";
export default {
  data: () => ({
    showLoading: false,
    columns: offlineDevice,
    tableData: [],
    pagination: { total: 0, currentPage: 1, pageSize: 10 }
  }),
  methods: {
    pageChange(data) {
      this.pagination.currentPage = data.currentPage;
      this.pagination.pageSize = data.pageSize;
      this.getData();
    },
    getData() {
      this.showLoading = true;
      return this.$http.statement
        .offlineDevice({
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
    }
  },
  created() {
    this.getData();
  },
  components: { CommCardHeader, CommTable, CommPagination }
};
</script>
