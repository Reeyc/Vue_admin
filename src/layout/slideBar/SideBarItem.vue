<template>
  <div class="sideItem">
    <!-- 渲染在侧边栏 -->
    <template v-if="hasChild(item) !== 'noRenderMenu'">
      <!-- 无子菜单 -->
      <template v-if="!hasChild(item)">
        <el-menu-item :index="currentItem.path">
          <i :class="currentItem.meta.icon"></i>
          <span slot="title">{{ currentItem.meta.label }}</span>
        </el-menu-item>
      </template>
      <!-- 有子菜单 -->
      <template v-else>
        <el-submenu :index="item.path" popper-append-to-body>
          <template slot="title">
            <i :class="item.meta.icon"></i>
            <span>{{ item.meta.label }}</span>
          </template>
          <sidebar-item v-for="child in item.children" :key="child.path" :item="child"></sidebar-item>
        </el-submenu>
      </template>
    </template>
  </div>
</template>

<script>
export default {
  name: "SidebarItem",
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    currentItem: null
  }),
  methods: {
    //判断子菜单
    hasChild(item) {
      if (item.meta && item.meta.noRenderMenu) {
        //不渲染在侧边栏
        return "noRenderMenu";
      }
      if (item.children) {
        if (item.meta && item.meta.topMenu) {
          //无子菜单（顶级菜单）
          this.currentItem = item.children[0];
          return false;
        } else {
          //有子菜单
          return true;
        }
      } else {
        //无子菜单（末级菜单）
        this.currentItem = item;
        return false;
      }
    }
  }
};
</script>
