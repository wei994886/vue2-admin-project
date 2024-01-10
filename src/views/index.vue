<template>
  <div class="homePageCss">
    <div class="text">欢迎使用 Vue2 Admin Project 管理系统</div>
  </div>
</template>

<script>
  import WaterMark from '@/utils/waterMark.js'
  export default {
    // 局部注册的组件
    components: {},
    name: 'homePage',
    data() {
      return {
        waterMark: null,
      }
    },
    mounted() {
      this.showMark()
    },
    // 销毁组件
    destroyed() {
      this.hidden()
    },
    methods: {
      // 设置水印
      showMark() {
        this.waterMark = new WaterMark({
          watermark_txt: 'Hello Word', // 水印的内容
          watermark_x: 50, // 水印起始位置x轴坐标
          watermark_y: 50, // 水印起始位置Y轴坐标
          watermark_rows: 0, // 水印行数
          watermark_cols: 0, // 水印列数
          watermark_x_space: 50, // 水印x轴间隔
          watermark_y_space: 50, // 水印y轴间隔
          watermark_width: 150, // 水印宽度
          watermark_height: 80, // 水印长度
          watermark_angle: 45, // 水印倾斜度数
          monitor: false,
        })
      },
      // 隐藏水印
      hidden() {
        if (this.waterMark) {
          this.waterMark.remove()
        }
      },
    },
  }
</script>

<style scoped lang="scss">
  .homePageCss {
    width: 100%;
    height: 100%;

    .text {
      width: 100%;
      height: 100%;
      font-size: 80px;
      font-weight: 700;
      display: flex;
      justify-content: center;
      align-items: center;
      background-image: linear-gradient(
        to right,
        #ce76ee,
        #c17cf1,
        #a980f3,
        #9086f9,
        #d58cff
      );
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      // color: transparent;
    }
  }
</style>
