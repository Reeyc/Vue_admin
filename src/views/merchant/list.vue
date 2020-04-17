<template>
  <div id="merchantList">
    <el-card>
      <div slot="header">
        <comm-card-header title="商家入驻" iconClass="iconfont icondianshangjiashangcheng-xianxing" refresh>
          <el-button type="primary" icon="el-icon-circle-plus-outline" @click="open(0)">
            商家入驻
          </el-button>
        </comm-card-header>
      </div>
      <el-form :model="formData" inline>
        <el-form-item>
          <el-date-picker
            v-model="formData.time"
            type="datetimerange"
            time-arrow-control
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd HH:mm:ss"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-input v-model="formData.legal_person" placeholder="法人查询" prefix-icon="el-icon-user" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="formData.phone" placeholder="管理员手机号查询" prefix-icon="el-icon-mobile-phone" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-select v-model="formData.state" placeholder="信息审核状态" clearable>
            <el-option label="待审" :value="0"></el-option>
            <el-option label="成功" :value="1"></el-option>
            <el-option label="失败" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select v-model="formData.status" placeholder="登录审核状态" clearable>
            <el-option label="待审" :value="0"></el-option>
            <el-option label="成功" :value="1"></el-option>
            <el-option label="失败" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="map_login_status" label="已锁定的商家" border></el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="search">
            搜索
          </el-button>
        </el-form-item>
      </el-form>
      <comm-table
        :tableData="tableData"
        :columns="columns"
        :pagination="pagination"
        :showLoading="showLoading"
        :showOrder="false"
        border
      ></comm-table>
      <comm-pagination :total="pagination.total" @pageChange="pageChange"></comm-pagination>
    </el-card>

    <el-dialog
      title="切换场景"
      :visible.sync="toggleSceneData.sceneDialog"
      :close-on-click-modal="false"
      append-to-body
      width="500px"
      class="dialog"
    >
      <el-radio v-model="toggleSceneData.sceneTpID" :label="1" border style="margin-right: 0;">
        一类场景
      </el-radio>
      <el-radio v-model="toggleSceneData.sceneTpID" :label="2" border>
        二类场景
      </el-radio>
      <el-button @click="close">取消</el-button>
      <el-button type="primary" @click="submitToggleScene">提交</el-button>
    </el-dialog>

    <el-dialog
      title="修改密码"
      :visible.sync="passwordData.passwordDialog"
      :close-on-click-modal="false"
      append-to-body
      width="600px"
      class="dialog"
    >
      <div class="password">
        <el-input v-model="passwordData.password" placeholder="请输入密码"></el-input>
        <el-input v-model="passwordData.repassword" placeholder="请确认密码"></el-input>
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="submitPassword">提交</el-button>
      </div>
    </el-dialog>

    <el-drawer :visible.sync="showAddDrawer" direction="ltr" @open="$bus.$emit('addOpen')" class="drawer-win add" :wrapperClosable="false">
      <div slot="title">
        <div class="drawer-title">
          <i class="el-icon-shangjia iconfont"></i>
          商家入驻
        </div>
      </div>
      <merchant-add-win></merchant-add-win>
    </el-drawer>

    <el-drawer :visible.sync="showAuditDrawer" direction="rtl" @open="$bus.$emit('auditOpen')" class="drawer-win audit">
      <div slot="title">
        <div class="drawer-title">
          <i class="el-icon-shangjia iconfont"></i>
          商家审核
        </div>
      </div>
      <merchant-audit-win :checkData="checkData"></merchant-audit-win>
    </el-drawer>
  </div>
</template>

