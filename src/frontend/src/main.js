import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import Mint from 'mint-ui';
import 'element-ui/lib/theme-chalk/index.css'
import 'mint-ui/lib/style.css'
// import './assets/css/icon.css'
Vue.config.productionTip = false
Vue.use(ElementUI, { size: "small" });
Vue.use(Mint);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
