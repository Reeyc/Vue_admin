<template>
  <div class="wrapper" :class="{ closeBar: slideBar == 1 }">
    <v-header></v-header>
    <transition enter-active-class="animated bounceInRight" leave-active-class="animated bounceOutRight">
      <notificat-bar v-show="msgIsShow"></notificat-bar>
    </transition>
    <div class="wrapper_con">
      <v-slide-bar></v-slide-bar>
      <v-page-main></v-page-main>
      <v-footer></v-footer>
    </div>
  </div>
</template>

<script>
import VHeader from "./header";
import VSlideBar from "./slideBar";
import VPageMain from "./pageMain";
import VFooter from "./footer";
import NotificatBar from "@/components/NotificatBar";
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["slideBar", "msgIsShow"])
  },
  components: {
    VHeader,
    VSlideBar,
    VPageMain,
    VFooter,
    NotificatBar
  }
};
</script>
