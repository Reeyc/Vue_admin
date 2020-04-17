<template>
  <el-row class="echarts" :ref="chartsType" v-loading="showLoading" element-loading-background="transparent"></el-row>
</template>

<script>
import resize from "@/mixins/resize";
import homeCharts from "@/mixins/homeCharts";
export default {
  data: () => ({
    chartsType: "loginType"
  }),
  mixins: [homeCharts, resize],
  methods: {
    getData() {
      this.$http.home
        .getLoginType()
        .then(res => {
          this.showLoading = false;
          this.result = res.data;
          this.echartsOption = this.renderEcharts(this.result);
          this.myCharts.setOption(this.echartsOption);
        })
        .catch(() => {});
    },
    renderEcharts(data) {
      return {
        color: ["#fa6d1d", "#009db2"],
        title: {
          text: "登录方式",
          textStyle: {
            fontSize: this.width / 120,
            color: "#ccc"
          }
        },
        legend: {
          orient: "vertical",
          left: "right",
          textStyle: { fontSize: this.width / 120, color: "#ccc" },
          itemWidth: this.width / 60,
          itemHeight: this.width / 120,
          data: ["认证登录", "免认证登录"]
        },
        tooltip: {
          trigger: "item",
          formatter: "{b} : {c}"
        },
        series: [
          {
            name: "状态",
            type: "pie",
            radius: ["50%", "65%"],
            center: ["50%", "60%"],
            data: [
              { value: data.auto, name: "认证登录" },
              { value: data.direct, name: "免认证登录" }
            ],
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
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      };
    }
  }
};
</script>
