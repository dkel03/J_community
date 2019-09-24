import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import SugDetail from './views/suggestion_detail.vue';

Vue.use(Router);

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
      component: SugDetail,
      //auth check
      beforeEnter: (to, from, next) => {
        if (!localStorage.getItem('token')) 
          return next('block');
        next();
      }
    },
    {
      path: '/sign',
      name: '로그인',
      component: () => import('./views/sign')
    },
    {
      path: '/block',
      name: '차단',
      component: () => import('./views/block')
    }
  ]
});