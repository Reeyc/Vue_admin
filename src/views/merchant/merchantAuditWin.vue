<template>
  <div>
    <el-form label-width="120px" class="audit-form">
      <el-form-item label="商家名称"> {{ checkData.company }} </el-form-item>
      <el-divider></el-divider>

      <el-form-item label="所属场景"> {{ checkData.tp_id === 1 ? "一类场景" : "二类场景" }} </el-form-item>
      <el-divider></el-divider>

      <el-form-item label="法人姓名"> {{ checkData.legal_person }} </el-form-item>
      <el-divider></el-divider>

      <el-form-item label="法人身份证号"> {{ checkData.card_number }} </el-form-item>
      <el-divider></el-divider>

      <el-form-item label="法人身份证">
        <div class="images">
          <div class="item">
            <span>身份证正面</span>
            <img :src="checkData.show_card_back" class="toPreview" />
            <el-button type="text" @click.stop.prevent="onPreview(checkData.show_card_back)">
              大图预览
            </el-button>
          </div>
          <div class="item">
            <span>身份证背面</span>
            <img :src="checkData.show_card_front" class="toPreview" />
            <el-button type="text" @click.stop.prevent="onPreview(checkData.show_card_front)">
              大图预览
            </el-button>
          </div>
          <div class="item">
            <span>营业执照</span>
            <img :src="checkData.show_license" class="toPreview" />
            <el-button type="text" @click.stop.prevent="onPreview(checkData.show_license)">
              大图预览
            </el-button>
          </div>
        </div>
      </el-form-item>
      <el-divider></el-divider>

      <el-form-item label="管理员姓名"> {{ checkData.realname }} </el-form-item>
      <el-divider></el-divider>

      <el-form-item label="管理员手机号"> {{ checkData.phone }} </el-form-item>
      <el-divider></el-divider>

      <el-form-item label="商家简介"> {{ checkData.desc }} </el-form-item>
      <el-divider></el-divider>

      <el-form-item label="邮箱"> {{ checkData.email }} </el-form-item>
      <el-divider></el-divider>

      <el-form-item label="座机"> {{ checkData.mobile }} </el-form-item>
      <el-divider></el-divider>

      <el-form-item label="省市"> {{ `${checkData.provinceShow} - ${checkData.cityShow}` }} </el-form-item>
      <el-divider></el-divider>

      <el-form-item label="地址"> {{ checkData.address }} </el-form-item>
      <el-divider></el-divider>

      <el-form-item label="绑定设备ID">
        <el-input v-model="checkData.dev_id" placeholder="请绑定设备ID"></el-input>
      </el-form-item>
      <el-divider></el-divider>

      <el-form-item label="入驻审核" style="margin-bottom: 10px;">
        <el-switch v-model="switchVal2" active-color="#13ce66" inactive-color="#ff4949" active-text="通过" inactive-text="拒绝"></el-switch>
      </el-form-item>
      <el-form-item label="平台登录" style="margin-bottom: 10px;">
        <el-switch v-model="switchVal1" active-color="#13ce66" inactive-color="#ff4949" active-text="通过" inactive-text="拒绝"></el-switch>
      </el-form-item>
      <el-form-item label=" ">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="submit">提交</el-button>
      </el-form-item>
    </el-form>

    <transition enter-active-class="animated zoomIn" leave-active-class="animated zoomOut">
      <div class="preview-wrap" v-show="isPreview">
        <img class="preview" :src="previewUrl" />
      </div>
    </transition>
  </div>
</template>

<script>
import preview from "@/mixins/preview";
export default {
  props: {
    checkData: {
      type: Object,
      default: () => ({})
    }
  },
  data: () => ({
    status: 1,
    state: 1
  }),
  mixins: [preview],
  computed: {
    switchVal1: {
      get() {
        //（0待审、1通过、2拒绝，非拒绝状态开关都显示绿色通过）
        return this.status !== 2;
      },
      set(newVal) {
        this.status = newVal ? 1 : 2;
      }
    },
    switchVal2: {
      get() {
        //（0待审、1通过、2拒绝，非拒绝状态开关都显示绿色通过）
        return this.state !== 2;
      },
      set(newVal) {
        this.state = newVal ? 1 : 2;
      }
    }
  },
  methods: {
    submit() {
      if (!this.checkData.dev_id) {
        this.$message.error("请绑定设备ID");
        return;
      }
      this.$confirm("确定提交审核？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.checkData.map = this.checkData.provinceShow + this.checkData.cityShow + this.checkData.address;
          this.checkData.status = this.status;
          this.checkData.state = this.state;
          this.$http.merchant
            .merchanAudit(this.checkData)
            .then(() => {
              this.$message.success("操作成功");
              this.$router.replace("/refresh");
            })
            .catch(() => {});
        })
        .catch(() => {});
    },
    close() {
      this.$parent.$parent.$data.showAuditDrawer = false;
    }
  },
  mounted() {
    this.$bus.$on("auditOpen", () => {
      this.state = 1;
      this.status = 1;
    });
  }
};
</script>

<style lang="scss" scoped>
.audit-form {
  padding: 0 20px 50px 20px;
  .el-divider {
    margin: 10px 0;
    background-color: #e8ebf3;
  }
  ::v-deep .el-form-item {
    margin: 0;
    .el-form-item__label {
      font-weight: bold;
      padding: 0 30px 0 0;
    }
    .el-form-item__content {
      word-break: break-word;
    }
  }
  .el-button {
    margin-top: 20px;
    margin-right: 10px;
  }
  .images {
    display: flex;
    .item {
      text-align: center;
      margin-right: 50px;
      .toPreview {
        display: block;
        width: 70px !important;
        height: 50px !important;
        margin: 3px auto;
      }
      .el-button {
        margin-top: 0;
      }
    }
  }
}
</style>
<style lang="scss">
.el-drawer.ltr,
.el-drawer.rtl,
.el-drawer__container {
  overflow: auto;
}
</style>
