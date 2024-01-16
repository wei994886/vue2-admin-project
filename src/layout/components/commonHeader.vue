<template>
  <div class="header-content">
    <div class="l-content">
      <commonBreadcrumb style="margin: 0 10px" />
    </div>
    <div class="r-content">
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
  export default {
    components: {
      commonBreadcrumb,
    },
    data() {
      return {
        logoImg: require('../../assets/logo.png'),
        userImg: require('../../assets/avatar.png'),
      }
    },

    mounted() {},
    methods: {
      //退出登陆
      logOut() {
        //清除token
        window.sessionStorage.clear()
        location.reload()
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
    }

    .r-content {
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
</style>
