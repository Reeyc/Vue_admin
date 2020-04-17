<template>
  <el-form :model="data" ref="form" label-width="100px" class="voucher-win">
    <el-form-item label="法人名称">
      <el-input v-model="data.legal_person" placeholder="请输入法人名称" disabled></el-input>
    </el-form-item>

    <el-form-item label="设备ID">
      <el-input v-model="data.dev_id" placeholder="请输入设备ID" disabled></el-input>
    </el-form-item>

    <el-form-item label="充值方式">
      <el-select v-model="data.mode" disabled>
        <el-option label="银联" :value="1"></el-option>
        <el-option label="支付宝" :value="2"></el-option>
        <el-option label="微信" :value="3"></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="套餐">
      <el-select v-model="data.mid" disabled>
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
  props: ["data", "midList"],
  methods: {
    submit() {
      const form = this.$refs.form;
      form.validate(valid => {
        if (valid) {
          this.$confirm("是否通过审核？", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              this.$http.merchant
                .rechargeAudit({ order_id: this.data.id })
                .then(() => {
                  this.$message.success("操作成功");
                  this.$router.replace("/refresh");
                })
                .catch(() => {});
            })
            .catch(() => {});
        } else {
          return;
        }
      });
    }
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
}
</style>
