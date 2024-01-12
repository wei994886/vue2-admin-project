<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
  // 滚动条宽度
  ::-webkit-scrollbar {
    width: 12px;
  }
  /* 定义滚动条轨道 */
  ::-webkit-scrollbar-track {
    background-color: #ffffff;
  }
  /* 滑块 */
  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: rgb(217, 217, 217);
  }
</style>
