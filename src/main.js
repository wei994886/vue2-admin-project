import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
 
Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  el: '#app',
  render: h => h(App)
}).$mount('#app')