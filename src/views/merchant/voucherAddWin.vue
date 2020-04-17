<template>
  <el-form :model="data" :rules="rules" ref="form" label-width="100px" class="voucher-win">
    <el-form-item prop="legal_person" label="法人名称">
      <el-input v-model="data.legal_person" placeholder="请输入法人名称"></el-input>
    </el-form-item>

    <el-form-item prop="dev_id" label="设备ID">
      <el-input v-model="data.dev_id" placeholder="请输入设备ID"></el-input>
    </el-form-item>

    <el-form-item prop="mode" label="充值方式">
      <el-select v-model="data.mode">
        <el-option label="银联" :value="1"></el-option>
        <el-option label="支付宝" :value="2"></el-option>
        <el-option label="微信" :value="3"></el-option>
      </el-select>
    </el-form-item>

    <el-form-item prop="meal_id" label="套餐">
      <el-select v-model="data.meal_id">
        <el-option
          v-for="(item, index) of midList"
          :key="index"
          :value="item.meal_id"
          :label="`${item.name} / ${item.money}元 / ${item.number}条短信`"
        ></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="备注">
      <el-input v-model="data.remarks" type="textarea" rows="3" size="medium" placeholder="请输入备注"></el-input>
    </el-form-item>

    <el-form-item label>
      <el-button type="primary" @click="submit">提交</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  props: ["midList"],
  data: () => ({
    data: {
      legal_person: "",
      dev_id: "",
      mode: "",
      meal_id: "",
      remarks: ""
    },
    rules: {
      legal_person: [{ required: true, message: "请输入法人名称", trigger: "blur" }],
      dev_id: [{ required: true, message: "请输入设备ID", trigger: "blur" }],
      mode: [{ required: true, message: "请选择充值方式", trigger: "blur" }],
      meal_id: [{ required: true, message: "请选择套餐", trigger: "blur" }]
    }
  }),
  methods: {
    submit() {
      const form = this.$refs.form;
      form.validate(valid => {
        if (valid) {
          this.$http.merchant
            .rechargeAdd(this.data)
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
  mounted() {
    const formDom = this.$refs.form;
    this.$bus.$on("voucherClose", () => formDom.resetFields());
  }
};
</script>

<style lang="scss" scoped>
.voucher-win {
  ::v-deep .el-form-item {
    .el-select,
    .el-input {
      width: 250px;
    }
  }
  ::v-deep .el-input.is-disabled .el-input__inner {
    color: #adadad;
    border-color: #e3e3e3;
    background-color: #ececec;
  }
}
</style>
