<template>
  <el-row class="echarts" :ref="chartsType" v-loading="showLoading" element-loading-background="transparent"></el-row>
</template>

<script>
import resize from "@/mixins/resize";
import homeCharts from "@/mixins/homeCharts";
export default {
  data: () => ({
    chartsType: "twoScene",
    echartsData: null,
    twoSceneD: null,
    twoSceneY: null,
    twoSceneOY: null,
    echartsTitle: "二类场景 / 7日"
  }),
  mixins: [homeCharts, resize],
  methods: {
    getData() {
      this.$http.home
        .getTwoScene()
        .then(res => {
          this.showLoading = false;
          this.twoSceneD = res.data.d;
          this.twoSceneY = res.data.m;
          this.twoSceneOY = res.data.y;
          this.echartsData = this.twoSceneD;
          this.echartsOption = this.renderEcharts();
          this.myCharts.setOption(this.echartsOption);
        })
        .catch(() => {});
    },
    renderEcharts() {
      return {
        color: ["#fa6d1d", "#009db2"],
        title: {
          text: this.echartsTitle,
          textStyle: { fontSize: this.width / 120, color: "#ccc" }
        },
        tooltip: { trigger: "axis" },
        grid: {
          left: "-4%",
          right: "5%",
          bottom: "2%",
          containLabel: true
        },
        toolbox: {
          right: "auto",
          itemSize: 14,
          itemGap: 10,
          iconStyle: { color: "#fff" },
          feature: {
            myTool1: {
              title: "近7天",
              icon: "path://M349.44 962.56l229.12-788.48H435.2v104.96H320V51.2h389.12v130.56l-221.44 780.8z",
              onclick: () => {
                this.echartsData = this.twoSceneD;
                this.echartsTitle = "二类场景 / 7日";
              }
            },
            myTool2: {
              title: "今年统计",
              icon:
                "path://M207.961995 430.517815c85.130641 0 114.31829-12.16152 114.31829-87.562946V214.042755c0-41.349169-26.755344-70.536817-70.536817-70.536817-51.078385 0-70.536817 41.349169-70.536817 70.536817v82.698338H37.700713V214.042755C37.700713 94.859857 137.425178 0 254.175772 0c77.833729 0 131.344418 38.916865 155.667458 70.536817 38.916865 46.213777 55.942993 85.130641 55.942993 214.042755 0 138.64133-7.296912 160.532067-89.995249 209.178148 89.995249 55.942993 89.995249 87.562945 89.995249 231.068883 0 133.776722-7.296912 162.964371-38.916864 206.745844-34.052257 51.078385-89.995249 92.427553-177.558195 92.427553C159.315914 1021.567696 37.700713 965.624703 37.700713 807.524941v-82.698338h143.505938v75.401426c0 46.213777 26.755344 77.833729 70.536817 77.833729s70.536817-31.619952 70.536817-80.266034v-143.505938c0-77.833729-21.890736-94.859857-114.31829-94.859857v-128.912114zM706.584323 805.092637c0 41.349169 29.187648 72.969121 70.536817 72.969121s70.536817-31.619952 70.536817-72.969121V216.475059c0-41.349169-29.187648-72.969121-70.536817-72.969121S706.584323 175.125891 706.584323 216.475059v588.617578zM563.078385 216.475059c0-133.776722 99.724466-216.475059 214.042755-216.475059s214.042755 82.698337 214.042755 216.475059v588.617578c0 133.776722-99.724466 216.475059-214.042755 216.475059s-214.042755-82.698337-214.042755-216.475059V216.475059z",
              onclick: () => {
                this.echartsData = this.twoSceneY;
                this.echartsTitle = "二类场景 / 1年";
              }
            },
            myTool3: {
              title: "历年统计",
              icon:
                "path://M129.9 622.1c22.1-12.2 53.9-22.1 95.6-29.4 7.4-63.7 11-118.8 11-165.4 0-36.8 17.1-55.1 51.5-55.1 12.2-2.4 22.1 0 29.4 7.4 41.6-12.2 100.5-22.1 176.5-29.4v-25.7c2.4-14.7 3.7-25.7 3.7-33.1 0-17.1 2.4-29.4 7.4-36.8-117.8 24.4-222 55-312.6 91.8-7.4 2.5-13.5 1.3-18.4-3.7-4.9-4.9-6.1-11-3.7-18.4 7.4-14.7 17.1-35.5 29.4-62.5 19.6-41.6 47.8-95.6 84.6-161.7 19.6-39.2 46.5-51.5 80.9-36.8 26.9 12.3 35.5 33.1 25.7 62.5-2.5 7.4-8.6 19.6-18.4 36.8-12.3 22.1-20.9 38-25.7 47.8 144.6-29.4 317.4-44.1 518.3-44.1l14.7 36.8c-102.9 7.4-201 19.6-294.1 36.8 14.7 7.4 20.8 23.3 18.4 47.8v55.1c56.3-4.9 133.5-7.4 231.6-7.4l14.7 33.1c-80.9 0-163 7.4-246.3 22.1v147c115.2-9.8 231.6-13.4 349.2-11l14.7 36.8c-100.5 2.5-221.8 13.5-363.9 33.1v297.8c-41.7 0-82.1 3.7-121.3 11V765.6c2.4-66.2 3.7-116.4 3.7-150.7-122.6 27-224.2 58.8-305.1 95.6-36.8 17.2-65 13.5-84.6-11-9.8-29.6 1.2-55.3 33.1-77.4zM339.4 453c-2.5 19.6-6.1 58.8-11 117.6 7.4-2.4 19.6-4.9 36.8-7.4 51.5-7.4 91.9-12.2 121.3-14.7 0-14.7 1.2-38 3.7-69.8 0-31.8 1.2-55.1 3.7-69.8-7.4 2.5-17.2 4.9-29.4 7.4-58.9 14.6-100.6 26.9-125.1 36.7z",
              onclick: () => {
                this.echartsData = this.twoSceneOY;
                this.echartsTitle = "二类场景 / 历年";
              }
            }
          }
        },
        xAxis: [
          {
            type: "category",
            axisLabel: { color: "#ccc" },
            axisPointer: { type: "shadow" },
            data: this.echartsData.day
          }
        ],
        yAxis: [
          {
            type: "value",
            show: false,
            axisLabel: { color: "#ccc" }
          }
        ],
        series: [
          {
            name: "PV",
            type: "bar",
            data: this.echartsData.pv
          },
          {
            name: "UV",
            type: "bar",
            data: this.echartsData.uv
          }
        ]
      };
    }
  }
};
</script>
