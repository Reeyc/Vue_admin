<template>
  <el-row v-loading="showLoading" element-loading-background="rgba(0,0,0,0.7)" element-loading-text="拼命加载中" class="container">
    <div ref="myChart"></div>
  </el-row>
</template>

<script>
import resize from "@/mixins/resize";
require("echarts/theme/macarons");
const colors = ["#009db2", "#f4516c", "#ad29e2", "#009db2", "#f4516c", "#ffc032", "#ff4844", "#9ac3e5", "#66ac52", "#549bd3", "#fa6d1d"];
export default {
  data: () => ({
    API: "oneSceneEcharts",
    chartsTitle: "一类场景最近7日接入趋势",
    showLoading: false,
    myCharts: null,
    options: null
  }),
  mixins: [resize],
  methods: {
    getData() {
      this.showLoading = true;
      this.$http.statement[this.API]().then(res => {
        this.showLoading = false;
        this.options = this.createCharts(res.d);
        this.myCharts.setOption(this.options);
      });
    },
    createCharts(data) {
      return {
        title: { text: this.chartsTitle, left: "2%" },
        color: colors,
        tooltip: { trigger: "axis" },
        grid: {
          left: "5%",
          right: "5%",
          bottom: "10%"
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: data.day
        },
        yAxis: { type: "value" },
        series: [
          {
            name: "登录PV",
            type: "line",
            smooth: true,
            areaStyle: {},
            data: data.pv
          },
          {
            name: "登录UV",
            type: "line",
            smooth: true,
            areaStyle: {},
            data: data.uv
          }
        ]
      };
    }
  },
  created() {
    this.getData();
  },
  mounted() {
    this.myCharts = this.$echarts.init(this.$refs.myChart, "macarons");
    this.$bus.$on("typeChange", data => {
      this.API = data.API;
      this.chartsTitle = data.title;
      this.getData();
    });
  }
};
</script>

<style lang="scss" scoped>
.container {
  height: 350px;
  padding: 5px 0;
  div {
    height: 100%;
  }
}
</style>
