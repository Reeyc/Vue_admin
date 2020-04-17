<template>
  <el-row class="echarts" :ref="chartsType" v-loading="showLoading" element-loading-background="transparent"></el-row>
</template>

<script>
import resize from "@/mixins/resize";
import homeCharts from "@/mixins/homeCharts";
export default {
  data: () => ({
    chartsType: "onlineScene"
  }),
  mixins: [homeCharts, resize],
  methods: {
    getData() {
      this.$http.home
        .getSceneOnline()
        .then(res => {
          this.showLoading = false;
          this.result = res.data;
          this.echartsOption = this.renderEcharts(this.result);
          this.myCharts.setOption(this.echartsOption);
        })
        .catch(() => {});
    },
    renderEcharts(data) {
      data.sort((a, b) => b.value - a.value);
      const newData = data.slice(0, 5);
      return {
        title: {
          text: "热点场景",
          textStyle: { fontSize: this.width / 120, color: "#ccc" }
        },
        tooltip: {
          trigger: "item",
          formatter: "{b} : {c}（{d}%）"
        },
        series: [
          {
            name: "各场景在线用户",
            type: "pie",
            roseType: "radius",
            radius: "70%",
            center: ["50%", "50%"],
            top: "15%",
            data: newData,
            label: {
              fontSize: this.width / 140
            },
            labelLine: {
              normal: {
                length: this.width / 120,
                length2: this.width / 160
              }
            },
            itemStyle: {
              itemStyle: {
                normal: { shadowBlur: 200 }
              }
            }
          }
        ]
      };
    }
  }
};
</script>
