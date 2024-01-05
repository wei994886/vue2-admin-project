<!-- echarts 地图 -->
<!-- vue-project\src\assets\json  文件夹中包括全国各省份的json文件 -->
<template>
  <div>
    <div id="echartsMap" :style="style"></div>
  </div>
</template>

<script>
import china from "@/assets/json/china.json";
import * as echarts from "echarts";
export default {
  name: 'echartsMap',
  // 组件参数 接收来自父组件的数据
  props: {
    // 地图的省份，默认全国
    mapName: {
      type: String,
      default: "china"
    },
    // 容器的宽度
    width: {
      type: String,
      default: '100%'
    },
    // 容器的高度
    height: {
      type: String,
      default: '100%'
    },
  },
  // 局部注册的组件
  components: {},
  data() {
    return {
      chartMap: null,
      mapJson: null
    }
  },
  // 计算属性
  computed: {
    style() {
      return {
        width: this.width,
        height: this.height
      }
    }
  },
  // 侦听器
  watch: {},

  created() { },

  mounted() {
    this.mapJson = china
    this.createChart();
    window.addEventListener("resize", this.resizeEchart);
  },
  destroyed() {
    window.removeEventListener('resize', this.resizeEchart)
  },

  methods: {
    createChart() {
      // echarts 初始化
      this.chartMap = echarts.init(document.getElementById("echartsMap"));

      // 地图注册，第一个参数的名字必须和option.geo.map一致,第一个参数为配置设置的名称，第二个参数为引入的地图名称
      echarts.registerMap(this.mapName, this.mapJson);

      this.chartMap.setOption(this.configurationItem());

      this.chartMap.off('click')
      //点击事件
      this.chartMap.on("click", function (params) {
        console.log('点击echarts地图', params)

      });
    },
    configurationItem() {
      let option = null;
      option = {
        series: [
          {
            type: 'map',
            map: 'china',
            zoom: 1, // 默认显示级别
            layoutCenter: ['50%', '50%'], // 定义地图中心在屏幕中的位置
            layoutSize: '100%', // 相对于屏幕宽高的百分比
            roam: 'scale', // 缩放'scale'或者平移'move'
            // aspectScale: 1.5, // scale 地图的长宽比
            // 地图区域的样式设置
            itemStyle: {
              normal: {
                // 静态的时候展示样式
                areaColor: '#07121D',  //地图区域的颜色
                borderColor: '#206BF5',
                borderWidth: 1,
                shadowColor: '#07121D',  //阴影颜色
                shadowBlur: 20,
                shadowOffsetX: -5,
                shadowOffsetY: 15,
              },
              emphasis: {
                areaColor: "#0A2250"    //选中区域的背景色
              },
            },
            label: {
              normal: {
                // 通常状态下的样式
                show: true, //是否显示地图省份得名称
                textStyle: {
                  color: '#dedee7', // 区域文字 颜色
                  fontSize: 14,
                },
              },
              // 鼠标放上去的样式
              emphasis: {
                //动态展示的样式
                color: '#faf4f4', //选中区域的字体颜色
                show: true,
                textStyle: {
                  fontSize: 16,
                }
              },
            },
            // 选中状态下的多边形和标签样式
            select: {
              itemStyle: {
                areaColor: "#0A2250"    //选中区域的背景色
              },
              label: {
                show: true,
                color: '#faf4f4',
              },
            },
            // selectedMode: 'single',  //默认一个选中
            // data: [
            //   { name: '北京市', selected: true }  // selected:true 默认选中
            // ],
          }
        ],
      };
      return option
    },
    resizeEchart() {
      if (this.chartMap) {
        this.chartMap.resize(); // 调用ECharts的resize方法
      }
    },
  }
}
</script> 
<style lang="scss" scoped></style>