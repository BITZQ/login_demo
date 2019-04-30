
import Vue from 'vue'
import App from './App'
import router from './router'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import axios from 'axios'
Vue.prototype.$ajax = axios
// axios不能直接使用use引入，只能每个需要发送请求的组件中即时引入，两种引入方式
// 第一种引入方式：引入axios后，修改原型链
// import axios from 'axios'
// Vue.prototype.$axios = axios

import Mock from './mock/index'
Mock.init()
Vue.config.productionTip = false;
Vue.use(ElementUI);


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

