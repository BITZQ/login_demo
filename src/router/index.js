import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import home from '@/components/home'
import userList from '@/components/userList'



Vue.use(Router)

const router= new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/home',
      name: 'home',
      component: home,
      children:[
        {path:'/userList',name:'userList',component:userList}
      ]
    }
  ]
})


// 访问之前，检查是否登陆了
router.beforeEach((to, from, next) => {
  if(to.path.startsWith('/login')) {
    window.sessionStorage.removeItem('user');
    next()
  }else {
    let token = window.sessionStorage.getItem('user');
    if (!token) {
      next({path: '/login'})
    }else {
      next()
    }
  }
});
export default router
