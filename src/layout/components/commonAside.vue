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
  .shrinkButton {
    text-align: center;
    background-color: #222B45;
    .collapseMenuCss {
      font-size: 20px;
      color: #ffffff;
      margin: 0 10px;
      cursor: pointer;
    }
  }
</style>
