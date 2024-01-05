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
    //计算属性
    computed: {
      isCollapse() {
        // 这里的数据就是从vuex取得
        return this.$store.state.isCollapse
      },
    },
    data() {
      return {
        // menuList: [
        //   {
        //     label: 'echarts',
        //     icon: 'el-icon-location-outline',
        //     children: [
        //       {
        //         path: '/echarts/echartsMap',
        //         name: 'echartsMap',
        //         label: 'echarts地图',
        //         icon: 'el-icon-location-information',
        //       },
        //       {
        //         path: '/echarts/echartsItem',
        //         name: 'echartsItem',
        //         label: 'echarts图表',
        //         icon: 'el-icon-location-information',
        //       },
        //     ],
        //   },
        //   {
        //     label: '组件封装',
        //     icon: 'el-icon-location-outline',
        //     children: [
        //       {
        //         path: '/packageComponent/tablePage',
        //         name: 'tablePage',
        //         label: '表格',
        //         icon: 'el-icon-location-information',
        //       },
        //       {
        //         path: '/packageComponent/treePage',
        //         name: 'treePage',
        //         label: '树形控件',
        //         icon: 'el-icon-location-information',
        //       },
        //       {
        //         path: '/packageComponent/selectTreePage',
        //         name: 'selectTreePage',
        //         label: '树形选择器',
        //         icon: 'el-icon-location-information',
        //       },
        //     ],
        //   },
        //   // {
        //   //   index: '1',
        //   //   icon: 'el-icon-menu',
        //   //   name: '一级菜单01',
        //   //   children: [
        //   //     {
        //   //       index: '1-1',
        //   //       icon: 'el-icon-film',
        //   //       name: '二级菜单01',
        //   //       children: [
        //   //         {
        //   //           index: '1-1-1',
        //   //           icon: 'el-icon-date',
        //   //           name: '三级菜单01',
        //   //           children: [
        //   //             {
        //   //               index: '1-1-1-1',
        //   //               icon: 'el-icon-monitor',
        //   //               name: '四级菜单01'
        //   //             }
        //   //           ]
        //   //         },
        //   //         {
        //   //           index: '1-1-2',
        //   //           icon: 'el-icon-headset',
        //   //           name: '三级菜单02'
        //   //         }
        //   //       ]
        //   //     },
        //   //     {
        //   //       index: '1-2',
        //   //       icon: 'el-icon-data-line',
        //   //       name: '二级菜单02'
        //   //     }
        //   //   ]
        //   // },
        //   // {
        //   //  path: '/echarts/echartsItem',
        //   //   name: 'echartsItem',
        //   //   label: 'echarts图表',
        //   //   icon: 'el-icon-date',
        //   // },
        // ],

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
<style scoped lang="scss"></style>
