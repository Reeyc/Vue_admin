<template>
  <div id="sms">
    <el-card>
      <div slot="header">
        <comm-card-header title="短信记录" iconClass="el-icon-s-promotion" refresh>
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
        <el-input v-model="formData.phone" clearable placeholder="输入手机号查询"></el-input>
        <el-button type="primary" icon="el-icon-search" @click="search"> 搜索 </el-button>
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
import { sms } from "js/tableConfig";
export default {
  data: () => ({
    buttonList: [
      { type: 1, text: "登录验证码" },
      { type: 2, text: "找回密码" }
    ],
    currentType: 1,
    showLoading: false,
    columns: sms,
    formData: { time: "", phone: "" },
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
        this.formData.time = "";
        this.formData.phone = "";
        this.currentType = type;
        this.$bus.$emit("clearPage");
        return;
      }
      this.showLoading = true;
      this.$http.sms
        .sms({
          tab: this.currentType,
          phone: this.formData.phone,
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
      this.getData();
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
