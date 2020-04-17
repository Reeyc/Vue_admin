<template>
  <el-pagination
    layout="sizes, total, prev, pager, next, jumper"
    :page-size="pagination.pageSize"
    :current-page="pagination.currentPage"
    :total="total"
    :pager-count="pagerCount"
    :background="background"
    @current-change="handleCurrentChange"
    @size-change="handleSizeChange"
    class="pagination"
  >
  </el-pagination>
</template>

<script>
export default {
  props: {
    currentPage: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 10
    },
    total: {
      type: Number,
      required: true
    },
    pagerCount: {
      type: Number,
      default: 7
    },
    background: {
      type: Boolean,
      default: true
    }
  },
  data: () => ({
    pagination: {
      currentPage: 1,
      pageSize: 10
    },
    //缓存第一次的页码
    buffPage: {}
  }),
  methods: {
    //清空页码
    _initPagenation() {
      this.$bus.$on("clearPage", () => {
        this.pagination.currentPage = this.buffPage.currentPage;
        this.pagination.pageSize = this.buffPage.pageSize;
        this.$emit("pageChange", this.pagination);
      });
    },
    //页码改变
    handleCurrentChange(val, params) {
      this.pagination.currentPage = val;
      this.$emit("pageChange", this.pagination, params);
    },
    //每页数改变
    handleSizeChange(val, params) {
      this.pagination.pageSize = val;
      this.$emit("pageChange", this.pagination, params);
    }
  },
  watch: {
    currentPage: {
      handler(val) {
        this.pagination.currentPage = val;
      },
      immediate: true
    },
    pageSize: {
      handler(val) {
        this.pagination.pageSize = val;
      },
      immediate: true
    }
  },
  created() {
    this.buffPage.currentPage = this.currentPage || 1;
    this.buffPage.pageSize = this.pageSize || 10;

    this._initPagenation();
  }
};
</script>

<style lang="scss">
.pagination {
  margin: 20px 0 10px 0;
}
</style>
