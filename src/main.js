import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// font
import './assets/fonts/iconfont.css'
// vant
import Vant from 'vant'
import 'vant/lib/index.css'
// flex
import 'amfe-flexible/index'

Vue.use(Vant)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
