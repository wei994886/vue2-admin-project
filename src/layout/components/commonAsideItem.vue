<template>
  <div>
    <template v-for="(menu, index) in menuData">
      <el-submenu v-if="menu.children" :key="menu.label" :index="menu.label">
        <template slot="title">
          <i :class="menu.icon"></i>
          <span slot="title">{{ menu.label }}</span>
        </template>
        <commonAsideItem :menuData="menu.children"></commonAsideItem>
      </el-submenu>
      <el-menu-item
        v-else
        :key="menu.path"
        :index="menu.path"
        @click="clickMenu(menu)"
      >
        <i :class="menu.icon"></i>
        <span slot="title">{{ menu.label }}</span>
      </el-menu-item>
    </template>
  </div>
</template>

<script>
  export default {
    name: 'commonAsideItem',
    props: ['menuData'],
    data() {
      return {}
    },

    mounted() {},

    methods: {
      // 左侧菜单 跳转路由 根据名称跳转
      clickMenu(item) {
        // console.log('[ item ]', item)
        this.$router.push({ name: item.name })
      },
    },
  }
</script>

<style>
  /*由于 element-ui 的<el-menu>标签本身希望里面嵌套的是<el-menu-item>,<el-submenu>,<el-menu-item-group>之一，但是却嵌套了<div>,而导致收折就隐藏不了文字*/
  /*隐藏文字*/
  .el-menu--collapse .el-submenu__title span {
    display: none;
  }

  /*隐藏 > */
  .el-menu--collapse .el-submenu__title .el-submenu__icon-arrow {
    display: none;
  }
</style>

<style lang="scss" scoped></style>
