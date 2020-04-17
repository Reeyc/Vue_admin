<template>
  <div>
    <el-dropdown class="userDd">
      <div class="userDrop">
        <span class="userDrop_text">
          {{ userInfo.username }}
          <i class="el-icon-caret-bottom"></i>
        </span>
        <img :src="avatar" alt="user" />
      </div>
      <el-dropdown-menu solt="dropdown" class="user-dropdown">
        <el-dropdown-item @click.native="backHome"> <i class="el-icon-s-home"></i>首页 </el-dropdown-item>
        <el-dropdown-item @click.native="profile"> <i class="el-icon-s-custom"></i>个人信息 </el-dropdown-item>
        <el-dropdown-item @click.native="rePassword"> <i class="iconfont iconxiugaimima"></i>修改密码 </el-dropdown-item>
        <el-dropdown-item @click.native="loginOut" divided> <i class="el-icon-switch-button"></i>登出 </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>

    <el-dialog title="修改个人信息" :visible.sync="profileDialog" :close-on-click-modal="false" append-to-body class="dialog">
      <el-form :model="profileData" :rules="profileRules" ref="profile" label-width="120px" class="profile">
        <el-form-item label="上传头像：">
          <el-upload
            class="avatar-uploader"
            action="/ad/upload"
            with-credentials
            :show-file-list="false"
            :headers="{ Authorization: 'Bearer ' + token }"
            :on-success="uploadSuccess"
          >
            <img v-if="showAvatar" :src="showAvatar" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item prop="name" label="姓名：">
          <el-input v-model="profileData.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item prop="phone" label="手机：">
          <el-input v-model="profileData.phone" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item label=" ">
          <el-button @click="profileDialog = false">取消</el-button>
          <el-button type="primary" @click="submitProfile">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog title="修改密码" :visible.sync="pwdDialog" :close-on-click-modal="false" append-to-body class="dialog">
      <el-form :model="pwdData" :rules="pwdRules" ref="pass" label-width="120px" class="pass" inline inline-message>
        <el-form-item prop="pass" label="输入密码：">
          <el-input v-model="pwdData.pass" placeholder="请输入密码" show-password></el-input>
        </el-form-item>
        <el-form-item prop="repass" label="确认密码：">
          <el-input v-model="pwdData.repass" placeholder="请确认密码" show-password></el-input>
        </el-form-item>
        <el-form-item label=" ">
          <el-button @click="pwdDialog = false">取消</el-button>
          <el-button type="primary" @click="submitPwd">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import md5 from "js-md5";
export default {
  data: () => ({
    showAvatar: "",

    profileDialog: false,
    pwdDialog: false,

    profileData: {
      pic: "",
      name: "",
      phone: ""
    },
    pwdData: {
      pass: "",
      repass: ""
    },

    profileRules: {
      name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
      phone: [{ required: true, message: "请输入手机号", trigger: "blur" }]
    },
    pwdRules: {
      pass: [{ required: true, message: "请输入密码", trigger: "blur" }],
      repass: [{ required: true, message: "请确认密码", trigger: "blur" }]
    }
  }),
  computed: {
    ...mapState(["token", "userInfo"]),
    avatar() {
      return process.env.VUE_APP_BASE_URL + "/" + this.userInfo.pic;
    }
  },
  methods: {
    ...mapMutations(["SET_USER_INFO"]),
    ...mapActions(["_loginOut"]),

    backHome() {
      this.$router.push("/");
    },
    loginOut() {
      this._loginOut();
    },

    profile() {
      this.showAvatar = this.avatar;
      const { pic, name, phone } = this.userInfo;
      this.profileData = { pic, name, phone };
      this.pwdDialog = false;
      this.profileDialog = true;
    },
    uploadSuccess(res, file) {
      this.$message.success("上传成功");
      this.profileData.pic = res.file_name;
      this.showAvatar = URL.createObjectURL(file.raw);
    },
    submitProfile() {
      this.$refs.profile.validate(valid => {
        if (valid) {
          this.$confirm("是否修改个人信息?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              this.$http.header
                .profile(this.profileData)
                .then(res => {
                  this.$message.success("修改成功");
                  this.SET_USER_INFO(res.data);
                  this.profileDialog = false;
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

    rePassword() {
      this.profileDialog = false;
      this.pwdData.pass = "";
      this.pwdData.repass = "";
      this.pwdDialog = true;
    },
    submitPwd() {
      this.$refs.pass.validate(valid => {
        if (valid) {
          if (this.pwdData.pass !== this.pwdData.repass) {
            this.$message.error("两次输入的密码不一致");
            return;
          }
          this.$confirm("是否修改密码?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              this.$http.header
                .loginPwd({
                  password: md5(this.pwdData.pass),
                  repassword: md5(this.pwdData.repass)
                })
                .then(() => {
                  this.$message.success("密码修改成功，请重新登陆");
                  this.loginOut();
                })
                .catch(() => {});
            })
            .catch(() => {});
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
::v-deep .el-dialog {
  min-width: 700px;
}

.user-dropdown {
  a {
    color: inherit;
  }
}

.profile {
  .avatar-uploader {
    ::v-deep .el-upload {
      position: relative;
      border: 1px solid #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      overflow: hidden;
      &:hover {
        border-color: #409eff;
      }
      .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 158px;
        height: 158px;
        line-height: 158px;
        text-align: center;
      }
    }
  }
  .avatar {
    display: block;
    width: 158px;
    height: 158px;
  }
  .el-input {
    width: 400px;
  }
}
.pass {
  .el-form-item {
    display: block;
    .el-input {
      width: 300px;
    }
  }
}
</style>
