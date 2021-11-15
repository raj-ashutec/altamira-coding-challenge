import Vue from "vue";
import VueRouter from "vue-router";
import FindUser from "../views/FindUser.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "FindUser",
    component: FindUser,
  },
  {
    path: "/addUser",
    name: "AddUser",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AddUser.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
