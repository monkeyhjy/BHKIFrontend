import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/BlogDashboard",
    name: "BlogDashboard",
    component: () => import("../components/blogDashboard.vue"),
    children: [
      {
        path: "BlogDesktop",
        name: "BlogDesktop",
        component: () => import("../views/blog/blogDashboard/blogDesktop.vue")
      },
      {
        path: "BlogMyBlog",
        name: "BlogMyBlog",
        component: () => import("../views/blog/blogDashboard/blogMyBlog.vue")
      },
      {
        path: "BlogMyTips",
        name: "BlogMyTips",
        component: () => import("../views/blog/blogDashboard/blogMyTips.vue")
      }
    ]
  },
      {
        path: "/BlogSearchItems/:search",
        name: "BlogSearchItems",
        component: () => import("../views/blog/blogSearchItems.vue")
      },
      {
        path: "/BlogItem/:userid/:blogid",
        name: "BlogItem",
        component: () => import("../views/blog/blogItem.vue")
      },
      { 
        path: "/BlogEdit/:userid/:blogid",
        name: "BlogEdit",
        component: () => import("../views/blog/blogEdit.vue")
      },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
