<!-- echarts 图表组件 -->
<template>
  <div :id="id" :style="style"></div>
</template>
 
<script>
import * as echarts from "echarts";
export default {
  name: 'charts',
  data() {
    return {
      chart: null
    }
  },
  props: {
    // id 唯一值（必填）
    id: {
      type: String,
      default: '123',
      required: true
    },
    // 容器的宽度
    width: {
      type: String,
      default: '100%'
    },
    // 容器的高度（必填）
    height: {
      type: String,
      default: '100%'
    },
    // echarts 配置项
    option: {
      type: Object,
      default() {
        return {
          color: ["#37A2DA", "#32C5E9", "#67E0E3", "#9FE6B8", "#FFDB5C", "#ff9f7f", "#fb7293", "#E062AE", "#E690D1", "#e7bcf3", "#9d96f5", "#8378EA", "#96BFFF"],
          title: {
            x: 'center',
            text: 'echarts Demo'
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            icon: 'circle',
            top: '5%',
            left: '82%',
            itemWidth: 10,
            itemGap: 20,
            textStyle: {
              color: '#556677'
            }
          },
          // 工具箱
          // toolbox: {
          //   show: true,
          //   feature: {
          //     mark: { show: true },
          //     dataView: { show: true, readOnly: false },
          //     magicType: { show: true, type: ['line', 'bar', 'stack', 'tiled'] },
          //     restore: { show: true },
          //     saveAsImage: { show: true }
          //   }
          // },
          grid: {
            left: '4%',
            right: '4%',
            // top:'10%',
            // bottom: '3%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              boundaryGap: false,
              data: ['北京', '上海', '广州', '深圳', '香港', '澳门', '台湾'],
            }
          ],
          yAxis: [
            {
              name: '销售额（万）',
              type: 'value',
              axisLine: {
                show: true,  //是否显示
              },
              splitLine: {
                show: true,
                lineStyle: {
                  color: 'rgba(151,151,151,0.5)',
                  type: 'dashed'
                }
              },
            }
          ],
          series: [
            {
              name: 'Adidas',
              type: 'line',
              data: [120, 132, 101, 134, 90, 230, 210]
            },
            {
              name: 'Nike',
              type: 'line',
              data: [220, 182, 191, 234, 290, 330, 310]
            },
            {
              name: '视频广告',
              type: 'line',
              data: [150, 232, 201, 154, 190, 330, 410]
            },
          ],
          dataZoom: [
            {
              type: "inside",
              show: true
            },
            {
              type: "slider",
              show: true,
              height: 15
            }
          ],
        }
      }
    }
  },
  computed: {
    style() {
      return {
        width: this.width,
        height: this.height
      }
    }
  },
  watch: {
    option: {
      handler(newVal, oldVal) {
        if (this.chart) {
          this.chart.setOption(newVal)
        } else {
          this.init();
        }
      },
      deep: true
    }
  },
  mounted() {
    this.init()
    window.addEventListener("resize", this.resizeEchart);
  },
  destroyed() {
    window.removeEventListener('resize', this.resizeEchart)
  },
  methods: {
    init() {
      this.chart = echarts.init(document.getElementById(this.id))
      this.chart.setOption(this.option)
    },
    resizeEchart() {
      if (this.chart) {
        this.chart.resize(); // 调用ECharts的resize方法
      }
    },
  }
}
</script>