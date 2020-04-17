<template>
  <div id="onlineAd">
    <el-card>
      <div slot="header">
        <comm-card-header title="上刊广告统计" refresh>
          <el-button-group>
            <el-button
              v-for="item of buttonList"
              :key="item.type"
              type="primary"
              size="small"
              round
              :disabled="item.type === currentType"
              @click="getData('tab', item)"
            >
              {{ item.text }}
            </el-button>
          </el-button-group>
        </comm-card-header>
      </div>

      <bar-chart :title="chartTitle" :data="tableData" :sign="showLoading"></bar-chart>
      <el-divider><i class="el-icon-document"></i></el-divider>
      <comm-table :tableData="tableData" :columns="columns" :pagination="pagination" :showLoading="showLoading"></comm-table>
      <comm-pagination :total="pagination.total" @pageChange="pageChange"></comm-pagination>
    </el-card>

    <el-drawer :visible.sync="showDrawer" direction="rtl" class="drawer-win">
      <div slot="title">
        <div style="font-size: 20px;">{{ `【${drawerTitle}】详情记录` }}</div>
      </div>
      <ad-detail :id="currentID"></ad-detail>
    </el-drawer>

    <transition enter-active-class="animated zoomIn" leave-active-class="animated zoomOut">
      <div class="preview-wrap" v-show="isPreview">
        <img class="preview" :src="previewUrl" />
      </div>
    </transition>
  </div>
</template>

<script>
import barChart from "./barCharts";
import CommCardHeader from "@/components/CommCardHeader";
import CommTable from "@/components/CommTable";
import CommPagination from "@/components/CommPagination";
import adDetail from "./adDetail";
import { adStatement } from "js/tableConfig";
import preview from "@/mixins/preview";
export default {
  data: () => ({
    buttonList: [
      { type: "i", text: "首页曝光" },
      { type: "c", text: "登录轮播" },
      { type: "c2", text: "资讯页轮播" },
      { type: "c4", text: "资讯页卡片" },
      { type: "c5", text: "生活页卡片" }
    ],
    chartTitle: "",
    currentType: "i",
    showLoading: false,
    columns: adStatement,
    tableData: [],
    pagination: { total: 0, currentPage: 1, pageSize: 10 },
    currentID: "",
    showDrawer: false,
    drawerTitle: ""
  }),
  mixins: [preview],
  methods: {
    pageChange(data) {
      this.pagination.currentPage = data.currentPage;
      this.pagination.pageSize = data.pageSize;
      this.getData();
    },
    getData(params, obj) {
      if (params === "tab") {
        this.currentType = obj.type;
        this.$bus.$emit("clearPage");
        return;
      }
      this.showLoading = true;
      this.$http.ad
        .adStatement({
          type: this.currentType,
          page: this.pagination.currentPage,
          limit: this.pagination.pageSize
        })
        .then(res => {
          this.showLoading = false;
          Number.prototype.toFixed = function(s) {
            var times = Math.pow(10, s);
            var des = this * times + 0.5;
            des = parseInt(des, 10) / times;
            return des;
          };
          const currentText = this.buttonList.find(item => item.type === this.currentType)["text"];
          this.chartTitle = `广告统计 - ${currentText}`;

          let sum = 0;
          let record = [];
          res.data.forEach(item => (sum += item.show_count));
          res.data.forEach((item, index, arr) => {
            item.pic = process.env.VUE_APP_BASE_URL + "/" + item.pic;
            if (index === arr.length - 1) {
              let total = 0;
              record.forEach(i => (total += i));
              let lastHundred = (100 - total).toFixed(3);
              item.ratio = `${lastHundred}%`;
              record.push(lastHundred);
              return;
            }
            let hundred = ((item.show_count / sum) * 100).toFixed(3);
            item.ratio = `${hundred}%`;
            record.push(hundred);
          });

          this.tableData = res.data;
          this.pagination.total = res.count;
        })
        .catch(() => {
          this.showLoading = false;
          this.tableData = [];
          this.pagination.total = 0;
        });
    },
    openDetail(row) {
      this.drawerTitle = row.name;
      this.showDrawer = true;
      this.currentID = row.id;
      this.$bus.$emit("detailChange");
    }
  },
  created() {
    this.getData();
  },
  components: { barChart, CommCardHeader, CommTable, CommPagination, adDetail }
};
</script>

<style lang="scss" scoped>
::v-deep .el-drawer {
  min-width: 750px;
}
</style>
