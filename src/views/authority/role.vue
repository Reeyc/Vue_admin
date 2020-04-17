<template>
  <div id="groupList">
    <el-card>
      <div slot="header">
        <comm-card-header title="角色组列表" iconClass="el-icon-discount" refresh>
          <el-button type="primary" icon="el-icon-circle-plus-outline" @click="doAdd"> 新增角色组 </el-button>
        </comm-card-header>
      </div>
      <comm-table :tableData="tableData" :columns="columns" :pagination="pagination" :showLoading="showLoading"></comm-table>
      <comm-pagination :total="pagination.total" @pageChange="pageChange"></comm-pagination>
    </el-card>

    <el-dialog :title="dialogTitle" :visible.sync="dialog" @close="close">
      <el-form :model="data" :rules="formRules" ref="win" label-width="120px" class="form">
        <el-form-item prop="title" label="名称：">
          <el-input v-model="data.title" placeholder="请输入组名称" clearable></el-input>
        </el-form-item>
        <el-form-item label="说明：">
          <el-input v-model="data.remark" placeholder="请输入组说明" clearable></el-input>
        </el-form-item>
        <el-form-item label="状态：" v-show="currentType === 'edit'">
          <el-switch v-model="switchVal" active-color="#13ce66" inactive-color="#ff4949" active-text="启用组" inactive-text="禁用组">
          </el-switch>
        </el-form-item>
        <el-form-item label="权限：" style="margin-bottom: 30px;">
          <el-tree :data="filterTree" node-key="id" show-checkbox @check-change="handleCheckChange" ref="tree"></el-tree>
        </el-form-item>
        <el-form-item>
          <el-button @click="close">取消 </el-button>
          <el-button type="primary" @click="submitInfo">提交 </el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import CommCardHeader from "@/components/CommCardHeader";
import CommTable from "@/components/CommTable";
import CommPagination from "@/components/CommPagination";
import { role } from "js/tableConfig";
import { filterRouter, asyncRoutes } from "@/router";
export default {
  data: () => ({
    showLoading: false,
    columns: role,
    tableData: [],
    pagination: { total: 0, currentPage: 1, pageSize: 10 },

    currentType: "add",
    dialog: false,
    dialogTitle: "",

    data: {
      id: "",
      title: "",
      remark: "",
      status: ""
    },

    allRouter: [], //全部路由菜单
    roles: [], //当前选中的节点

    formRules: {
      title: [{ required: true, message: "请输入组名称", trigger: "blur" }]
    }
  }),
  computed: {
    switchVal: {
      get() {
        return this.data.status === 1;
      },
      set(newVal) {
        this.data.status = newVal ? 1 : 0;
      }
    },
    filterTree() {
      const handler = list => {
        const result = [];
        list.forEach(item => {
          const { id, label, topMenu, noRenderMenu } = item.meta;
          //不加入侧边栏
          if (noRenderMenu) return;
          if (topMenu) {
            //顶级菜单（展示子级数据，携带父级ID）
            const { id: childId, label } = item.children[0].meta;
            result.push({ id: childId, pid: id, label });
          } else {
            //非顶级菜单
            const newItem = { id, label };
            if (item.children) {
              newItem.children = handler(item.children);
            }
            result.push(newItem);
          }
        });
        return result;
      };
      return handler(this.allRouter);
    }
  },
  methods: {
    pageChange(data) {
      this.pagination.currentPage = data.currentPage;
      this.pagination.pageSize = data.pageSize;
      this.getData();
    },
    getData() {
      this.showLoading = true;
      return this.$http.admin
        .groupList({
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

    //获取全部路由菜单
    getRules() {
      this.$http.admin
        .allGrant()
        .then(res => (this.allRouter = filterRouter(asyncRoutes, res.data)))
        .catch(() => {});
    },

    open(current, title) {
      this.currentType = current;
      this.dialogTitle = title;
      this.dialog = true;
    },
    close() {
      this.dialog = false;
      //清空多选
      this.$refs.tree && this.$refs.tree.setCheckedNodes([]);
    },

    doAdd() {
      Object.keys(this.data).forEach(key => (this.data[key] = ""));
      this.open("add", "新增角色组");
    },

    doEdit(row) {
      this.data = row;
      this.open("edit", "角色组编辑");
      this.roles = row.roles;
      this.$nextTick(() => {
        this.roles.forEach(role => {
          this.$refs.tree && this.$refs.tree.setChecked(role, true);
        });
      });
    },

    handleCheckChange() {
      //全选（父叶）
      const parentLeaf = this.$refs.tree.getCheckedNodes();
      //半选（子叶）
      const childLeaf = this.$refs.tree.getHalfCheckedNodes();
      const result = [];
      [...parentLeaf, ...childLeaf].forEach(item => {
        if (item.pid) {
          result.push(item.pid, item.id);
        } else {
          result.push(item.id);
        }
      });
      this.roles = result;
    },

    submitInfo() {
      this.$refs.win.validate(valid => {
        if (valid) {
          if (this.roles.length < 1) {
            this.$message.error("至少要勾选一个菜单");
            return;
          }
          const option = {
            add: {
              tips: "新增",
              API: this.$http.admin.groupAdd,
              extar: {}
            },
            edit: {
              tips: "编辑",
              API: this.$http.admin.groupEdit,
              extar: { gid: this.data.group_id, status: this.data.status ? 1 : 0 }
            }
          };

          this.$confirm(`是否${option[this.currentType].tips}该角色组?`, "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              option[this.currentType]
                .API({
                  ...option[this.currentType].extar,
                  title: this.data.title,
                  remark: this.data.remark,
                  roles: this.roles + ""
                })
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

    doDelele(row) {
      this.$confirm("是否永久删除该角色分组?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$http.admin
            .groupDel({ gid: row.group_id })
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
      await this.getRules();
      this.getData();
    } catch (error) {
      console.log(error);
    }
  },
  components: { CommCardHeader, CommTable, CommPagination }
};
</script>

<style lang="scss" scoped>
#groupList {
  ::v-deep .el-dialog {
    min-width: 800px;
  }
}

.el-input,
.el-textarea {
  width: 400px;
}
</style>
