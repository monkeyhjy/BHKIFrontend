import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Search from "../views/Search";
import Navigation from "../views/Navigation";
import Header from "../components/Header";

Vue.use(VueRouter)

const routes = [
  {path:'/', redirect:'/Navigation'},
  {
    path:'/Navigation',
    name:'Navigation',
    component:Navigation,
    children:[
      {
        path: '/',
        name: 'Home',
        component: Home
      },
      {
        path:'/Search',
        name:'Search',
        component:Search
      },
    ]
  },
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Home
  // },
  // {
  //   path:'/Search',
  //   name:'Search',
  //   component:Search
  // },
  //
  // {
  //   path:'/Header',
  //   name:'/Header',
  //   component:Header
  // },
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
