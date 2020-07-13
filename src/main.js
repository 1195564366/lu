import Vue from 'vue'
import App from './App.vue'
import Vant from 'vant'

import router from './router'

import { Cache } from '@utils'

import 'vant/lib/index.css'
import 'lib-flexible/flexible'

import './style/index.scss'
import 'static/iconfont/iconfont.css'

import { fetchPost, fetchGet } from './axios'
import api from './api'
// import Vconsole from 'vconsole'

// const vconsole = new Vconsole()

import './permission'
// 工程全局组件注册

Vue.config.productionTip = false

Vue.prototype.$fetchPost = fetchPost
Vue.prototype.$fetchGet = fetchGet
Vue.prototype.$api = api
Vue.use(Vant)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
