<template>
  <div id="addAd">
    <el-card class="container-wrap">
      <div slot="header">
        <comm-card-header title="广告投放" iconClass="iconfont iconguanggao"> </comm-card-header>
      </div>
      <div class="container">
        <el-form :model="formData" :rules="rules" ref="form" label-width="120px">
          <el-form-item prop="pic_type" label="投放类型">
            <el-select v-model="formData.pic_type" placeholder="请选择" @change="picTypeChange">
              <el-option label="首页曝光" value="i"></el-option>
              <el-option label="登录轮播" value="c"></el-option>
              <el-option label="资讯页轮播" value="c2"></el-option>
              <el-option label="资讯页卡片" value="c4"></el-option>
              <el-option label="生活页卡片" value="c5"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item prop="tp_id" label="场景分类" v-if="showTpID">
            <el-radio-group v-model="formData.tp_id" @change="tpIDchange">
              <el-radio-button :label="1">一类场景</el-radio-button>
              <el-radio-button :label="2">二类场景</el-radio-button>
              <el-radio-button :label="3">所有场景</el-radio-button>
            </el-radio-group>
          </el-form-item>

          <el-form-item prop="dev_id" label="投放场景" v-if="showDevID && !showAllDevId">
            <el-select
              v-model="formData.dev_id"
              multiple
              collapse-tags
              placeholder="请选择"
              :loading="devIdLoading"
              loading-text="正在读取场景"
            >
              <el-option v-for="item of devIdList" :key="item.name" :label="item.name" :value="item.dev_id"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="投放场景" v-if="showDevID && showAllDevId">
            <span v-if="showAllDevId">全场景投放</span>
          </el-form-item>

          <el-divider></el-divider>

          <el-form-item prop="pic_name" label="品牌名称">
            <el-input v-model="formData.pic_name" placeholder="请输入名称" maxlength="10" clearable></el-input>
          </el-form-item>

          <el-form-item label="品牌链接">
            <el-input v-model="formData.pic_url" placeholder="请输入链接" clearable></el-input>
          </el-form-item>

          <el-form-item prop="file_name" label="图片上传">
            <el-upload
              action="/ad/upload"
              with-credentials
              :disabled="!selectType"
              :show-file-list="false"
              :multiple="false"
              :headers="{ Authorization: 'Bearer ' + token }"
              :before-upload="beforeUpload"
              :on-success="uploadSuccess"
              @click.native="uploadClick"
            >
              <img v-if="showFileName" :src="showFileName" width="180" height="180" />
              <i v-else class="el-icon-plus" :class="!selectType ? 'disabled' : ''"></i>
              <div slot="tip" class="el-upload__tip">
                请选择 JPG、JPEG、PNG 或 GIF 格式的文件
                <br />
                大小不得超过 300KB
                <br />
                <span v-show="selectType === 'i' || selectType === 'c'">
                  首页曝光、登录轮播限定尺寸 640 * 1000
                </span>
                <span v-show="selectType === 'c2'">
                  资讯页轮播限定尺寸 350 * 220
                </span>
                <span v-show="selectType === 'c4'">
                  资讯页卡片限定尺寸 400 * 135
                </span>
                <span v-show="selectType === 'c5'">
                  生活页卡片限定尺寸 240 * 80
                </span>
              </div>
            </el-upload>
          </el-form-item>

          <el-divider></el-divider>

          <el-form-item prop="period" label="有效期">
            <el-date-picker
              v-model="formData.period"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd"
            >
            </el-date-picker>
          </el-form-item>

          <el-form-item prop="timeFrame" label="时段选择">
            <el-time-picker
              is-range
              arrow-control
              v-model="formData.timeFrame"
              range-separator="至"
              start-placeholder="开始时段"
              end-placeholder="结束时段"
              placeholder="选择时间范围"
              format="HH:mm:ss"
              value-format="HH:mm:ss"
            >
            </el-time-picker>
          </el-form-item>

          <el-form-item label="是否冠名" v-if="showTpID">
            <el-switch v-model="aloneVal" active-color="#13ce66" active-text="是" inactive-text="否"></el-switch>
          </el-form-item>

          <el-form-item prop="code" label="合同编号">
            <el-input v-model="formData.code" placeholder="请输入编号" prefix-icon="el-icon-tickets"></el-input>
          </el-form-item>

          <el-divider></el-divider>

          <el-form-item label="">
            <el-button @click="resetForm">重置</el-button>
            <el-button type="primary" @click="submit">提交</el-button>
          </el-form-item>
        </el-form>

        <el-divider direction="vertical" class="vertical-line"></el-divider>

        <div class="preview">
          <img v-show="showFileName" :src="showFileName" />
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import CommCardHeader from "@/components/CommCardHeader";
import { mapState } from "vuex";
export default {
  data: () => ({
    selectType: "",
    devIdLoading: false,
    devIdList: [],
    showFileName: "",
    formData: {
      pic_type: "",
      tp_id: "",
      dev_id: [],
      file_name: "",
      pic_name: "",
      pic_url: "",
      period: "",
      timeFrame: ["00:00:00", "23:59:59"],
      alone: 0,
      code: ""
    },
    rules: {
      pic_type: [{ required: true, message: "未选择投放类型", trigger: "blur" }],
      tp_id: [{ required: true, message: "未选择场景分类", trigger: "blur" }],
      dev_id: [{ required: true, message: "未选择投放场景", trigger: "blur" }],
      file_name: [{ required: true, message: "未上传广告图片", trigger: "blur" }],
      pic_name: [{ required: true, message: "未输入品牌名称", trigger: "blur" }],
      period: [{ required: true, message: "未选择有效期", trigger: "blur" }],
      timeFrame: [{ required: true, message: "未选择投放时段", trigger: "blur" }],
      code: [{ required: true, message: "未输入合同编号", trigger: "blur" }]
    }
  }),
  computed: {
    ...mapState(["token"]),
    showTpID() {
      return this.formData.pic_type !== "c2" && this.formData.pic_type !== "c4" && this.formData.pic_type !== "c5";
    },
    showDevID() {
      if (!this.formData.pic_type) return false;
      if (!this.showTpID) {
        return true;
      } else {
        return !!this.formData.tp_id;
      }
    },
    showAllDevId() {
      return !this.showTpID || this.formData.tp_id === 3;
    },
    aloneVal: {
      get() {
        return this.formData.alone === 1;
      },
      set(val) {
        this.formData.alone = val ? 1 : 0;
      }
    }
  },
  methods: {
    picTypeChange(val) {
      this.selectType = val;
      this.showFileName = "";
      this.formData.tp_id = "";
      this.formData.dev_id = [];
      this.formData.file_name = "";
      this.devIdList = [];
    },

    tpIDchange(val) {
      this.formData.dev_id = [];
      if (val === 3) {
        this.devIdList = [];
      } else {
        this.getSceneDetail(val);
      }
    },

    getSceneDetail(params) {
      this.devIdLoading = true;
      this.$http.ad
        .sceneDetail({ tp_id: params })
        .then(res => {
          this.devIdLoading = false;
          this.devIdList = res.data;
        })
        .catch(() => {});
    },

    uploadClick() {
      if (!this.selectType) {
        this.$message.error("未选择投放类型");
        return;
      }
    },

    /**
     * 格式、大小、尺寸校验
     */
    async beforeUpload(file) {
      const allowType = /^image\/(jpeg|jpg|png|gif)$/.test(file.type);
      const allowSize = 300;
      const allowWH = {
        i: { text: "首页曝光", aWidth: 640, aHeight: 1000 },
        c: { text: "登录轮播", aWidth: 640, aHeight: 1000 },
        c2: { text: "资讯页轮播", aWidth: 350, aHeight: 220 },
        c4: { text: "资讯页卡片", aWidth: 400, aHeight: 135 },
        c5: { text: "生活页卡片", aWidth: 240, aHeight: 80 }
      }[this.selectType];

      if (!allowType) {
        this.$message.error("不支持的图片格式");
        await new Promise.reject();
      }

      if (file.size / 1024 > allowSize) {
        this.$message.error(`上传的图片不能超过${allowSize}kb`);
        await new Promise.reject();
      }

      const reader = new FileReader();
      reader.readAsDataURL(file);
      await new Promise((resolve, reject) => {
        reader.onload = e => {
          const imgUrl = e.target.result;
          const image = new Image();
          image.src = imgUrl;
          image.onload = () => {
            const { width, height } = image;
            const { text, aWidth, aHeight } = allowWH;
            if (width === aWidth && height === aHeight) {
              resolve();
            } else {
              this.$message.error(`${text}尺寸为 ${aWidth} * ${aHeight}`);
              reject();
            }
          };
        };
      });
    },

    uploadSuccess(res, file) {
      this.$message.success("上传成功");
      this.formData.file_name = res.file_name;
      this.showFileName = URL.createObjectURL(file.raw);
    },

    submit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$confirm("是否提交广告?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              const handleParams = {
                dev_id: this.formData.dev_id + "",
                time1: this.formData.timeFrame[0],
                time2: this.formData.timeFrame[1],
                time3: this.formData.period[0],
                time4: this.formData.period[1]
              };
              delete this.formData.timeFrame;
              delete this.formData.period;
              this.$http.ad
                .addAd(Object.assign(this.formData, handleParams))
                .then(() => {
                  this.$message.success("提交成功");
                  this.$router.push("/ad/auditad");
                })
                .catch(() => this.$message.error("出错了，请稍后再试"));
            })
            .catch(() => {});
        } else {
          return false;
        }
      });
    },

    resetForm() {
      this.$confirm("是否重置表单?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.showFileName = "";
          this.$refs.form.resetFields();
        })
        .catch(() => {});
    }
  },
  components: { CommCardHeader }
};
</script>

