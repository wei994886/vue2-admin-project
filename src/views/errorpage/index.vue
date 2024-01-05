<template>
  <div class="errorpage">
    <img src="../../assets/error404.png" alt="" style="margin-top:10%">
    <h1>您访问的页面不存在，请查看网络连接是否正常，或查看地址输入是否正确</h1>
    <h1>The page you visited does not exist Please check whether the network connection is normal or check whether the
      address input is correct </h1>
    <span class="promptCss">将在<span class="countCss">{{ count }}</span>秒后,自动<el-button class="btnCss" type="text"
        @click="toHome">返回首页</el-button></span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 定时器
      count: 5,
      timer: null
    };
  },
  mounted() {
    this.timerFn()
  },
  methods: {
    toHome() {
      // 关闭定时器
      clearInterval(this.timer)
      this.$router.replace('/home')
    },

    timerFn() {
      this.timer = setInterval(() => {
        // 创建定时器
        if (this.count === 0) {
          // 关闭定时器
          clearInterval(this.timer)
          this.$router.replace('/home')
          this.timer = null
          this.count = 5
        } else {
          this.count--
        }
      }, 1000)
    }
  }
}
</script>

<style lang="scss" scoped>
.errorpage {
  text-align: center;

  h1 {
    color: black;
    font-size: 20px;
    font-weight: 700;
    margin: 15px;
  }

  .promptCss {
    font-size: 15px;
    color: #909399;

    .countCss {
      color: #F56C6C;
      font-weight: 600;
      margin: 0 2px;
    }

    .btnCss {
      font-size: 15px;
      margin-left: 2px;
    }

    .el-button {
      padding: 0;
    }
  }
}
</style>
