<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item v-for='(item, index) in levelList' :key="item.path">
        <span v-if='item.redirect === "noRedirect" || index === levelList.length - 1'>{{ item.meta.title }}</span>
        <a v-else @click.prevent='handleLink(item)'>{{ item.meta.title }}</a>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
<script>
export default {
  data() {
    return {
      levelList: null
    }
  },
  watch: {
    $route() {
      this.getBreadcrumb()
    }
  },
  created() {
    this.getBreadcrumb()
  },
  methods: {
    getBreadcrumb() {
      let matched = this.$route.matched.filter(item => item.meta && item.meta.title)
      // console.log('[ this.$route.matched ]', this.$route.matched)
      // console.log('[ matched ]', matched)
      const first = matched[0]
      if (!first.path) {
        matched = [{ path: '/home' }]
      }
      if (!this.isDashboard(first)) {
        matched = [{ path: '/home', meta: { title: '首页' } }].concat(matched)
      }
      this.levelList = matched.filter(item => item.meta && item.meta.title)
      // console.log('[ this.levelList ]', this.levelList)
    },
    //如果没有路由name怎样处理
    isDashboard(route) {
      const name = route && route.name
      if (!name) {
        return false
      }
      return name.trim().toLocaleLowerCase() === 'Home'.toLocaleLowerCase()
    },
    handleLink(item) {
      // console.log('[ item ]', item)
      this.$router.push(item.path)
    }
  }
}
</script>

<style lang="scss" scoped>
/* 不被选中时的颜色 */
.el-breadcrumb ::v-deep .el-breadcrumb__inner a {
  color: #ffffff !important;
  font-weight: 400 !important;
}

.el-breadcrumb ::v-deep .el-breadcrumb__inner a:hover {
  color: #fc9105 !important;
  font-weight: 800 !important;
}

/* 被选中时的颜色 */
.el-breadcrumb__item:last-child ::v-deep .el-breadcrumb__inner {
  color: #fc9105 !important;
  font-weight: 800 !important;
}
</style>
