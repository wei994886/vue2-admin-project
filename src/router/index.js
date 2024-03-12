import Layout from '@/layout'
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

/* 防止重复路由点击报错 */
const originalReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function replace(location) {
  return originalReplace.call(this, location).catch(err => err)
}
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    meta: { title: '首页' },
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('@/views/index'),
        meta: { title: '首页' },
      },
    ],
  },
  {
    path: '/3DCase',
    component: Layout,
    redirect: '/3DCase/cesiumDemo',
    meta: { title: '3DCase', icon: 'el-icon-location-outline' },
    //通过children配置子级路由
    children: [
      {
        path: 'cesiumDemo',
        name: 'cesiumDemo',
        component: () => import('@/views/3DCase/cesium'),
        meta: { title: '三维Cesium', icon: 'el-icon-location-information' },
      },
      // {
      //   path: 'threeDemo',
      //   name: 'threeDemo',
      //   component: () => import('@/views/3DCase/three'),
      //   meta: { title: '三维Three', icon: 'el-icon-location-information' },
      // }
    ],
  },
  {
    path: '/echarts',
    component: Layout,
    redirect: '/echarts/echartsMap',
    meta: { title: 'echarts', icon: 'el-icon-location-outline' },
    //通过children配置子级路由
    children: [
      {
        path: 'echartsMap',
        name: 'echartsMap',
        component: () => import('@/views/echarts/echartsMap'),
        meta: { title: 'echarts地图', icon: 'el-icon-location-information' },
      },
      {
        path: 'echartsItem',
        name: 'echartsItem',
        component: () => import('@/views/echarts/echartsItem'),
        meta: { title: 'echarts图表', icon: 'el-icon-location-information' },
      },
    ],
  },
  {
    path: '/packageComponent',
    component: Layout,
    redirect: '/packageComponent/tablePage',
    meta: { title: '组件封装', icon: 'el-icon-location-outline' },
    //通过children配置子级路由
    children: [
      {
        path: 'tablePage',
        name: 'tablePage',
        component: () => import('@/views/tablePage'),
        meta: { title: '表格', icon: 'el-icon-location-information' },
      },
      {
        path: 'treePage',
        name: 'treePage',
        component: () => import('@/views/treePage'),
        meta: { title: '树形控件', icon: 'el-icon-location-information' },
      },
      {
        path: 'selectTreePage',
        name: 'selectTreePage',
        component: () => import('@/views/selectTreePage'),
        meta: { title: '树形选择器', icon: 'el-icon-location-information' },
      },
    ],
  },
  {
    path: '/:catchAll(.*)',
    name: '404',
    meta: {
      title: '页面不存在',
    },
    component: () => import('@/views/errorpage'),
  },
]

const router = new VueRouter({
  mode: 'hash',
  routes,
  // 切换路由后滚动条置顶
  scrollBehavior() {
    return {
      x: 0,
      y: 0,
    }
  },
})

export default router
