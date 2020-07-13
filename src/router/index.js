import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: resolve => require(['@/App'], resolve),
      redirect: '/home',
      children: [{
          path: '/home',
          component: resolve => require(['@views/home.vue'], resolve)
      }, {
        path: '/list',
        component: resolve => require(['@views/list.vue'], resolve)
      }]
    }
  ]
})