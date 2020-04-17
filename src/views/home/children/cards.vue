<template>
  <div id="cards" v-if="cards">
    <div class="card">
      <p class="sm">设备(在线/总数)</p>
      <p class="big">{{ cards.online_dev + " / " + cards.dev_sum }}</p>
    </div>
    <div class="card" @click="$router.push('/merchant/list')">
      <p class="sm">商家</p>
      <p class="big">{{ cards.merchants }}</p>
    </div>
    <div class="card">
      <p class="sm">累计接入</p>
      <p class="big">
        <count-to :startVal="0" :endVal="cards.users_pv" :duration="2000" ref="countTo"></count-to>
      </p>
    </div>
    <div class="card" @click="$router.push('/statement/totalUser')">
      <p class="sm">历史用户</p>
      <p class="big">
        <count-to :startVal="0" :endVal="cards.users" :duration="2000" ref="countTo"></count-to>
      </p>
    </div>
    <div class="card" @click="$router.push('/statement/offlineDevice')">
      <p class="sm">离线设备</p>
      <p class="big">{{ cards.dev_sum - cards.online_dev }}</p>
    </div>
  </div>
</template>

<script>
import countTo from "vue-count-to";
export default {
  props: ["cards"],
  activated() {
    [...this.$refs.countTo].forEach(item => item.start());
  },
  components: { countTo }
};
</script>

<style lang="scss" scoped>
#cards {
  text-align: center;
  padding: 10px 0;
  margin: 0 35px;
  border: 1px solid #2c58a6;
  box-shadow: 0 0 10px #2c58a6;
  color: #aaa;
  background-color: rgba(31, 46, 69, 0.5);
  overflow: hidden;
  .card {
    float: left;
    width: 20%;
    padding: 0 5px;
    border-right: 1px solid #666;
    cursor: pointer;
    &:last-child {
      border: none;
    }
    .sm {
      font-size: 12px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .big {
      font-size: 20px;
      margin-top: 5px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      color: #19d4ae;
    }
  }
}
@media (max-height: 800px) {
  #cards {
    padding: 5px 0;
  }
  .big {
    font-size: 16px !important;
    margin-top: 0 !important;
  }
}
</style>
