export default {
  props: ["width"],
  data: () => ({
    showLoading: true,
    myCharts: null,
    echartsOption: null,
    result: null
  }),
  watch: {
    echartsData() {
      this.echartsOption = this.renderEcharts();
      this.myCharts.setOption(this.echartsOption);
    },
    width() {
      if (this.myCharts && this.echartsOption) {
        this.myCharts.clear();
        this.echartsOption = this.renderEcharts(this.result);
        this.myCharts.setOption(this.echartsOption);
      }
    }
  },
  created() {
    this.getData();
  },
  mounted() {
    this.myCharts = this.$echarts.init(this.$refs[this.chartsType].$el);
  }
};
