<template>
  <div id="listAd">
    <el-card>
      <div slot="header">
        <comm-card-header title="广告列表" refresh>
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
      <div class="search">
        <el-input v-model="query" clearable placeholder="输入品牌名称查询"></el-input>
        <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
      </div>
      <comm-table
        :tableData="tableData"
        :columns="columns"
        :pagination="pagination"
        :showLoading="showLoading"
        :showOrder="false"
      ></comm-table>
      <comm-pagination :total="pagination.total" @pageChange="pageChange"></comm-pagination>
    </el-card>
    <transition enter-active-class="animated zoomIn" leave-active-class="animated zoomOut">
      <div class="preview-wrap" v-show="isPreview">
        <img class="preview" :src="previewUrl" />
      </div>
    </transition>
  </div>
</template>

<script>
import CommCardHeader from "@/components/CommCardHeader";
import CommTable from "@/components/CommTable";
import CommPagination from "@/components/CommPagination";
import { adList } from "js/tableConfig";
import { mapState } from "vuex";
import preview from "@/mixins/preview";
export default {
  data: () => ({
    buttonList: [
      { type: "", text: "所有类型" },
      { type: "i", text: "首页曝光" },
      { type: "c", text: "登录轮播" },
      { type: "c2", text: "资讯页轮播" },
      { type: "c4", text: "资讯页卡片" },
      { type: "c5", text: "生活页卡片" }
    ],
    query: "",
    currentType: "",
    showLoading: false,
    columns: adList,
    tableData: [],
    pagination: { total: 0, currentPage: 1, pageSize: 10 }
  }),
  mixins: [preview],
  computed: {
    ...mapState(["userInfo"])
  },
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
      this.$http.ad
        .listAd({
          name: this.query,
          type: this.currentType,
          page: this.pagination.currentPage,
          limit: this.pagination.pageSize
        })
        .then(res => {
          this.showLoading = false;
          res.data.map(item => (item.showPic = process.env.VUE_APP_BASE_URL + "/" + item.pic));
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
    },
    edit(row) {
      this.$router.push({
        name: "editAd",
        params: { editAd: row }
      });
    },
    xiakan(row) {
      this.$confirm("确定下刊此广告？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$http.ad
            .xiakanAd({ id: row.id })
            .then(() => {
              this.$message.success("操作成功");
              this.$router.replace("/refresh");
            })
            .catch(() => {});
        })
        .catch(() => {});
    }
  },
  created() {
    this.getData();
  },
  components: { CommCardHeader, CommTable, CommPagination }
};
</script>

<style lang="scss" scoped>
#listAd {
  .el-input {
    width: 200px;
    margin: 0 10px 15px 0;
  }
}
</style>
