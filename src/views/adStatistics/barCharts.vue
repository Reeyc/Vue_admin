<template>
  <el-row v-loading="showLoading" element-loading-background="rgba(0,0,0,0.7)" element-loading-text="拼命加载中" class="container">
    <div ref="myChart"></div>
  </el-row>
</template>

<script>
import resize from "@/mixins/resize";
require("echarts/theme/macarons");
const colors = ["#009db2", "#f4516c", "#ad29e2", "#009db2", "#fa6d1d", "#ffc032", "#ff4844", "#9ac3e5", "#66ac52", "#549bd3", "#f47e39"];
export default {
  props: ["title", "data", "sign"],
  data: () => ({
    myCharts: null,
    options: null,
    showLoading: false
  }),
  mixins: [resize],
  methods: {
    _renderCharts(data) {
      this.options = this.createCharts(data);
      this.myCharts.setOption(this.options);
    },

    createCharts(data) {
      return {
        title: { text: this.title, left: "2%" },
        tooltip: { trigger: "axis" },
        grid: {
          left: "5%",
          right: "5%",
          bottom: "5%"
        },
        xAxis: { type: "value" },
        yAxis: {
          type: "category",
          axisPointer: { type: "shadow" },
          data: data.map(item => item.name)
        },
        series: [
          {
            name: "曝光次数",
            type: "bar",
            itemStyle: {
              normal: {
                color: params => colors[params.dataIndex]
              }
            },
            label: {
              normal: {
                position: "right",
                show: true
              }
            },
            data: data.map(item => item.show_count)
          }
        ]
      };
    }
  },
  watch: {
    sign: {
      handler(newVal) {
        this.showLoading = newVal;
        this._renderCharts(this.data);
      },
      immediate: true
    }
  },
  mounted() {
    this.myCharts = this.$echarts.init(this.$refs.myChart, "macarons");
  }
};
</script>

<style lang="scss" scoped>
.container {
  height: 600px;
  div {
    height: 100%;
  }
}
</style>
