<template>
  <div id="hnMap_wrap">
    <h1 :style="{ fontSize: width / 60 + 'px' }">环岛高铁WiFi综合管理平台</h1>
    <div id="hnMap" ref="hnMap"></div>
    <div id="Reeyc" :style="{ fontSize: width / 50 + 'px' }">Reeyc</div>
  </div>
</template>

<script>
import resize from "@/mixins/resize";
export default {
  props: ["width"],
  data: () => ({
    myCharts: null
  }),
  mixins: [resize],
  methods: {
    initData() {
      this.fromData = []; //往目标
      this.toData = []; //来目标
      this.coordData = []; //线条
      this.mapData = []; //处理后的地图数据
    },
    getData() {
      this.$http.home
        .getMapDevice()
        .then(res => {
          //初始化数据
          this.initData();
          this.toData.push({ name: res.command.name, value: res.command.coords });
          res.data.forEach(item => {
            const { name, coords: value, status } = item;
            //更新数据
            this.fromData.push({ name, value });
            this.coordData.push({
              fromName: name,
              toName: this.toData[0].name,
              coords: [value, this.toData[0].value]
            });
            //去除离线的线条
            if (status === 0) {
              this.coordData.forEach((e, i) => {
                if (name !== e.fromName) return;
                this.coordData.splice(i, 1);
              });
            }
            this.mapData.push({ name, value: [...value, item] });
          });
          this.mapData.push({
            name: res.command.name,
            value: [...res.command.coords, res.command]
          });
          this.echartsOption = this.renderCharts();
          this.myCharts.setOption(this.echartsOption);
        })
        .catch(() => {});
    },
    renderCharts() {
      return {
        tooltip: {
          trigger: "item",
          formatter: function(res) {
            const { name, value } = res.value[res.value.length - 1];
            return `${name}：${value}`;
          }
        },
        geo: {
          map: "海南",
          roam: false,
          layoutCenter: ["50%", "50%"],
          layoutSize: "650%",
          center: [109.854846, 19.08726],
          itemStyle: {
            normal: {
              areaColor: "#323c48",
              borderColor: "#404a59"
            },
            emphasis: {
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              shadowBlur: 20,
              borderWidth: 0,
              areaColor: "rgba(255, 0, 0, 0.5)",
              shadowColor: "rgba(0, 0, 0, 0.5)"
            }
          }
        },
        series: [
          {
            type: "lines",
            zlevel: 1,
            effect: {
              show: true,
              period: 6,
              trailLength: 0.7,
              color: "#ccc",
              symbolSize: 2
            },
            lineStyle: {
              normal: {
                width: 0,
                curveness: 0.2,
                color: "#000"
              }
            },
            data: this.coordData
          },
          {
            type: "effectScatter",
            zlevel: 2,
            coordinateSystem: "geo",
            rippleEffect: { brushType: "stroke" },
            tooltip: { trigger: "item" },
            label: { show: false },
            hoverAnimation: true,
            symbol: "circle",
            symbolSize: 1,
            data: this.fromData
          },
          {
            type: "effectScatter",
            zlevel: 2,
            coordinateSystem: "geo",
            rippleEffect: { brushType: "stroke" },
            tooltip: { trigger: "item" },
            label: { show: false },
            hoverAnimation: true,
            symbol: "circle",
            symbolSize: 7,
            data: this.toData
          },
          {
            type: "scatter",
            zlevel: 3,
            coordinateSystem: "geo",
            symbol: `image://${require("img/WI-FI.png")}`,
            symbolSize: this.width / 100,
            encode: { value: 2 },
            label: {
              show: true,
              position: "bottom",
              fontSize: this.width / 200,
              color: "#f4e925",
              formatter: function(res) {
                return res.name;
              }
            },
            itemStyle: {
              color: "#f4e925",
              shadowBlur: 10
            },
            data: this.mapData
          },
          {
            type: "effectScatter",
            zlevel: 2,
            coordinateSystem: "geo",
            encode: { value: 2 },
            symbolSize: function(res) {
              return res[res.length - 1].status === 0 ? 0 : 8;
            },
            showEffectOn: "render",
            rippleEffect: {
              brushType: "stroke",
              scale: 7
            },
            hoverAnimation: true,
            itemStyle: {
              color: "#f4e925",
              shadowBlur: 10,
              show: false
            },
            data: this.mapData
          }
        ]
      };
    },
    sceneClick() {
      this.myCharts.on("click", res => {
        const h = this.$createElement;
        if (res.componentType === "series") {
          let lastIndex = res.value.length - 1;
          let data = res.value[lastIndex];
          if (data.status !== 1) return;
          this.$alert(
            h("div", { class: ["msg-wrap"] }, [
              h("p", { class: ["msg-item"] }, `站点：${data.name}`),
              h("p", { class: ["msg-item"] }, `IP：${data.ip}`),
              h("p", { class: ["msg-item"] }, `在线时长：${data.upt}`),
              h(
                "p",
                {
                  class: ["msg-item"],
                  on: {
                    click: event => {
                      event.stopPropagation();
                      this.$router.push({
                        path: "/statement/onlineUser",
                        query: { dev_id: data.dev_id }
                      });
                      this.$msgbox.close();
                    }
                  }
                },
                `在线人数：${data.value}`
              )
            ]),
            data.name,
            {
              dangerouslyUseHTMLString: true
            }
          );
        }
      });
    }
  },
  watch: {
    width() {
      if (this.myCharts && this.echartsOption) {
        this.myCharts.clear();
        this.echartsOption = this.renderCharts();
        this.myCharts.setOption(this.echartsOption);
      }
    }
  },
  created() {
    this.initData();
    this.echartsOption = null;
    this.getData();
  },
  mounted() {
    this.myCharts = this.$echarts.init(this.$refs.hnMap);
    this.sceneClick();
  }
};
</script>

<style lang="scss">
#hnMap_wrap {
  flex: 1;
  height: 92%;
  max-height: 92%;
  position: relative;
  h1 {
    font-weight: bold;
    letter-spacing: 2px;
    text-indent: 2px;
    text-align: center;
    color: #ddd;
  }
  #hnMap {
    height: 100%;
  }
  #Reeyc {
    font-size: 50px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-55%, -50%) rotate(-30deg);
    color: rgba(255, 255, 255, 0.15);
  }
}
</style>
