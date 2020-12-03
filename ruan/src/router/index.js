import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: '/BlogDesktop',
    name: 'BlogDesktop',
    component: () => import("../views/blogDesktop.vue")
  },
  {
    path: '/blogreported',
    name: 'BlogReported',
    component: () => import("../views/manage/articleReported.vue")
  },
  {
    path: '/commentreported',
    name: 'CommentReported',
    component: () => import("../views/manage/commentReported.vue")
  },
  {
    path: '/gwreported',
    name: 'GWReported',
    component: () => import("../views/manage/gwReported.vue")
  }
];


const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
