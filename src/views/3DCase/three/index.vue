<template>
  <div id="container"></div>
</template>

<script>
import * as Three from 'three'
let scene = null,
  camera = null,
  renderer = null,
  mesh = null
export default {
  data() {
    return {

    };
  },
  methods: {
    init() {
      let container = document.getElementById('container');
      camera = new Three.PerspectiveCamera(70, container.clientWidth / container.clientHeight, 0.01, 10);
      camera.position.z = 1
      scene = new Three.Scene()
      let geometry = new Three.BoxGeometry(0.2, 0.2, 0.2);
      let material = new Three.MeshNormalMaterial();

      mesh = new Three.Mesh(geometry, material);
      scene.add(mesh);

      renderer = new Three.WebGLRenderer({ antialias: true });
      renderer.setSize(container.clientWidth, container.clientHeight);
      container.appendChild(renderer.domElement);
    },
    animate() {
      requestAnimationFrame(this.animate);
      //console.log(this.animate,'132')
      mesh.rotation.x += 0.01;
      mesh.rotation.y += 0.02;
      renderer.render(scene, camera);
    }
  },
  mounted() {
    this.init()
    this.animate()
  }

}

</script>
<style scoped>
#container {
  width: 100vw;
  height: 100vh;
}
</style>
