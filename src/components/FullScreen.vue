<template>
  <div>
    <i class="el-icon-full-screen iconFont" @click="toggleFull"></i>
  </div>
</template>

<script>
import screenfull from "screenfull";
export default {
  methods: {
    toggleFull() {
      if (!screenfull.isEnabled) {
        this.$message({
          type: "warning",
          message: "您的浏览器不支持，请及时更新最新版本浏览器"
        });
        return false;
      }
      screenfull.toggle();
    }
  }
};
</script>
