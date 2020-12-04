import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import PersonInfo from '../views/PersonInfo.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: "/personinfo/information"
  },
  {
    path: '/personinfo',
    name: 'PersonInfo',
    component: PersonInfo,
    children: [
      {
        path: 'information',
        name: 'Information',
        component: ()=> import('../views/Information.vue'),
      },
      {
        path: 'following',
        name: 'Following',
        component: ()=> import('../views/Following.vue'),
      },
      {
        path: 'collected',
        name: 'Collected',
        component: ()=> import('../views/Collected.vue'),
      },
    ],
  },
  {
    path:'/userinfo/:userId',
    name:'UserId',
    component: ()=> import('../views/UserInfo.vue'),
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
