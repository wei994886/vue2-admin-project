<template>
  <div class="tabs_box">
    <div class="tabs_content">
      <el-tabs
        :closable="tabList.length > 1"
        v-model="active"
        @contextmenu.prevent.native="openContextMenu($event)"
        type="editable-card"
        @tab-remove="removeTab"
        @tab-click="tabClick"
      >
        <el-tab-pane
          class="isActive"
          v-for="item in tabList"
          :key="item.name"
          :label="item.name"
          :name="item.path"
        >
        </el-tab-pane>
      </el-tabs>
    </div>
    <!-- 右键菜单 -->
    <ul
      v-show="contextMenu.isShow"
      :style="{ left: contextMenu.menuLeft + 'px', top: '100px' }"
      class="el-dropdown-menu el-popper"
      x-placement="bottom-end"
    >
      <li class="el-dropdown-menu__item" @click="closeRightTag">
        <i class="el-icon-error" />关闭右侧
      </li>
      <li class="el-dropdown-menu__item" @click="closeLeftTag">
        <i class="el-icon-error" />关闭左侧
      </li>
      <li class="el-dropdown-menu__item" @click="closeOtherTag">
        <i class="el-icon-error" />关闭其它
      </li>
      <li
        v-if="this.active == this.contextMenu.name"
        class="el-dropdown-menu__item"
        @click="refresh"
      >
        <i class="el-icon-refresh" />刷新页面
      </li>
      <div class="popper__arrow" style="left: 44px"></div>
    </ul>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        active: '/First/page1',
        tabList: [],
        // 右键的元素
        contextMenu: {
          name: '',
          menuLeft: 0,
          isShow: false,
          label: '',
        },
      }
    },
    watch: {
      $route() {
        this.getThisPage()
      },
    },
    created() {
      // this.tabsDataStorage()
      this.getThisPage()
    },
    mounted() {
      var that = this
      document.addEventListener('click', function (e) {
        that.contextMenu.isShow = false
      })
    },
    methods: {
      // 监听页面刷新 将tabs数据存入localStorage 页面刷新后  tabs数据依然不变
      tabsDataStorage() {
        window.addEventListener('beforeunload', e => {
          localStorage.setItem(
            'tagInfo',
            JSON.stringify({
              active: this.active,
              tabList: this.tabList,
            }),
          )
        })
        let tagInfo = localStorage.getItem('tagInfo')
          ? JSON.parse(localStorage.getItem('tagInfo'))
          : {
              active: '/home',
              tabList: [
                {
                  name: '首页',
                  path: '/home',
                },
              ],
            }
        // console.log('[ tagInfo ]', tagInfo)
        this.active = tagInfo.active
        this.tabList = tagInfo.tabList
      },
      // 判断当前页
      getThisPage() {
        let currentPgae = this.$route,
          index = this.tabList.findIndex(tag => tag.path == currentPgae.path)
        // console.log('[ currentPgae ]', currentPgae)
        if (index === -1) {
          this.tabList.push({
            name: currentPgae.meta.title,
            path: currentPgae.path,
          })
        }
        // 当前选择页
        this.active = currentPgae.path
      },
      // 右键
      openContextMenu(e) {
        if (e.srcElement.id) {
          this.contextMenu.name = e.srcElement.id.substr(4)
          this.contextMenu.menuLeft = e.clientX - 45
          this.contextMenu.isShow = true
          this.contextMenu.label = e.srcElement.innerText
        }
      },
      // 点击
      tabClick(tab) {
        // console.log('[ tab ]', tab)
        this.$router.push(tab.name)
        this.active = tab.name
      },
      // 移除
      removeTab(targetPath) {
        // console.log('[ targetPath ]', targetPath)
        let tabs = this.tabList
        if (tabs.length <= 1) {
          this.$message.warning('这是最后一页, 不能在关闭了')
        } else {
          let activePath = this.active
          if (activePath === targetPath) {
            tabs.forEach((tab, index) => {
              if (tab.path === targetPath) {
                let nextTab = tabs[index + 1] || tabs[index - 1]
                if (nextTab) {
                  activePath = nextTab.path
                }
              }
            })
          }
          this.active = activePath
          this.$router.push(activePath)
          this.tabList = tabs.filter(tab => tab.path !== targetPath)
        }
      },
      // 刷新
      refresh() {
        this.$router.go(0)
      },
      // 关闭右侧
      closeRightTag() {
        let currentPath = this.contextMenu.name,
          index = this.tabList.findIndex(tag => tag.path == currentPath)
        this.tabList.splice(index + 1, this.tabList.length - index)
        this.active = currentPath
        this.$router.push(currentPath)
      },
      // 关闭左侧
      closeLeftTag() {
        let currentPath = this.contextMenu.name,
          index = this.tabList.findIndex(tag => tag.path == currentPath)
        this.tabList.splice(0, index)
        this.active = currentPath
        this.$router.push(currentPath)
      },
      // 关闭其它
      closeOtherTag() {
        let currentPath = this.contextMenu.name,
          currentName = this.contextMenu.label
        this.tabList = [
          {
            name: currentName,
            path: currentPath,
          },
        ]
        this.active = currentPath
        this.$router.push(currentPath)
      },
    },
  }
</script>

<style lang="scss" scoped>
  .tabs_box {
    background: #e9eef3;
  }

  .tabs_content {
    width: 100%;
    padding: 5px;
    box-sizing: border-box;
  }

  ::v-deep .el-tabs__header {
    margin: 0px;
  }

  ::v-deep .el-tabs--card > .el-tabs__header {
    border: 0px !important;
  }

  ::v-deep .el-tabs__nav {
    border: 0px !important;
  }

  ::v-deep .el-tabs__nav-wrap::after {
    height: 0px;
  }

  ::v-deep .el-tabs__item {
    margin-right: 4px;
    border-radius: 4px;
    height: 26px;
    line-height: 26px;
    padding: 0 10px !important;
    color: #ffffff;
    background: rgb(64, 158, 255, 0.8);
  }

  ::v-deep .el-tabs__item:hover {
    color: #ffffff;
  }

  ::v-deep .el-tabs__item.is-active {
    color: #ffffff;
    background: rgb(252, 145, 5, 0.8);
  }

  /*去掉点击的时候带的阴影边框*/
  ::v-deep .el-tabs__item:focus.is-active.is-focus:not(:active) {
    box-shadow: none !important;
  }

  ::v-deep .el-tabs__nav-next,
  ::v-deep .el-tabs__nav-prev {
    line-height: 46px;
    width: 30px;
    text-align: center;
  }

  ::v-deep .el-tabs__nav-wrap.is-scrollable {
    padding: 0 30px;
    display: flex;
    align-items: center;
  }
</style>
