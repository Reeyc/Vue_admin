<template>
  <el-row
    v-loading="showLoading"
    element-loading-background="rgba(0,0,0,0.7)"
    element-loading-text="拼命加载中"
    style="height: 100%; padding: 0 20px;"
  >
    <el-table :data="tableData" stripe>
      <el-table-column type="index" label="#" width="60"></el-table-column>
      <el-table-column property="phone" label="手机号" align="center" width="120"></el-table-column>
      <el-table-column label="接入日期" align="center" width="180">
        <template slot-scope="scope"> {{ timeFormat(scope.row.login_time * 1000, true) }} </template>
      </el-table-column>
      <el-table-column label="接入方式" align="center" width="120">
        <template slot-scope="scope">
          <el-tag :type="scope.row.login_type === 1 ? 'success' : ''">
            {{ scope.row.login_type === 1 ? "认证登录" : "免认证登录" }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column property="name" label="接入场景" align="center" width="120"></el-table-column>
    </el-table>
  </el-row>
</template>

<script>
import timeFormat from "js/timeFormat";
export default {
  props: ["phone", "mac", "tp_id"],
  data: () => ({
    timeFormat,
    tableData: [],
    showLoading: false
  }),
  methods: {
    getData() {
      this.showLoading = true;
      this.$http.statement
        .loginRecord({
          phone: this.phone,
          mac: this.mac,
          tp_id: this.tp_id
        })
        .then(res => {
          this.showLoading = false;
          this.tableData = res.data;
        })
        .catch(() => {
          this.showLoading = false;
          this.tableData = [];
        });
    }
  },
  watch: {
    mac: {
      handler() {
        this.tableData = [];
        this.getData();
      },
      immediate: true
    }
  }
};
</script>

<style lang="scss">
.el-drawer.ltr,
.el-drawer.rtl,
.el-drawer__container {
  overflow: auto;
}
</style>
