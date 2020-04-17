<template>
  <div id="deviceType">
    <el-card>
      <div slot="header">
        <comm-card-header title="设备类型" iconClass="el-icon-set-up">
          <el-button type="primary" icon="el-icon-circle-plus-outline" @click="open('add')">
            新增类别
          </el-button>
        </comm-card-header>
      </div>
      <comm-table :tableData="tableData" :columns="columns" :showLoading="showLoading" border></comm-table>
    </el-card>
    <el-dialog :title="isAdd ? '新增类别' : '类别编辑'" :visible.sync="dialog" :close-on-click-modal="false">
      <el-form :model="formData" :rules="formRules" ref="form" inline-message label-width="80px">
        <el-form-item prop="name" label="类别名称">
          <el-input v-model="formData.name" placeholder="请输入名称"></el-input>
        </el-form-item>
        <el-form-item label=" ">
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
import { deviceType } from "js/tableConfig";
export default {
  data: () => ({
    showLoading: false,
    columns: deviceType,
    tableData: [],
    dialog: false,
    isAdd: true,
    formData: { id: "", name: "" },
    formRules: { name: [{ required: true, message: "请输入类别名称", trigger: "blur" }] }
  }),
  methods: {
    getData() {
      this.showLoading = true;
      this.$http.device
        .deviceType()
        .then(res => {
          this.showLoading = false;
          this.tableData = res.data;
        })
        .catch(() => {
          this.showLoading = false;
          this.tableData = [];
        });
    },
    open(type, data) {
      if (type === "add") {
        Object.keys(this.formData).forEach(key => (this.formData[key] = ""));
        this.isAdd = true;
      } else {
        this.formData.id = data.id;
        this.formData.name = data.name;
        this.isAdd = false;
      }
      this.dialog = true;
    },
    close() {
      this.$refs.form.resetFields();
      this.dialog = false;
    },
    submit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          if (this.isAdd) {
            this.$http.device
              .deviceAdd({ name: this.formData.name })
              .then(() => {
                this.$message.success("操作成功");
                this.$router.replace("/refresh");
              })
              .catch(() => {});
          } else {
            this.$http.device
              .deviceEdit({ buss_id: this.formData.id, name: this.formData.name })
              .then(() => {
                this.$message.success("操作成功");
                this.$router.replace("/refresh");
              })
              .catch(() => {});
          }
        } else {
          return;
        }
      });
    }
  },
  created() {
    this.getData();
  },
  components: { CommCardHeader, CommTable }
};
</script>

<style lang="scss" scoped>
::v-deep .el-dialog {
  width: 500px;
  min-width: 500px;
  .el-input {
    width: 200px;
  }
}
</style>
