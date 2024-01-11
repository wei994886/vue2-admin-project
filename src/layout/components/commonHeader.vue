<template>
  <div class="header-content">
    <div class="l-content">
      <div class="l-content-box">
        <div class="l-content-left" @click="backToHomePage">
          <img :src="logoImg" alt="" />
          <span>Vue2 Admin Project 管理系统</span>
        </div>
        <div class="l-content-right">
          <!-- 菜单展开收缩按钮 -->
          <span
            :class="collapseBtnClass"
            class="collapseMenuCss"
            @click="collapseMenu"
          ></span>
          <!-- 面包屑 -->
          <commonBreadcrumb />
        </div>
      </div>
    </div>
    <div class="r-content">
      <div class="weather">
        <marquee direction="left" v-html="weatherContent" />
      </div>
      <img :src="userImg" class="userImgCss" />
      <el-dropdown trigger="click" size="mini">
        <span class="userNameCss">admin</span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item @click.native="logOut">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
  import commonBreadcrumb from '@/layout/components/commonBreadcrumb'
  import { publicApi } from '@/api/commonalityApi'

  export default {
    components: {
      commonBreadcrumb,
    },
    data() {
      return {
        logoImg: require('../../assets/logo.png'),
        isCollapsed: false,
        collapseBtnClass: 'el-icon-s-fold',
        userImg: require('../../assets/avatar.png'),
        weatherContent: '天气预报滚动播报正文',
      }
    },
    computed: {
      isCollapse() {
        // 这里的数据就是从vuex取得
        return this.$store.state.isCollapse
      },
    },
    mounted() {
      this.getWeatherInquiry()
    },
    methods: {
      //控制左侧菜单是否折叠
      collapseMenu() {
        //点击收缩按钮触发
        this.isCollapsed = !this.isCollapsed
        this.$store.commit('collapseMenu')
        if (this.isCollapsed) {
          //收缩
          this.collapseBtnClass = 'el-icon-s-unfold'
        } else {
          //展开
          this.collapseBtnClass = 'el-icon-s-fold'
        }
      },
      // 左侧logo区域 点击返回首页
      backToHomePage() {
        this.$router.push({ path: '/home' })
      },
      //退出登陆
      logOut() {
        //清除token
        window.sessionStorage.clear()
        location.reload()
      },

      // 查询当地天气信息
      getWeatherInquiry() {
        let weatherInformation = {}
        publicApi.weatherInquiry().then(res => {
          // console.log('[ res ]', res.data)
          if (res.data.code === 200) {
            weatherInformation = res.data.result
            this.weatherContent = `${weatherInformation.city.city_name}，${
              weatherInformation.condition.update_time
                ? weatherInformation.condition.update_time.split(' ')[0]
                : '-'
            }，天气：${weatherInformation.condition.condition}，实时温度：${
              weatherInformation.condition.temp
            } 摄氏度，体感温度：${
              weatherInformation.condition.realFeel
            } 摄氏度，风向：${weatherInformation.condition.windDir} ${
              weatherInformation.condition.windLevel
            } 级， 温馨提示：${weatherInformation.condition.tips}`
          } else {
            this.weatherContent = '暂无数据'
          }
        })
      },
    },
  }
</script>
<style scoped lang="scss">
  .header-content {
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .l-content {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .l-content-box {
        display: flex;
        align-items: center;

        .collapseMenuCss {
          font-size: 20;
          color: #ffffff;
          margin: 0 10px;
          cursor: pointer;
        }

        .l-content-left {
          font-weight: bold;
          text-align: center;
          color: #ffffff;
          // background: #181b20;
          display: flex;
          align-items: center;
          justify-content: space-evenly;
          cursor: pointer;

          img {
            width: 30px;
            margin: 0 10px;
          }
        }

        .l-content-right {
          display: flex;
          align-items: center;
        }
      }
    }

    .r-content {
      // width: 6.5%;
      margin-right: 15px;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .userImgCss {
        width: 30px;
        margin: 0 5px;
        border-radius: 20%;
      }

      .userNameCss {
        color: #ffffff;
        cursor: pointer;
      }
    }
  }

  .el-button--mini {
    padding: 7px;
  }

  .weather {
    width: 220px;
    height: 40px;
    line-height: 40px;
    color: #ffffff;
    // background-color: #101045;
    text-align: center;

    span {
      font-size: 16px;
      display: inline-block;
      white-space: nowrap;
    }
  }
</style>
