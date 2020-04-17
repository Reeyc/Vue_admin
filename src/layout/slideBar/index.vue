<template>
  <div class="sideBar" id="domSideBar">
    <el-scrollbar>
      <el-menu
        :default-active="$route.path"
        class="el-menu-vertical-demo"
        background-color="#3a3f51"
        text-color="#bbb"
        active-text-color="#ffd04b"
        mode="vertical"
        unique-opened
        router
        :collapse-transition="false"
        :collapse="slideBar == 1"
      >
        <sidebar-item v-for="item in roles" :key="item.path" :item="item"></sidebar-item>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import SidebarItem from "./SideBarItem";
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["roles", "slideBar"])
  },
  components: { SidebarItem }
};
</script>
