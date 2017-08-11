import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import QuesDetail from '@/components/QuesDetail'
import AddQues from '@/components/AddQues'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/index',
      name: 'home',
      component: Home
    },
    {
      path: '*',
      component: Home,
      redirect: '/index'
    },
    {
      path: '/home/quesDetail/:id',
      name: 'quesDetail',
      component: QuesDetail
    },
    {
      path: '/home/addQues/',
      name: 'addQues',
      component: AddQues
    }
  ]
})
