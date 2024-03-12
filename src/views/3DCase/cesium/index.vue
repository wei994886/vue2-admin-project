<template>
  <div class="box">
    <div class="buttonBox">
      <el-button type="primary" size="small" @click="plottedPoints">绘制点</el-button>
      <el-button type="danger" size="small" @click="removePoint">移除点</el-button>
      <el-button type="primary" size="small" @click="drawABillboard">绘制广告牌</el-button>
      <el-button type="danger" size="small" @click="removeBillboard">移除广告牌</el-button>
      <el-button type="primary" size="small" @click="addZSFJ">添加直升机模型</el-button>
      <el-button type="primary" size="small" @click="addBGL">添加办公楼模型</el-button>
      <el-button type="primary" size="small" @click="addDT">添加电塔模型</el-button>
      <el-button type="danger" size="small" @click="removeAll">移除模型</el-button>
    </div>
    <div id="cesiumContainer" class="cesiumCss"></div>
  </div>
</template>

<script>
import img from './redBJD.jpg'
export default {
  name: 'cesiumContainer',

  data() {
    return {
      viewer: null,
    }
  },

  mounted() {
    this.init()
  },

  beforeDestroy() {
    this.viewer && this.viewer.destroy()
    this.viewer = null

    console.log('[ 销毁cesium ]', this.viewer)
  },

  methods: {
    // 初始化Cesium
    init() {
      // token值
      Cesium.Ion.defaultAccessToken =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJiOTNkMWU3NS0wM2JiLTQ4NmMtYTgyNi05NWU3MWVjMWEzMmYiLCJpZCI6NzE0MzQsImlhdCI6MTYzNTIxNjIyMX0.QnoSt0kZkqKMAL_9EHw6toCwONY-Ao2mRwYpS36FLAk'

      this.viewer = new Cesium.Viewer('cesiumContainer', {
        //关闭一些UI
        infoBox: false, // 点击要素之后显示的信息,默认true,解决默认的控制台报错
        animation: false, //左下角的动画仪表盘
        baseLayerPicker: false, //右上角的图层选择按钮
        geocoder: false, //搜索框
        homeButton: false, //home按钮
        sceneModePicker: false, //模式切换按钮
        timeline: false, //底部的时间轴
        navigationHelpButton: false, //右上角的帮助按钮，
        fullscreenButton: false, //右下角的全屏按钮
        selectionIndicator: false, // 去掉选择指示器
        // shouldAnimate: true, //是否允许动画
        requestRenderMode: true, // 显式渲染，渲染优化
        scene3DOnly: true, // 仅3D渲染，节省GPU内存
        // sceneMode: Cesium.SceneMode.SCENE3D,   //3d视角展示
        // shadows: true,  //光照的阴影效果
      })

      this.viewer.scene.globe.depthTestAgainstTerrain = true; //解决垂直视角时点击报错的问题
      this.viewer._cesiumWidget._creditContainer.style.display = 'none' //隐藏版权信息
      // this.viewer.scene.globe.enableLighting = true;   // 启用光照
      this.viewer.scene.globe.depthTestAgainstTerrain = true; //深度检测
      this.viewer.scene.screenSpaceCameraController.maximumZoomDistance = 10000000;  //最大缩放高度
      // this.viewer.scene.screenSpaceCameraController.minimumZoomDistance = 2000 // 最小缩放高度
      // this.viewer.imageryLayers.removeAll(true) //删除所有底图

      // 加载 ArcGISMap 地图
      // var imageryProvider = new Cesium.WebMapTileServiceImageryProvider({
      //   url: 'https://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/WMTS',
      //   layer: 'World_Imagery',
      //   style: 'default',
      //   format: 'image/jpeg',
      //   tileMatrixSetID: 'GoogleMapsCompatible',
      //   maximumLevel: 19,
      //   credit: new Cesium.Credit('© Esri', 'https://www.esri.com/')
      // });

      // // 加载高德地图
      // let imageryProvider = new Cesium.UrlTemplateImageryProvider({
      //   // Cesium加载高德矢量图
      //   url: 'http://webrd02.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}',
      //   // Cesium加载高德影像图
      //   // url: "https://webst02.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}",
      //   // Cesium加载高德路网中文注记
      //   // url: "http://webst02.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scale=1&style=8",
      //   minimumLevel: 3,
      //   maximumLevel: 18,
      // })

      // this.viewer.imageryLayers.addImageryProvider(imageryProvider)

      // 地名 + 路网;
      this.viewer.imageryLayers.addImageryProvider(
        new Cesium.UrlTemplateImageryProvider({
          url: 'http://webst01.is.autonavi.com/appmaptile?style=8&x={x}&y={y}&z={z}',
        }),
      )


      // this.lensDistance()

      this.flytoChina()

      // 注册点击事件
      var handler = new Cesium.ScreenSpaceEventHandler(
        this.viewer.scene.canvas,
      )
      handler.setInputAction(event => {
        var pick = this.viewer.scene.pick(event.position)
        console.log('[ pick ]', pick)
        if (pick && pick.id._name == '测试数据') {
          billboardData._label._text._value = '测试文字标签label'
        }
      }, Cesium.ScreenSpaceEventType.LEFT_CLICK)

      console.log('[ this.viewer ]', this.viewer)
    },

    // 初始化Cesium后镜头远近调整
    lensDistance() {
      // 获取当前镜头位置的笛卡尔坐标
      let cameraPos = this.viewer.camera.position

      // 获取当前坐标系标准
      let ellipsoid = this.viewer.scene.globe.ellipsoid

      // 根据坐标系标准，将笛卡尔坐标转换为地理坐标
      let cartographic = ellipsoid.cartesianToCartographic(cameraPos)

      // 获取镜头的高度
      let height = cartographic.height

      // 镜头拉近
      this.viewer.camera.zoomIn(height / 3)

      // 镜头远离
      // this.viewer.camera.zoomOut(height * 1.2);
    },

    // 中国坐标
    // getChinaPostion() {
    //   return new Cesium.Cartesian3.fromDegrees(116.435314, 40.960521, 10000000.0);
    // },

    // 初始定位中国
    flytoChina() {
      // 飞入定位效果
      // this.viewer.camera.flyTo({
      //   destination: new Cesium.Cartesian3.fromDegrees(116.435314, 40.960521, 10000000.0),
      //   duration: 8
      // });

      // 直接定位 无效果
      this.viewer.camera.setView({
        destination: Cesium.Cartesian3.fromDegrees(
          116.435314,
          40.960521,
          10000000.0,
        ),
        orientation: {
          heading: 6.283185307179586,
          // 视角
          pitch: -1.5686521559334161,
          roll: 0,
        },
      })
    },

    //绘制点
    plottedPoints() {
      var Point = this.viewer.entities.add({
        id: 'pointA',
        name: '点',
        show: true,
        position: Cesium.Cartesian3.fromDegrees(117.3135, 39.0867, 0),
        //设置点的具体参数
        //文字标签
        label: {
          text: '测试点',
          font: '500 30px Helvetica', // 15pt monospace
          scale: 0.5,
          style: Cesium.LabelStyle.FILL,
          fillColor: Cesium.Color.WHITE,
          pixelOffset: new Cesium.Cartesian2(0, -30), //偏移量
          showBackground: true,
          backgroundColor: new Cesium.Color(0.5, 0.6, 1, 1.0),
        },
        point: {
          //点的颜色
          color: Cesium.Color.BLUE,
          //点的像素大小
          pixelSize: 15,
          //点的轮廓颜色
          outlineColor: Cesium.Color.WHITE,
          //点的轮廓宽度
          outlineWidth: 2,
          //贴地
          // heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
        },
      })
      // //相机飞到点
      this.viewer.flyTo(Point, {
        duration: 2,
        offset: {
          heading: Cesium.Math.toRadians(0.0),
          pitch: Cesium.Math.toRadians(-120),
          range: 10000,
        },
      })
    },

    // 移除点
    removePoint() {
      this.viewer.entities.removeById('pointA') //根据ID移除实体
      this.viewer.scene.requestRender();
    },

    // 绘制广告牌
    drawABillboard() {
      var billboardData = this.viewer.entities.add({
        id: 'billboard',
        name: '测试数据',
        position: Cesium.Cartesian3.fromDegrees(117.3135, 39.0867, 0), //东丽区
        //文字标签
        label: {
          text: '测试文字标签',
          font: '500 30px Helvetica', // 15pt monospace
          scale: 0.5,
          style: Cesium.LabelStyle.FILL,
          fillColor: Cesium.Color.WHITE,
          pixelOffset: new Cesium.Cartesian2(0, -45), //偏移量
          showBackground: true,
          backgroundColor: new Cesium.Color(0.5, 0.6, 1, 1.0),
        },
        // 图标
        billboard: {
          imageId: 'img',
          image: img,
          horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
          verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
          scale: 0.1,
        },
      })
      this.viewer.flyTo(billboardData, {
        duration: 2,
        offset: {
          heading: Cesium.Math.toRadians(0.0),
          pitch: Cesium.Math.toRadians(-120),
          range: 1000,
        },
      })
    },

    // 移除广告牌
    removeBillboard() {
      this.viewer.entities.removeById('billboard')
      this.viewer.scene.requestRender();
    },

    // 移除所有绘制的实体
    removeAll() {
      this.viewer.entities.removeAll() //移除集合中全部实体
      this.viewer.scene.requestRender();
    },

    // 加载模型
    addZSFJ() {
      this.addGLTFModel('zhishengji', '/cesiumModel/zhishengji.gltf', 116.435314, 40.960521, 1000,)
    },
    addBGL() {
      this.addGLTFModel('bangonglou', '/cesiumModel/bangonglou.gltf', 116.435314, 40.960522, 0, -280)
    },
    addDT() {
      this.addGLTFModel('dianta', '/cesiumModel/dianta.gltf', 116.435314, 41.960523, 0)
    },

    // 模型加载方法
    async addGLTFModel(name, url, longitude, latitude, height, offset = -50) {
      // Entity方法加载gltf
      this.viewer.entities.removeAll() //加载之前先清楚所有entity
      const position = Cesium.Cartesian3.fromDegrees(longitude, latitude, height)
      const heading = Cesium.Math.toRadians(135) //135度转弧度
      const pitch = Cesium.Math.toRadians(0);
      const roll = 0
      const hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll)
      const orientation = Cesium.Transforms.headingPitchRollQuaternion(
        position,
        hpr
      )
      const entity = await this.viewer.entities.add({
        name: name,
        position: position,
        orientation: orientation,
        label: {
          text: name,
          font: '500 30px Helvetica', // 15pt monospace
          scale: 0.5,
          style: Cesium.LabelStyle.FILL,
          fillColor: Cesium.Color.WHITE,
          pixelOffset: new Cesium.Cartesian2(0, offset), //偏移量 负数往上  整数放下
          showBackground: true,
          backgroundColor: new Cesium.Color(0.5, 0.6, 1, 1.0),
        },
        model: {
          uri: url,//注意entitits.add方式加载gltf文件时，这里是uri，不是url，并且这种方式只能加载.glb格式的文件
          scale: 1.0,//缩放比例
          minimumPixelSize: 128,//最小像素大小，可以避免太小看不见
          maximumScale: 20000,//模型的最大比例尺大小。minimumPixelSize的上限  
          incrementallyLoadTextures: true,//加载模型后纹理是否可以继续流入
          runAnimations: true,//是否启动模型中制定的gltf动画
          clampAnimations: true,//制定gltf动画是否在没有关键帧的持续时间内保持最后一个姿势
          shadows: Cesium.ShadowMode.ENABLED,
          heightReference: Cesium.HeightReference.NONE
        }
      })
      this.viewer.trackedEntity = entity; // 聚焦模型
      this.viewer.zoomTo(entity)
    }
  },
}
</script>

<style lang="scss" scoped>
.box {
  height: 100%;

  .buttonBox {
    padding: 5px;
  }

  .cesiumCss {
    width: 100%;
    height: calc(100% - 42px);
    margin: 0;
    padding: 0;
    overflow: hidden;
  }
}
</style>
