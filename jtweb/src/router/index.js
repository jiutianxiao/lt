import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/page/user/Login'
import register from '@/page/user/register'
import resetPW from '@/page/user/resetPW'
import pageIndex from '@/page/browse/index'
import pagepost from '@/page/browse/post'
import details from '@/page/browse/details'
import userData from '@/page/user/userData'
import userTheme from '@/page/user/theme'
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'pageIndex',
      component: pageIndex,
      meta: {
        pageTitle: "首页"
      }
    },
    {
      path: '/pagepost',
      name: 'post',
      component: pagepost,
      meta: {
        pageTitle: "发帖"
      }
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login,
      meta: {
        pageTitle: "登录"
      }
    },
    {
      path: '/register',
      name: 'register',
      component: register,
      meta: {
        pageTitle: "注册"
      }
    },
    {
      path: '/resetPW',
      name: 'resetPW',
      component: resetPW,
      meta: {
        pageTitle: "重置密码"
      }
    },
    {
      path: '/details',
      name: 'details',
      component: details,
      meta: {
        pageTitle: "帖子详情"
      }
    },
    {
      path: '/userData',
      name: 'userData',
      component: userData,
      children: [  //这里就是二级路由的配置
        {
          path: 'theme',
          name: 'theme',
          components: {theme: userTheme}
        },
        {
          path: 'news',
          name: 'news',
          components: {news: userTheme}
        }
      ]
    },
  ]
})
