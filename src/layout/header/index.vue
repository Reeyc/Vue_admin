<template>
  <div class="header">
    <div class="header_l">
      <a href="javascript:;" class="logoLink"> <img src="../../assets/img/logo.png" alt="logo" />Reeyc </a>
    </div>
    <div class="header_r">
      <div class="headr_d1">
        <side-collapse class="sidecoll"></side-collapse>
        <bread-crumb class="bread"></bread-crumb>
      </div>
      <div class="headr_d2">
        <ul class="headrUl clearFixed">
          <li>
            <i class="el-icon-question iconFont"></i>
          </li>
          <li id="domMessage">
            <el-badge is-dot @click.native="toggleMsgShow">
              <i class="el-icon-message-solid iconFont"></i>
            </el-badge>
          </li>
          <li id="domFullScreen">
            <full-screen></full-screen>
          </li>
          <li id="domPersonal">
            <user-dropdown></user-dropdown>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import SideCollapse from "@/components/SideCollapse";
import BreadCrumb from "@/components/BreadCrumb";
import FullScreen from "@/components/FullScreen";
import UserDropdown from "@/components/UserDropdown";
import { mapState, mapMutations } from "vuex";
export default {
  computed: {
    ...mapState(["msgIsShow", "userInfo"])
  },
  methods: {
    ...mapMutations(["SET_MSGISOPEN"]),
    toggleMsgShow() {
      this.SET_MSGISOPEN(!this.msgIsShow);
    }
  },
  components: {
    SideCollapse,
    BreadCrumb,
    FullScreen,
    UserDropdown
  }
};
</script>
