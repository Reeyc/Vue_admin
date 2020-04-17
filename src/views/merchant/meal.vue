<template>
  <div id="meal">
    <el-card>
      <div slot="header">
        <comm-card-header title="短信套餐" iconClass="el-icon-chat-line-round" refresh>
          <el-button type="primary" icon="el-icon-circle-plus-outline" @click="addOpen"> 新增套餐 </el-button>
        </comm-card-header>
      </div>
      <comm-table :tableData="tableData" :columns="columns" :showLoading="showLoading" border></comm-table>
      <comm-pagination :total="pagination.total" @pageChange="pageChange"></comm-pagination>
    </el-card>

    <el-dialog :title="isAdd ? '新增套餐' : '套餐编辑'" :visible.sync="dialog" @close="close" width="380px">
      <el-form :model="formData" :rules="rules" ref="form" label-width="80px" inline-message class="form">
        <el-form-item prop="name" label="套餐名称">
          <el-input v-model="formData.name" placeholder="请输入名称"></el-input>
        </el-form-item>
        <el-form-item prop="money" label="套餐价格">
          <el-input v-model="formData.money" placeholder="请输入价格"></el-input>
        </el-form-item>
        <el-form-item prop="number" label="短信数量">
          <el-input v-model="formData.number" placeholder="请输入短信数量"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-button @click="close">取消</el-button>
          <el-button type="primary" @click="submit">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import CommCardHeader from "@/components/CommCardHeader";
import CommTable from "@/components/CommTable";
import CommPagination from "@/components/CommPagination";
import { mealList } from "js/tableConfig";
export default {
  data: () => ({
    dialog: false,
    isAdd: true,
    formData: { id: "", name: "", money: "", number: "" },
    showLoading: false,
    columns: mealList,
    tableData: [],
    pagination: { total: 0, currentPage: 1, pageSize: 10 },
    delLoading: -1,
    rules: {
      name: [{ required: true, message: "请输入名称", trigger: "blur" }],
      money: [{ required: true, message: "请输入价格", trigger: "blur" }],
      number: [{ required: true, message: "请输入短信数量", trigger: "blur" }]
    }
  }),
  methods: {
    pageChange(data) {
      this.pagination.currentPage = data.currentPage;
      this.pagination.pageSize = data.pageSize;
      this.getData();
    },
    getData() {
      this.showLoading = true;
      this.$http.merchant
        .mealList()
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
    addOpen() {
      this.isAdd = true;
      this.dialog = true;
    },
    editOpen(row) {
      this.formData = row;
      this.isAdd = false;
      this.dialog = true;
    },
    close() {
      this.dialog = false;
      this.$refs.form.resetFields();
    },
    del(row, node) {
      this.$confirm("是否删除该套餐？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.delLoading = node.getAttribute("loading-index");
          this.$http.merchant
            .mealDel({ id: row.meal_id })
            .then(() => {
              this.delLoading = -1;
              this.$message.success("操作成功");
              this.$router.replace("/refresh");
            })
            .catch(() => (this.delLoading = -1));
        })
        .catch(() => {});
    },
    submit() {
      const form = this.$refs.form;
      form.validate(valid => {
        if (valid) {
          const API = this.isAdd ? this.$http.merchant.mealAdd : this.$http.merchant.mealEdit;
          API(this.formData)
            .then(() => {
              this.$message.success("操作成功");
              this.$router.replace("/refresh");
            })
            .catch(() => {});
        } else {
          return;
        }
      });
    }
  },
  created() {
    this.getData();
  },
  components: { CommCardHeader, CommTable, CommPagination }
};
</script>

<style lang="scss" scoped>
.form {
  .el-input {
    width: 300px;
  }
  .el-button {
    margin-top: 10px;
  }
}
</style>
