import Vue from 'vue'
import Router from 'vue-router'
import axios from 'axios'
// view pages
import Home from './views/Home.vue'
import Suggestion from './views/suggestion.vue'
import SugDetail from './views/suggestion_detail.vue'
import Letter from './views/letter.vue'
import User from './views/user.vue'
import Page from './views/page.vue'
import Company from './views/company.vue'

Vue.use(Router)

Vue.prototype.$axios = axios
const apiRootPath = process.env.NODE_ENV !== 'production' ? 'https://nemv-stack.run.goorm.io/api/' : '/api/'
axios.defaults.baseURL = apiRootPath // axios기본 요청 url 추가
axios.defaults.headers.common['Authorization'] = (localStorage.getItem('token') || 'inval')
// 기본적으로 axios 요청보낼때 header에 토큰 추가해서 보냄

axios.interceptors.request.use(function (config) {
  // axios 인터셉터 == 가로채는 놈, 보내기 받기전에 무언가 할 수 있음
  config.headers.Authorization = localStorage.getItem('token')
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})
// Add a response interceptor
axios.interceptors.response.use(function (response) {
  // Do something with response data
  return response
}, function (error) {
  // Do something with response error
  return Promise.reject(error)
})

const pageCheck = (to, from, next) => {
  axios.post('page', { name: to.path.replace('/', '') })
  // 넘어가면서 json 객체를 반환해서 조건문 사용해주었음
    .then((r) => {
      if (!r.data.success) throw new Error(r.data.msg)
      next()
    })
    .catch((e) => {
      next(`/block/${e.message}`)
    })
}

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      beforeEnter: pageCheck
    },
    {
      path: '/suggestion',
      name: '건의사항',
      component: Suggestion,
      beforeEnter: pageCheck
    },
    {
      path: '/suggestion/detail/:suggestionId',
      name: '건의사항 상세',
      component: SugDetail
    },
    {
      path: '/letter',
      name: '마음의 편지함',
      component: Letter,
      beforeEnter: pageCheck
    },
    {
      path: '/page',
      name: '페이지',
      component: Page,
      beforeEnter: pageCheck
    },
    {
      path: '/user',
      name: 'user',
      component: User,
      beforeEnter: pageCheck
    },
    {
      path: '/company',
      name: 'company',
      component: Company,
      beforeEnter: pageCheck
    },
    {
      path: '/sign',
      name: '로그인',
      component: () => import('./views/sign')
    },
    {
      path: '/block/:msg',
      name: '차단',
      component: () => import('./views/block')
    }
  ]
})
