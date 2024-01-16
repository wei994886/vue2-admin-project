<template>
  <div id="main">
    <el-container class="containers">
      <el-aside width="auto">
        <commonAside />
      </el-aside>
      <el-container>
        <el-container class="container-child">
          <el-header>
            <commonHeader />
          </el-header>
          <el-main>
            <commonTabs />
            <keep-alive>
              <div class="app-main">
                <router-view />
              </div>
            </keep-alive>
          </el-main>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import commonAside from '@/layout/components/commonAside'
  import commonHeader from '@/layout/components/commonHeader'
  import commonTabs from '@/layout/components/commonTabs'
  export default {
    name: 'layout-Com',
    components: {
      commonAside,
      commonHeader,
      commonTabs,
    },
    methods: {},
  }
</script>

<style scoped lang="scss">
  #main {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;

    .containers {
      height: 100%;
    }
    .container-child {
      overflow: hidden;

      .el-main {
        padding: 0;
        display: flex;
        flex-direction: column;

        .app-main {
          flex: 1;
          overflow-y: auto;
        }
      }
    }
  }
</style>
