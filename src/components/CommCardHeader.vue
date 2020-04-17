<template>
  <div class="cardHeader">
    <i class="title-icon" :class="iconClass"></i>
    <span>{{ title }}</span>
    <div class="title-button">
      <slot></slot>
    </div>
    <el-button v-show="refresh" type="primary" plain icon="el-icon-refresh" class="refresh" @click="doRefresh">刷新</el-button>
  </div>
</template>

<script>
import { throttle } from "js/impose";
export default {
  props: {
    title: {
      type: String,
      default: ""
    },
    iconClass: {
      type: String,
      default: ""
    },
    refresh: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    doRefresh: throttle(function() {
      this.$bus.$emit("clearPage");
    }, 1500)
  }
};
</script>

<style lang="scss" scoped>
.cardHeader {
  font-size: 22px;
  min-width: 720px;
  .title-icon {
    font-size: 26px;
    margin-right: 8px;
    vertical-align: -8%;
  }
  .title-button {
    display: inline-block;
    margin-left: 30px;
  }
  .refresh {
    float: right;
  }
}
</style>
