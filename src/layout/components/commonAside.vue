<template>
  <div class="menu-box">
    <!--isCollapse 是否水平折叠收起菜单-->
    <el-menu
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      :collapse-transition="true"
      :unique-opened="true"
      :default-active="$route.name"
      text-color="#ffffff"
      active-text-color="#fc9105"
    >
      <div v-if="!isCollapse" class="logoBox" @click="backToHomePage">
        <img :src="logoImg" alt="Logo" />
        <span class="systemName">Vue3 Admin Project</span>
      </div>
      <div v-else class="logoBox">
        <img :src="logoImg" alt="Logo" />
      </div>
      <div class="shrinkButton">
        <span
          :class="collapseBtnClass"
          class="collapseMenuCss"
          @click="collapseMenu"
        ></span>
      </div>
      <commonAsideItem :menuData="menuList"></commonAsideItem>
    </el-menu>
  </div>
</template>

<script>
  import commonAsideItem from './commonAsideItem.vue'
  export default {
    components: {
      commonAsideItem,
    },
    data() {
      return {
        logoImg: require('../../assets/logo.png'),
        isCollapse: false,
        collapseBtnClass: 'el-icon-s-fold',
        menuList: [],
      }
    },
    created() {},
    mounted() {
      let routesArray = []
      routesArray = this.$router.options.routes
      routesArray.shift()
      routesArray.pop()
      // console.log('[ routesArray ]', routesArray)
      this.menuList = this.processMenuData(routesArray)
      console.log('[ 菜单数据 ]', this.menuList)
    },
    methods: {
      // 左侧logo区域 点击返回首页
      backToHomePage() {
        this.$router.push({ path: '/home' })
      },
      //控制左侧菜单是否折叠
      collapseMenu() {
        //点击收缩按钮触发
        this.isCollapse = !this.isCollapse
        if (this.isCollapse) {
          //收缩
          this.collapseBtnClass = 'el-icon-s-unfold'
        } else {
          //展开
          this.collapseBtnClass = 'el-icon-s-fold'
        }
      },
      processMenuData(menuList) {
        return menuList.map(item => {
          // console.log('[ item ]', item)
          const menuItem = {
            name: item.name,
            label: item.meta.title,
            icon: item.meta.icon,
            path: item.path,
          }
          if (item.children && item.children.length > 0) {
            menuItem.children = this.processMenuData(item.children)
          }
          return menuItem
        })
      },
    },
  }
</script>
<style scoped lang="scss">
  .logoBox {
    height: 60px;
    text-align: center;
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    cursor: pointer;

    img {
      width: 30px;
    }

    .systemName {
      white-space: nowrap;
    }
  }
  .shrinkButton {
    text-align: center;
    background-color: #222b45;
    .collapseMenuCss {
      font-size: 20px;
      color: #ffffff;
      margin: 0 10px;
      cursor: pointer;
    }
  }
</style>
