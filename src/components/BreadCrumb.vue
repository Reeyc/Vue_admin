<template>
  <div class="breadDiv" id="domBread">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item v-for="(item, index) in breadList" :to="item.path" :key="index">{{ item.meta.label }}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  data: () => ({
    breadList: []
  }),
  watch: {
    $route: {
      handler(route) {
        if (route.name === "refresh") return;
        let allList = route.matched.filter(item => {
          if (item.meta && item.meta.label) {
            if (item.redirect) {
              item.path = "";
            }
            return true;
          }
        });
        if (allList[0].meta.label === allList[1].meta.label) {
          allList.shift();
        }
        this.breadList = allList;
      },
      immediate: true
    }
  }
};
</script>
