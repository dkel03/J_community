import Vue from 'vue'
import Router from 'vue-router'
import axios from 'axios'
// view pages
import Home from './views/Home.vue'
import Suggestion from './views/suggestion.vue'
import SugDetail from './views/suggestion_detail.vue'
import Letter from './views/letter.vue'

Vue.use(Router)

Vue.prototype.$axios = axios
const apiRootPath = process.env.NODE_ENV !== 'production' ? 'https://nemv-stack.run.goorm.io/api/' : '/api/'

const pageCheck = (to, from, next) => {
  // return next()
  const token = localStorage.getItem('token')
  axios.post(`${apiRootPath}page`, { name: to.path.replace('/', '') }, { headers: { authorization: `${token || null}` } })
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
      component: () => import('./views/page')
    },
    {
      path: '/user',
      name: 'user',
      component: () => import('./views/user.vue')
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
