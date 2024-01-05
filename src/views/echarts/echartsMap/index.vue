<!-- echarts 地图 -->
<template>
  <div>
    <comEchartsMap :mapName="mapName" :height="'89vh'"></comEchartsMap>
  </div>
</template>

<script>
import comEchartsMap from '@/components/commonEcharts/comEchartsMap';
export default {
  name: 'echartsMapIndex',
  // 局部注册的组件
  components: {
    comEchartsMap
  },
  data() {
    return {
      mapName: 'china',
    };
  },

  mounted() {

  },

  methods: {

  },
};
</script>

<style lang="scss" scoped></style>