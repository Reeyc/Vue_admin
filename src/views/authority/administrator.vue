<template>
  <div id="adminList">
    <el-card>
      <div slot="header">
        <comm-card-header title="管理员列表" iconClass="el-icon-s-custom" refresh>
          <el-button type="primary" icon="el-icon-circle-plus-outline" @click="doAdd"> 新增管理员 </el-button>
        </comm-card-header>
      </div>
      <comm-table :tableData="tableData" :columns="columns" :pagination="pagination" :showLoading="showLoading" border></comm-table>
      <comm-pagination :total="pagination.total" @pageChange="pageChange"></comm-pagination>
    </el-card>

    <el-dialog :title="dialogTitle" :visible.sync="dialog" :close-on-click-modal="false">
      <!-- add -->
      <el-form v-show="showWin.addWin" :rules="addRules" :model="addData" ref="addWin" label-width="120px" class="add">
        <el-form-item prop="username" label="账号：">
          <el-input v-model="addData.username" placeholder="请输入账号" clearable></el-input>
        </el-form-item>
        <el-form-item prop="name" label="姓名：">
          <el-input v-model="addData.name" placeholder="请输入姓名" clearable></el-input>
        </el-form-item>
        <el-form-item prop="phone" label="手机号：">
          <el-input v-model="addData.phone" placeholder="请输入手机号" clearable></el-input>
        </el-form-item>
        <el-form-item prop="password" label="密码：">
          <el-input v-model="addData.password" placeholder="请输入密码" show-password clearable></el-input>
        </el-form-item>
        <el-form-item prop="repassword" label="确认密码：">
          <el-input v-model="addData.repassword" placeholder="请确认密码" show-password clearable></el-input>
        </el-form-item>
        <el-form-item prop="group" label="角色分组：">
          <el-radio-group v-model="addData.group">
            <el-radio v-for="item of showGrantList" :key="item.group_id" :label="item.group_id" border>{{ item.title }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="备注信息：">
          <el-input v-model="addData.remark" placeholder="请输入备注信息" type="textarea" :rows="5" clearable></el-input>
        </el-form-item>
        <el-form-item label=" ">
          <el-button @click="dialog = false">取消</el-button>
          <el-button type="primary" @click="submitAdd">提交</el-button>
        </el-form-item>
      </el-form>

      <!-- edit -->
      <el-form v-show="showWin.editWin" :rules="addRules" :model="editData" ref="editWin" label-width="120px" class="edit">
        <el-form-item prop="username" label="账号：">
          <el-input v-model="editData.username" placeholder="请输入账号" clearable></el-input>
        </el-form-item>
        <el-form-item prop="name" label="姓名：">
          <el-input v-model="editData.name" placeholder="请输入姓名" clearable></el-input>
        </el-form-item>
        <el-form-item prop="phone" label="手机号：">
          <el-input v-model="editData.phone" placeholder="请输入手机号" clearable></el-input>
        </el-form-item>
        <el-form-item label="状态：">
          <el-switch v-model="switchVal" active-color="#13ce66" inactive-color="#ff4949" active-text="启用" inactive-text="禁用">
          </el-switch>
        </el-form-item>
        <el-form-item label="备注信息：">
          <el-input v-model="editData.remark" placeholder="请输入备注信息" type="textarea" :rows="5" clearable></el-input>
        </el-form-item>
        <el-form-item label=" ">
          <el-button @click="dialog = false">取消</el-button>
          <el-button type="primary" @click="submitEdit">提交</el-button>
        </el-form-item>
      </el-form>

      <!-- pwd -->
      <el-form v-show="showWin.passWin" :rules="passRules" :model="passData" ref="passWin" label-width="120px" inline-message>
        <el-form-item prop="password" label="输入密码：">
          <el-input v-model="passData.password" placeholder="请输入密码" show-password clearable></el-input>
        </el-form-item>
        <el-form-item prop="repassword" label="确认密码：">
          <el-input v-model="passData.repassword" placeholder="请确认密码" show-password clearable></el-input>
        </el-form-item>
        <el-form-item label=" ">
          <el-button @click="dialog = false">取消</el-button>
          <el-button type="primary" @click="submitPwd">提交</el-button>
        </el-form-item>
      </el-form>

      <!-- allot -->
      <el-form v-show="showWin.allotWin" :model="allotData" label-width="120px" class="allot">
        <el-form-item label="选择分组：">
          <el-radio-group v-model="allotData.group_id">
            <el-radio v-for="item of showGrantList" :key="item.group_id" :label="item.group_id" border>{{ item.title }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label=" ">
          <el-button @click="dialog = false">取消</el-button>
          <el-button type="primary" @click="submitGrant">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import CommCardHeader from "@/components/CommCardHeader";
import CommTable from "@/components/CommTable";
import CommPagination from "@/components/CommPagination";
import { administrator } from "js/tableConfig";
import { mapState } from "vuex";
import md5 from "js-md5";
export default {
  data: () => ({
    showLoading: false,
    columns: administrator,
    grantList: [],
    tableData: [],
    pagination: { total: 0, currentPage: 1, pageSize: 10 },

    dialog: false,
    dialogTitle: "",
    showWin: {
      addWin: false,
      editWin: false,
      passWin: false,
      allotWin: false
    },

    addData: {
      username: "",
      name: "",
      password: "",
      repassword: "",
      group: "",
      phone: "",
      remark: ""
    },
    editData: {},
    passData: {
      id: "",
      password: "",
      repassword: ""
    },
    allotData: {
      id: "",
      group_id: ""
    },
    delLoading: -1,

    addRules: {
      username: [{ required: true, message: "请输入账号" }],
      name: [{ required: true, message: "请输入名称" }],
      password: [{ required: true, message: "请输入密码" }],
      repassword: [{ required: true, message: "请确认密码" }],
      group: [{ required: true, message: "请选择分组" }],
      phone: [{ required: true, message: "请输入手机" }]
    },
    passRules: {
      password: [{ required: true, message: "请输入密码" }],
      repassword: [{ required: true, message: "请确认密码" }]
    }
  }),
  computed: {
    ...mapState(["userInfo"]),
    switchVal: {
      get() {
        return this.editData.status === 1;
      },
      set(newVal) {
        this.editData.status = newVal ? 1 : 0;
      }
    },
    showGrantList() {
      return this.grantList.filter(item => item.super !== 1);
    }
  },
  methods: {
    pageChange(data) {
      this.pagination.currentPage = data.currentPage;
      this.pagination.pageSize = data.pageSize;
      this.getData();
    },

    //管理员列表
    getData() {
      this.showLoading = true;
      return this.$http.admin
        .adminList({
          page: this.pagination.currentPage,
          limit: this.pagination.pageSize
        })
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

    //权限组列表
    groupList() {
      this.$http.admin
        .groupList()
        .then(res => (this.grantList = res.data))
        .catch(() => {});
    },

    //窗口切换
    openWin(current, title) {
      Object.keys(this.showWin).forEach(key => (this.showWin[key] = false));
      this.showWin[current] = true;
      this.dialogTitle = title;
      this.dialog = true;
    },

    //添加管理员
    doAdd() {
      this.$refs.addWin && this.$refs.addWin.resetFields();
      this.openWin("addWin", "新增管理员");
    },
    submitAdd() {
      this.$refs.addWin.validate(valid => {
        if (valid) {
          if (this.addData.password !== this.addData.repassword) {
            this.$message.error("两次输入的密码不一致");
            return;
          }
          this.$confirm("是否新增该管理员?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              this.$http.admin
                .adminAdd(
                  Object.assign({}, this.addData, {
                    password: md5(this.addData.password),
                    repassword: md5(this.addData.repassword)
                  })
                )
                .then(() => {
                  this.$message.success("操作成功");
                  this.$router.replace("/refresh");
                })
                .catch(() => {});
            })
            .catch(() => {});
        } else {
          return false;
        }
      });
    },

    //编辑管理员
    doEdit(row) {
      this.editData = row;
      this.openWin("editWin", "管理员编辑");
    },
    submitEdit() {
      this.$refs.editWin.validate(valid => {
        if (valid) {
          this.$confirm("是否修改该管理员?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              this.$http.admin
                .adminEdit(this.editData)
                .then(() => {
                  this.$message.success("操作成功");
                  this.$router.replace("/refresh");
                })
                .catch(() => {});
            })
            .catch(() => {});
        } else {
          return false;
        }
      });
    },

    //修改密码
    rePass(row) {
      this.passData.password = "";
      this.passData.repassword = "";
      this.passData.id = row.id;
      this.openWin("passWin", "修改密码");
    },
    submitPwd() {
      this.$refs.passWin.validate(valid => {
        if (valid) {
          if (this.passData.password !== this.passData.repassword) {
            this.$message.error("两次输入的密码不一致");
            return;
          }
          this.$http.admin
            .adminPwd(this.passData)
            .then(() => {
              this.$message.success("操作成功");
              this.dialog = false;
            })
            .catch(() => {});
        } else {
          return false;
        }
      });
    },

    //分配角色
    doAllot(row) {
      this.allotData.id = row.id;
      this.allotData.group_id = row.group_id;
      this.openWin("allotWin", "分配角色");
    },
    submitGrant() {
      this.$http.admin
        .adminGrant(this.allotData)
        .then(() => {
          this.$message.success("操作成功");
          this.$router.replace("/refresh");
        })
        .catch(() => {});
    },

    //删除管理员
    doDelele(row, node) {
      this.$confirm("是否永久删除该管理员?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.delLoading = node.getAttribute("loading-index");
          this.$http.admin
            .adminDel({ uid: row.id })
            .then(() => {
              this.$message.success("操作成功");
              this.$router.replace("/refresh");
            })
            .catch(() => {});
        })
        .catch(() => {});
    }
  },

  async created() {
    try {
      await this.groupList();
      this.getData();
    } catch (error) {
      console.log(error);
    }
  },
  components: { CommCardHeader, CommTable, CommPagination }
};
</script>

<style lang="scss" scoped>
#adminList {
  ::v-deep .el-dialog {
    min-width: 800px;
  }
}

.el-input,
.el-textarea {
  width: 400px;
}

.add,
.edit {
  .el-radio {
    width: auto;
    margin: 0 3px;
  }
}

.allot {
  .el-radio {
    margin-right: 0px;
  }
}
</style>
