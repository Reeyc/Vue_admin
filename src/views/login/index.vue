<template>
  <div id="login">
    <!-- 滑块验证 -->
    <div class="slideShadow" v-show="showSlide">
      <transition>
        <div class="slideSty animated bounce">
          <slide-verify
            @success="onSuccess"
            @fail="onFail"
            :sliderText="verify.text"
            :w="verify.w"
            :h="verify.h"
            ref="slideDiv"
          ></slide-verify>
          <div class="iconBtn">
            <i class="el-icon-circle-close" @click="showSlide = false"></i>
            <i class="el-icon-refresh" @click="refresh"></i>
          </div>
        </div>
      </transition>
    </div>
    <!-- 表单块 -->
    <div class="loginBox">
      <div class="loginCon">
        <div class="titleDiv">
          <h3>Sign up now</h3>
          <p>Enter your username and password to log on:</p>
          <i class="el-icon-key"></i>
        </div>
        <el-form class="form" ref="loginForm" :rules="rules" :model="ruleForm" @keyup.enter.native="loginYz">
          <el-form-item prop="user">
            <el-input placeholder="请输入账号" prefix-icon="el-icon-user" v-model="ruleForm.user"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input placeholder="请输入密码" prefix-icon="el-icon-lock" v-model="ruleForm.password" show-password></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="loginBtn" @click="loginYz"> 登录 </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import SlideVerify from "@/components/SlideVerify";
import { mapActions } from "vuex";
export default {
  data: () => ({
    showSlide: false,
    verify: {
      w: 350,
      h: 175,
      text: "向右滑动"
    },
    ruleForm: {
      user: "",
      password: "",
      phone: ""
    },
    rules: {
      user: [{ required: true, message: "请输入用户名", trigger: "blur" }],
      password: [{ required: true, message: "请输入密码", trigger: "blur" }]
    }
  }),
  methods: {
    ...mapActions(["_login"]),
    shopTip() {
      this.$notify({
        title: "提示",
        message: "管理员账号：admin、密码为：123456",
        duration: 0,
        iconClass: "el-icon-s-opportunity"
      });
    },
    loginYz() {
      const form = this.$refs.loginForm;
      form.validate(valid => {
        if (valid) {
          this.showSlide = true;
        } else {
          return;
        }
      });
    },
    onSuccess() {
      this.showSlide = false;
      this.login();
    },
    onFail() {
      this.$message.error("验证失败");
    },
    refresh() {
      this.$refs.slideDiv.reset();
    },
    login() {
      this._login({ username: this.ruleForm.user, password: this.ruleForm.password })
        .then(() => {
          this.$notify.closeAll();
          this.refresh();
          this.$router.push("/");
        })
        .catch(() => this.refresh());
    }
  },
  mounted() {
    this.shopTip();
  },
  components: { SlideVerify }
};
</script>
<style scoped lang="scss">
#login {
  position: relative;
  height: 100%;
  width: 100%;
  background: url(../../assets/img/loginBg.jpg) no-repeat center;
  background-size: 100% 100%;
  overflow: hidden;
  .slideShadow {
    position: fixed;
    z-index: 999;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    .slideSty {
      position: absolute;
      width: 380px;
      height: 311px;
      background: #e8e8e8;
      border: 1px solid #dcdcdc;
      left: 50%;
      top: 50%;
      margin-left: -188px;
      margin-top: -176px;
      z-index: 99;
      border-radius: 5px;
      .iconBtn {
        padding: 9px 0 0 19px;
        color: #5f5f5f;
        border-top: 1px solid #d8d8d8;
        margin-top: 17px;
        i {
          font-size: 22px;
          cursor: pointer;
        }
        i:last-child {
          margin-left: 7px;
        }
      }
    }
  }
  .loginBox {
    height: 455px;
    width: 550px;
    margin: 0 auto;
    position: relative;
    z-index: 1;
    top: 50%;
    margin-top: -200px;
    .loginCon {
      background: #eee;
      border-radius: 4px;
      .titleDiv {
        padding: 0 28px;
        background: #fff;
        position: relative;
        height: 120px;
        border-radius: 4px 4px 0 0;
        h3 {
          font-size: 22px;
          color: #555;
          font-weight: initial;
          padding-top: 23px;
        }
        p {
          font-size: 16px;
          color: #888;
          padding-top: 12px;
        }
        i {
          font-size: 65px;
          color: #ddd;
          position: absolute;
          right: 27px;
          top: 29px;
        }
      }
    }
    .form {
      padding: 35px 20px 10px 20px;
      background: #eee;
      border-radius: 0 0 4px 4px;
      .el-form-item {
        margin-bottom: 30px;
        ::v-deep .el-input__inner {
          height: 45px;
        }
        .loginBtn {
          width: 100%;
          background: #19b9e7;
        }
      }
    }
  }
}
</style>

<style lang="scss">
.slideSty {
  .slide-verify {
    margin: 13px auto 0 auto;
    width: 350px !important;
  }
  .slide-verify-slider {
    width: 100% !important;
  }
  .slide-verify-refresh-icon {
    display: none;
  }
}
.el-icon-s-opportunity {
  color: #ff8900;
}
</style>