<script>
import CommCardHeader from "@/components/CommCardHeader";
import CommTable from "@/components/CommTable";
import CommPagination from "@/components/CommPagination";
import { marchantList } from "js/tableConfig";
import merchantAddWin from "./merchantAddWin";
import merchantAuditWin from "./merchantAuditWin";
export default {
  data: () => ({
    showLoading: false,
    columns: marchantList,
    tableData: [],
    pagination: { total: 0, currentPage: 1, pageSize: 10 },
    formData: {
      time: "",
      legal_person: "",
      phone: "",
      state: "",
      status: "",
      login_status: 0
    },
    toggleSceneData: {
      sceneDialog: false,
      sceneID: "",
      sceneTpID: ""
    },
    passwordData: {
      passwordDialog: false,
      passwordID: "",
      password: "",
      repassword: ""
    },
    showAddDrawer: false,
    showAuditDrawer: false,
    auditLoading: -1,
    tovipLoading: -1,
    recusalLoading: -1,
    lockLoading: -1,
    recoverLoading: -1,
    checkData: null
  }),
  computed: {
    map_login_status: {
      get() {
        return this.formData.login_status === 1;
      },
      set(newVal) {
        this.formData.login_status = newVal ? 1 : 0;
      }
    }
  },
  methods: {
    //页码数据
    pageChange(data) {
      this.pagination.currentPage = data.currentPage;
      this.pagination.pageSize = data.pageSize;
      this.getData();
    },
    //获取数据
    getData() {
      this.showLoading = true;
      this.$http.merchant
        .merchantList({
          page: this.pagination.currentPage,
          limit: this.pagination.pageSize,
          legal_person: this.formData.legal_person,
          phone: this.formData.phone,
          state: this.formData.state,
          status: this.formData.status,
          login_status: this.formData.login_status,
          time1: this.formData.time ? this.formData.time[0] : "",
          time2: this.formData.time ? this.formData.time[1] : ""
        })
        .then(res => {
          this.showLoading = false;
          res.data.map(item => {
            item.show_card_back = process.env.VUE_APP_BASE_URL + "/" + item.card_back;
            item.show_card_front = process.env.VUE_APP_BASE_URL + "/" + item.card_front;
            item.show_license = process.env.VUE_APP_BASE_URL + "/" + item.license;
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
    //搜索
    search() {
      this.getData();
    },
    //场景切换
    toggleScene(row) {
      this.toggleSceneData.sceneDialog = true;
      this.toggleSceneData.sceneID = row.id;
      this.toggleSceneData.sceneTpID = row.tp_id;
    },
    //场景切换提交
    submitToggleScene() {
      this.$http.merchant
        .merchantScene({
          id: this.toggleSceneData.sceneID,
          tp_id: this.toggleSceneData.sceneTpID
        })
        .then(() => {
          this.$message.success("操作成功");
          this.refresh();
        })
        .catch(() => {});
    },
    //修改密码
    openPassword(row) {
      this.passwordData.passwordDialog = true;
      this.passwordData.passwordID = row.id;
    },
    //修改密码提交
    submitPassword() {
      if (!this.passwordData.password) {
        this.$message.error("请输入密码");
        return;
      }
      if (!this.passwordData.repassword) {
        this.$message.error("请确认密码");
        return;
      }
      if (this.passwordData.password !== this.passwordData.repassword) {
        this.$message.error("两次输入的密码不一致");
        return;
      }
      this.$http.merchant
        .merchantPwd({
          id: this.passwordData.passwordID,
          password: this.passwordData.password
        })
        .then(() => {
          this.$message.success("操作成功");
          this.close();
        })
        .catch(() => {});
    },
    //去登陆
    toLoing() {
      this.$alert("尽情期待", "暂未开放", { type: "warning" });
    },
    //认证切换
    beToVIP(row, sole, node) {
      const tips = sole === 0 ? "是否认证该商家？" : "是否取消认证该商家？";
      this.$confirm(tips, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          const loadingIndex = node.getAttribute("loading-index");
          if (sole === 0) {
            this.tovipLoading = loadingIndex;
          } else {
            this.recusalLoading = loadingIndex;
          }
          this.$http.merchant
            .merchantVIP({ id: row.id, vip: sole })
            .then(() => {
              this.$message.success("操作成功");
              this.refresh();
            })
            .catch(() => {});
        })
        .catch(() => {});
    },
    //锁定切换
    lock(row, sole, node) {
      const tips = sole === 0 ? "是否将该商家恢复？" : "是否将该商家锁定？";
      this.$confirm(tips, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          const loadingIndex = node.getAttribute("loading-index");
          if (sole === 0) {
            this.recoverLoading = loadingIndex;
          } else {
            this.lockLoading = loadingIndex;
          }
          this.$http.merchant
            .merchantLock({ id: row.id, lock: sole })
            .then(() => {
              this.$message.success("操作成功");
              this.refresh();
            })
            .catch(() => {});
        })
        .catch(() => {});
    },
    //关闭弹窗
    close() {
      this.toggleSceneData.sceneDialog = false;
      this.passwordData.passwordDialog = false;
    },
    //打开添加审核滑窗
    open(params, data, node) {
      if (params !== 0) {
        //审核窗
        const { province, city } = data;
        //获取省市
        this.auditLoading = node.getAttribute("loading-index");
        this.$http.merchant
          .provinceCity({ province, city })
          .then(res => {
            this.auditLoading = -1;
            this.checkData = data;
            this.checkData.provinceShow = res.data.province;
            this.checkData.cityShow = res.data.city;
            this.showAddDrawer = false;
            this.showAuditDrawer = true;
          })
          .catch(() => (this.auditLoading = -1));
      } else {
        //添加窗
        this.showAuditDrawer = false;
        this.showAddDrawer = true;
      }
    },
    //刷新页面
    refresh() {
      this.$router.replace({
        path: "/refresh",
        query: {
          t: Date.now()
        }
      });
    }
  },
  created() {
    this.getData();
  },
  components: {
    CommCardHeader,
    CommTable,
    CommPagination,
    merchantAddWin,
    merchantAuditWin
  }
};
</script>

<style lang="scss" scoped>
::v-deep .el-form {
  .el-select,
  .el-input {
    width: 180px;
  }
}

.add {
  ::v-deep .el-drawer {
    min-width: 700px;
  }
}

.audit {
  ::v-deep .el-drawer {
    min-width: 600px;
  }
}

::v-deep .el-drawer {
  .drawer-title {
    font-size: 22px;
    .iconfont {
      font-size: 26px;
      vertical-align: -3px;
      margin-right: 3px;
    }
  }
}

.password {
  .el-input {
    width: 180px;
    margin-right: 10px;
  }
}
</style>
