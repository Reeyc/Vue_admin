<template>
  <el-row style="height: 100%; padding: 10px 20px 40px;">
    <el-form inline>
      <el-form-item>
        <el-date-picker
          v-model="formData.time"
          type="monthrange"
          range-separator="至"
          start-placeholder="开始月份"
          end-placeholder="结束月份"
          value-format="yyyy-MM"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-select v-model="formData.scene" placeholder="选择场景查询" clearable>
          <el-option v-for="item of sceneList" :key="item.dev_id" :label="item.name" :value="item.dev_id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
      </el-form-item>
    </el-form>

    <el-table
      :data="tableData"
      stripe
      v-loading="showLoading"
      element-loading-background="rgba(0,0,0,0.7)"
      element-loading-text="拼命加载中"
    >
      <el-table-column type="index" label="#" width="80" align="center">
        <template slot-scope="scope">
          {{ pagination ? scope.$index + 1 + (pagination.currentPage - 1) * pagination.pageSize : scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column property="mac" label="mac" width="160" align="center"></el-table-column>

      <el-table-column property="scenario" label="接入场景" align="center">
        <template slot-scope="scope">
          <el-tag>{{ scope.row.scenario }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column property="logintime" label="时间" width="170" align="center">
        <template slot-scope="scope">
          {{ timeFormat(scope.row.logintime * 1000, true) }}
        </template>
      </el-table-column>

      <el-table-column property="show_count" label="查看次数" align="center"></el-table-column>
    </el-table>

    <comm-pagination
      :total="pagination.total"
      :currentPage="pagination.currentPage"
      :pageSize="pagination.pageSize"
      :pagerCount="5"
      @pageChange="pageChange"
    ></comm-pagination>
  </el-row>
</template>

<script>
import CommPagination from "@/components/CommPagination";
import timeFormat from "js/timeFormat";
import hasSceneList from "@/mixins/hasSceneList";
export default {
  props: ["id"],
  data: () => ({
    name: "adDetail",
    timeFormat,
    formData: { time: "", scene: "" },
    tableData: [],
    pagination: { total: 0, currentPage: 1, pageSize: 20 },
    showLoading: false
  }),
  mixins: [hasSceneList],
  methods: {
    pageChange(data) {
      this.pagination.currentPage = data.currentPage;
      this.pagination.pageSize = data.pageSize;
      this.getData();
    },
    getData() {
      this.showLoading = true;
      return this.$http.ad
        .adDetail({
          p_id: this.id,
          page: this.pagination.currentPage,
          limit: this.pagination.pageSize,
          scene: this.formData.scene || "",
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
      this.pagination.currentPage = 1;
      this.pagination.pageSize = 20;
      this.getData();
    }
  },
  mounted() {
    this.$bus.$on("detailChange", () => {
      this.formData.time = "";
      this.formData.scene = "";
      this.tableData = [];
      this.pagination.total = 0;
      this.pagination.currentPage = 1;
      this.pagination.pageSize = 20;
      this.getData();
    });
  },
  components: { CommPagination }
};
</script>

<style lang="scss">
.el-drawer.ltr,
.el-drawer.rtl,
.el-drawer__container {
  overflow: auto;
}
</style>
