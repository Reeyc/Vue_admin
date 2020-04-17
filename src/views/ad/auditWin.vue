<template>
  <div>
    <el-form label-width="100px" class="audit-form">
      <el-form-item label="品牌名称"> {{ data.name }} </el-form-item>
      <el-divider></el-divider>
      <el-form-item label="投放类型"> {{ data.type | type }} </el-form-item>
      <el-divider></el-divider>
      <el-form-item label="投放场景"> {{ data.tp_id === 1 ? "一类场景" : "二类场景" }} </el-form-item>
      <el-divider></el-divider>
      <el-form-item label="场景详情"> {{ Array.isArray(data.scene_name) ? data.scene_name.join(" - ") : "所有场景" }} </el-form-item>
      <el-divider></el-divider>
      <el-form-item label="投放类型"> {{ data.type | type }} </el-form-item>
      <el-divider></el-divider>
      <el-form-item label="广告图片">
        <img :src="data.showPic" class="toPreview" />
        <el-button type="text" @click.stop.prevent="onPreview(data.showPic)"> 大图预览 </el-button>
      </el-form-item>
      <el-divider></el-divider>
      <el-form-item label="广告链接">
        <template>
          <a v-if="data.pic_url" :href="data.pic_url" target="_blank" class="pic-url">{{ data.pic_url }}</a>
          <span v-else>暂无链接</span>
        </template>
      </el-form-item>
      <el-divider></el-divider>
      <el-form-item label="是否冠名"> {{ data.alone === 1 ? "是" : "否" }} </el-form-item>
      <el-divider></el-divider>
      <el-form-item label="有效期"> {{ data.time3 + " 至 " + data.time4 }} </el-form-item>
      <el-divider></el-divider>
      <el-form-item label="时段"> {{ data.time1 | time(data.time2) }} </el-form-item>
      <el-divider></el-divider>
      <el-form-item label="合同编号"> {{ data.code }} </el-form-item>
      <el-divider></el-divider>
      <el-form-item label="提交者"> {{ data.submitter }} </el-form-item>
      <el-divider></el-divider>
      <el-form-item label="提交时间"> {{ timeFormat(data.time * 1000, true) }} </el-form-item>
      <el-divider></el-divider>
      <el-form-item label="投放审核">
        <el-switch v-model="switchVal" active-color="#13ce66" inactive-color="#ff4949" active-text="通过" inactive-text="拒绝"></el-switch>
      </el-form-item>
      <el-form-item label="审核备注" class="remark">
        <el-input type="textarea" rows="4" v-model="remark" placeholder="请输入审核备注"></el-input>
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
import timeFormat from "js/timeFormat";
export default {
  props: {
    data: {
      type: Object,
      default: () => ({})
    }
  },
  data: () => ({
    timeFormat,
    status: 4,
    remark: ""
  }),
  mixins: [preview],
  filters: {
    type(type) {
      switch (type) {
        case "i":
          return "首页曝光";
        case "c":
          return "登录轮播";
        case "c2":
          return "资讯页轮播";
        case "c4":
          return "资讯页卡片";
        case "c5":
          return "生活页卡片";
      }
    },
    time(time1, time2) {
      if (time1 === "0" && time2 === "0") {
        return "全天";
      } else if (time1 === "00:00:00" && time2 === "00:00:00") {
        return "全天";
      } else if (time1 === "00:00:00" && time2 === "23:59:59") {
        return "全天";
      } else {
        return time1 + " - " + time2;
      }
    }
  },
  computed: {
    switchVal: {
      get() {
        return this.status === 4;
      },
      set(newVal) {
        this.status = newVal ? 4 : 5;
      }
    }
  },
  methods: {
    close() {
      this.$parent.$parent.$data.audit.show = false;
    },
    submit() {
      this.$confirm("确定提交审核？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$http.ad
            .checkSubmit({
              id: this.data.id,
              status: this.status,
              remark: this.remark
            })
            .then(() => {
              this.$message.success("操作成功");
              this.$router.replace("/refresh");
            })
            .catch(() => {});
        })
        .catch(() => {});
    }
  },
  mounted() {
    this.$bus.$on("auditOpen", () => {
      this.status = 4;
      this.remark = "";
    });
  }
};
</script>

<style lang="scss" scoped>
.audit-form {
  padding: 0 20px 0 30px;
  .el-divider {
    margin: 10px 0;
    background-color: #e8ebf3;
  }

  ::v-deep .el-form-item__label {
    font-weight: bold;
    padding: 0 30px 0 0;
  }

  ::v-deep .el-form-item {
    margin: 0;
    .toPreview {
      height: 40px;
      margin-right: 10px;
    }
    .pic-url {
      color: #409eff;
      text-decoration: underline;
    }
    &.remark {
      margin: 20px 0;
      .el-textarea {
        width: 350px;
      }
    }
  }
}
</style>
