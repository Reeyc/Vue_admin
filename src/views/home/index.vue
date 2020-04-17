<template>
  <div id="home">
    <el-row class="echarts-wrap">
      <el-col :span="6" class="echarts-item">
        <online-user :width="width"></online-user>
        <online-scene :width="width"></online-scene>
        <scene-total :width="width"></scene-total>
      </el-col>
      <el-col :span="12" class="echarts-item">
        <hn-map :width="width"></hn-map>
        <cards :cards="cards"></cards>
      </el-col>
      <el-col :span="6" class="echarts-item">
        <one-scene :width="width"></one-scene>
        <two-scene :width="width"></two-scene>
        <login-type :width="width"></login-type>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import onlineUser from "./children/onlineUser";
import onlineScene from "./children/onlineScene";
import sceneTotal from "./children/sceneTotal";
import hnMap from "./children/hnMap";
import oneScene from "./children/oneScene";
import twoScene from "./children/twoScene";
import loginType from "./children/loginType";
import cards from "./children/cards";
import { debounce } from "js/impose";
export default {
  data: () => ({
    cards: null,
    width: 0
  }),
  methods: {
    getWidth: debounce(function() {
      this.width = document.documentElement.clientWidth || document.body.clientWidth;
    }, 300)
  },
  created() {
    this.$http.home
      .welcomeData()
      .then(res => (this.cards = res.data))
      .catch(() => {});
  },
  mounted() {
    this.getWidth();
    addEventListener("resize", this.getWidth, false);
  },
  components: {
    onlineUser,
    onlineScene,
    sceneTotal,
    hnMap,
    oneScene,
    twoScene,
    loginType,
    cards
  }
};
</script>

<style lang="scss" scoped>
::selection {
  background: transparent;
}

#home {
  height: 100%;
  padding: 30px 10px 50px !important;
  background-color: #0c1626 !important;
  background-image: url(../../assets/img/homebg.png) !important;
  background-size: cover;
  user-select: none;
  .echarts-wrap {
    height: 100%;
    .echarts-item {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .echarts {
        flex: 1;
        padding: 20px;
        margin-bottom: 10px;
        border: 1px solid #2c58a6;
        box-shadow: 0 0 10px #2c58a6;
      }
    }
  }
}

@media (max-width: 1600px) {
  .echarts {
    padding: 10px !important;
  }
}
</style>
