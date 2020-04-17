<template>
  <div id="deviceList">
    <el-card>
      <div slot="header">
        <comm-card-header title="设备列表" iconClass="el-icon-monitor" refresh>
          <el-button-group>
            <el-button
              v-for="item of buttonList"
              :key="item.type"
              type="primary"
              size="small"
              round
              @click="getData('tab', item.type)"
              :disabled="currentType === item.type"
            >
              {{ item.text }}
            </el-button>
          </el-button-group>
        </comm-card-header>
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
import { deviceList } from "js/tableConfig";
export default {
  data: () => ({
    buttonList: [
      { type: "", text: "所有场景" },
      { type: 1, text: "一类场景" },
      { type: 2, text: "二类场景" }
    ],
    currentType: "",
    showLoading: false,
    columns: deviceList,
    tableData: [],
    pagination: { total: 0, currentPage: 1, pageSize: 10 }
  }),
  methods: {
    pageChange(data) {
      this.pagination.currentPage = data.currentPage;
      this.pagination.pageSize = data.pageSize;
      this.getData();
    },
    getData(params, type) {
      if (params === "tab") {
        this.query = "";
        this.currentType = type;
        this.$bus.$emit("clearPage");
        return;
      }
      this.showLoading = true;
      this.$http.device
        .deviceList({
          tp_id: this.currentType,
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
