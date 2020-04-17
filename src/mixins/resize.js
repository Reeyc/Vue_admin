export default {
  mounted() {
    this.windowInitResize();
  },
  activated() {
    this.windowInitResize();
  },
  deactivated() {
    this.removeWindowInitResize();
  },
  destroyed() {
    this.removeWindowInitResize();
  },
  methods: {
    resizeChart() {
      this.$nextTick(() => {
        this.myCharts.resize && this.myCharts.resize();
      });
    },
    windowInitResize() {
      if (window.addEventListener) {
        window.addEventListener("resize", this.resizeChart);
      } else {
        window.onresize = this.resizeChart;
      }
    },
    removeWindowInitResize() {
      if (window.removeWindowInitResize) {
        window.removeEventListener("resize", this.resizeChart);
      } else {
        window.onresize = null;
      }
    }
  }
};
