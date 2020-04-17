<template>
  <div id="offAd">
    <el-card>
      <div slot="header">
        <comm-card-header title="下刊广告统计" refresh> </comm-card-header>
      </div>
      <comm-table :tableData="tableData" :columns="columns" :pagination="pagination" :showLoading="showLoading"></comm-table>
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
import { adStatementXK } from "js/tableConfig";
import { mapState } from "vuex";
import preview from "@/mixins/preview";
export default {
  data: () => ({
    showLoading: false,
    columns: adStatementXK,
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
    getData() {
      this.showLoading = true;
      return this.$http.ad
        .adStatement({
          type: "off",
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

    edit(row) {
      this.$router.push({
        name: "editAd",
        params: { editAd: row }
      });
    },

    del(row) {
      this.$confirm("此操作不可恢复，是否永久删除此广告?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$http.ad
            .adDel({ id: row.id })
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
