<template>
  <div class="sideCollapse" id="domColapse">
    <i :class="{ 'el-icon-s-unfold': state, 'el-icon-s-fold': !state }" @click="toggleOpen"></i>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  computed: {
    ...mapState(["slideBar"]),
    state() {
      return Number(this.slideBar);
    }
  },
  methods: {
    ...mapMutations(["SET_OPENED"]),
    toggleOpen() {
      const state = this.state ? 0 : 1;
      this.SET_OPENED(state);
    }
  }
};
</script>
<style lang="scss" scoped>
.sideCollapse i {
  font-size: 18px;
  color: #363f44;
  cursor: pointer;
}
</style>
