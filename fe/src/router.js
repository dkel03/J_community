import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
	  {
      path: '/suggestion',
      name: '건의사항',
      component: () => import('./views/suggestion.vue')
    },
	  {
      path: '/suggestion/detail/:suggestionId',
      name: '건의사항 상세',
      component: () => import('./views/suggestion_detail.vue')
    },
	  {
      path: '/sign',
      name: '로그인',
      component: () => import('./views/sign')
    },
  ]
})