<style lang="scss" scoped>
.container-wrap {
  overflow-x: auto;
  .container {
    min-width: 1200px;
    display: flex;
    justify-content: space-around;
    padding: 10px 20px 50px;
    .vertical-line {
      height: auto;
      color: #ceced0;
    }
    .preview {
      width: 400px;
      height: 700px;
      box-shadow: 0 0 10px #4b4b4b;
      background-color: #c1c1c1;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>

<style lang="scss">
#addAd {
  .el-form {
    .el-divider--horizontal {
      margin: 0 0 15px 0;
    }
    .el-form-item__label {
      padding-right: 30px;
    }
    .el-select,
    .el-input {
      width: 220px;
    }
    .el-input__inner {
      border: 1px solid #cacaca;
    }
    .el-upload {
      img {
        border-radius: 8px;
      }
      .el-icon-plus {
        width: 180px;
        height: 180px;
        line-height: 180px;
        border-radius: 8px;
        font-size: 30px;
        color: #8c939d;
        border: 1px solid #ccc;
        &:hover {
          border-color: #409eff;
        }
        &.disabled {
          color: #d7e0ed;
          border: 1px solid #e6dfdf;
          &:hover {
            border-color: #e6dfdf;
            cursor: not-allowed;
          }
        }
      }
      .el-date-panel {
        font-size: 14px;
      }
    }
    .el-upload__tip {
      line-height: 25px;
    }
  }
}
</style>
