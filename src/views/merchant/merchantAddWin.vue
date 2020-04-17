<template>
  <div>
    <el-form :model="formData" :rules="rules" ref="form" label-width="130px" inline-message class="add-form">
      <el-form-item prop="company" label="商家名称">
        <el-input v-model="formData.company" prefix-icon="el-icon-shangjia iconfont" placeholder="请输入商家名称" clearable> </el-input>
      </el-form-item>
      <el-divider></el-divider>

      <el-form-item label="所属场景">
        <el-select v-model="formData.work" placeholder="请选择所属场景" disabled>
          <el-option label="二类场景" :value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-divider></el-divider>

      <el-form-item prop="legal_person" label="法人姓名">
        <el-input v-model="formData.legal_person" prefix-icon="el-icon-user" placeholder="请输入法人姓名" clearable></el-input>
      </el-form-item>
      <el-divider></el-divider>

      <el-form-item prop="card_number" label="法人身份证号">
        <el-input v-model="formData.card_number" prefix-icon="el-icon-postcard" placeholder="请输入法人身份证号" clearable></el-input>
      </el-form-item>
      <el-divider></el-divider>

      <el-form-item label="法人身份证">
        <div class="images">
          <div class="item" v-for="item of uploads" :key="item.text">
            <span>{{ item.text }}</span>
            <el-upload
              class="uploader"
              action="/ad/upload"
              with-credentials
              :show-file-list="false"
              :headers="{ Authorization: 'Bearer ' + token }"
              :on-success="uploadSuccess"
              @click.native="upload(item.label)"
            >
              <img v-if="item.img" :src="item.showImg" />
              <i v-else class="el-icon-plus uploader-icon"></i>
            </el-upload>
            <el-button v-show="item.img" type="text" @click.stop.prevent="onPreview(item.showImg)">
              大图预览
            </el-button>
          </div>
        </div>
      </el-form-item>
      <el-divider></el-divider>

      <el-form-item prop="realname" label="管理员名称">
        <el-input v-model="formData.realname" prefix-icon="el-icon-discount" placeholder="请输入管理员名称" clearable></el-input>
      </el-form-item>
      <el-divider></el-divider>

      <el-form-item prop="phone" label="管理员手机">
        <el-input v-model="formData.phone" prefix-icon="el-icon-mobile-phone" placeholder="请输入管理员手机" clearable></el-input>
      </el-form-item>
      <el-divider></el-divider>

      <el-form-item prop="email" label="邮箱">
        <el-input v-model="formData.email" prefix-icon="el-icon-message" placeholder="请输入邮箱" clearable></el-input>
      </el-form-item>
      <el-divider></el-divider>

      <el-form-item prop="password" label="密码">
        <el-input v-model="formData.password" prefix-icon="el-icon-unlock" placeholder="请输入密码" clearable show-password></el-input>
      </el-form-item>
      <el-divider></el-divider>

      <el-form-item prop="mobile" label="座机">
        <el-input v-model="formData.mobile" prefix-icon="el-icon-phone-outline" placeholder="请输入座机" clearable></el-input>
      </el-form-item>
      <el-divider></el-divider>

      <el-form-item prop="province" label="所在省市">
        <el-cascader v-model="formData.province" :options="provinceList" :props="props" clearable></el-cascader>
      </el-form-item>
      <el-divider></el-divider>

      <el-form-item prop="address" label="详细地址">
        <el-input v-model="formData.address" prefix-icon="el-icon-office-building" placeholder="请输入地址" clearable></el-input>
      </el-form-item>
      <el-divider></el-divider>

      <el-form-item prop="desc" label="商家简介">
        <el-input v-model="formData.desc" placeholder="请输入简介" clearable type="textarea" rows="4"></el-input>
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
import { mapState, mapMutations } from "vuex";
export default {
  data: () => ({
    uploadType: "",
    props: null,
    card_front: false,
    card_back: false,
    license: false,
    show_card_front: "",
    show_card_back: "",
    show_license: "",
    formData: {
      company: "",
      work: 2,
      legal_person: "",
      card_number: "",
      card_front: "",
      card_back: "",
      license: "",
      realname: "",
      phone: "",
      email: "",
      password: "",
      mobile: "",
      province: "",
      address: "",
      desc: ""
    },
    rules: {
      company: [{ required: true, message: "请输入商家名称", trigger: "blur" }],
      legal_person: [{ required: true, message: "请输入法人名称", trigger: "blur" }],
      card_number: [
        { required: true, message: "请输入法人身份证号", trigger: "blur" },
        { min: 18, max: 18, message: "请输入18位的身份证号", trigger: "change" }
      ],
      realname: [{ required: true, message: "请输入管理员名称", trigger: "blur" }],
      phone: [
        { required: true, message: "请输入管理员手机号", trigger: "blur" },
        { min: 11, max: 11, message: "请输入11位的手机号", trigger: "change" }
      ],
      password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      email: [{ required: true, message: "请输入邮箱", trigger: "blur" }],
      mobile: [{ required: true, message: "请输入座机", trigger: "blur" }],
      province: [{ required: true, message: "请选择省市", trigger: "blur" }],
      city: [{ required: true, message: "请选择城市", trigger: "blur" }],
      address: [{ required: true, message: "请输入详细地址", trigger: "blur" }],
      desc: [{ required: true, message: "请输入商家简介", trigger: "blur" }]
    }
  }),
  mixins: [preview],
  computed: {
    ...mapState(["token", "provinceList"]),
    uploads() {
      return [
        {
          text: "身份证正面",
          label: "card_front",
          img: this.card_front,
          showImg: this.show_card_front
        },
        {
          text: "身份证背面",
          label: "card_back",
          img: this.card_back,
          showImg: this.show_card_back
        },
        {
          text: "营业执照",
          label: "license",
          img: this.license,
          showImg: this.show_license
        }
      ];
    }
  },
  methods: {
    ...mapMutations(["SET_PROVINCE_LIST"]),

    upload(type) {
      setTimeout(() => {
        this.uploadType = type;
      }, 500);
    },

    uploadSuccess(res, file) {
      this[this.uploadType] = true;
      this.formData[this.uploadType] = res.file_name;
      this[`show_${this.uploadType}`] = URL.createObjectURL(file.raw);
      this.$message.success("上传成功");
    },

    //获取省份
    getProvince() {
      const len = this.provinceList.length;
      if (len > 0) return;
      this.$http.merchant
        .provinceList()
        .then(res => {
          const result = res.data.map(item => {
            const { id, name } = item;
            return { value: id, label: name };
          });
          this.SET_PROVINCE_LIST(result);
        })
        .catch(() => {});
    },

    //根据省份获取城市子叶
    getCity(id, callback) {
      this.$http.merchant
        .provinceCity({ pid: id })
        .then(res => {
          const result = res.data.map(item => {
            const { id, name } = item;
            return { value: id, label: name };
          });
          callback(result);
        })
        .catch(() => {});
    },

    submit() {
      const form = this.$refs.form;
      form.validate(valid => {
        if (valid) {
          if (!this.formData.card_front || !this.formData.card_back || !this.formData.license) {
            this.$message.error("请上传身份证照片及营业执照");
            return;
          }
          this.$confirm("确定添加该商家？", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              const [province, city] = this.formData.province;
              this.formData.province = province;
              this.formData.city = city;
              this.$http.merchant
                .merchantAdd(this.formData)
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
    },
    close() {
      this.$parent.$parent.$data.showAddDrawer = false;
    }
  },
  created() {
    this.getProvince();
    this.props = {
      lazy: true,
      lazyLoad: (node, resolve) => this.getCity(node.value, resolve)
    };
  },
  mounted() {
    const formDom = this.$refs.form;
    this.$bus.$on("addOpen", () => {
      formDom.resetFields();
      this.card_front = false;
      this.card_back = false;
      this.license = false;
      this.show_card_front = "";
      this.show_card_back = "";
      this.show_license = "";
    });
  }
};
</script>

<style lang="scss" scoped>
.add-form {
  padding: 0 20px 50px 30px;
  .el-divider {
    margin: 15px 0;
    background-color: #e8ebf3;
  }
  ::v-deep .el-form-item {
    margin: 0;
    .el-form-item__label {
      font-weight: bold;
      padding: 0 30px 0 0;
    }
    .el-input {
      width: 300px;
      .el-input__icon {
        vertical-align: middle;
      }
    }
    .el-button {
      margin-top: 20px;
      margin-right: 10px;
    }
  }
}

.images {
  display: flex;
  .item {
    margin: 0 30px 5px 0;
    text-align: center;
    .el-button {
      margin-top: 0;
    }
  }
}

.uploader {
  width: 100px;
  height: 80px;
  ::v-deep .el-upload {
    width: 100%;
    height: 100%;
    border: 1px solid #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    &:hover {
      border-color: #409eff;
    }
    .uploader-icon {
      font-size: 18px;
      color: #8c939d;
      width: 100%;
      height: 100%;
      line-height: 80px;
      &:hover {
        color: #409eff;
      }
    }
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
