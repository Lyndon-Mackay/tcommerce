import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/HomePage.vue";

const home = { path: "/", name: "home", component: Home };
const login = {
  path: "/login",
  name: "log",
  component: () => import("../views/LogIn.vue"),
  meta: {
    loginControl: true,
  },
};

const routes = [
  home,
  login,
  {
    path: "/finishedgoods",
    name: "finished",
    component: () => import("../views/FinishedGoodPage.vue"),
    meta: {
      requiresLogin: true,
    },
  },
  {
    path: "/hardware",
    name: "hardware",
    component: () => import("../views/HardwarePage.vue"),
  },
  {
    path: "/blog",
    name: "blog",
    component: () => import("../views/SellingBlog.vue"),
  },
  {
    path: "/sales",
    name: "sales",
    component: () => import("../views/SalesPage.vue"),
  },
  { path: "/blog/undefined:prematch(.*)*", name: "Noblog", component: () => import("../views/NoBlog.vue") },
  {
    path: "/blog/:id",
    name: "blogPost",
    component: () => import("../components/BlogPost.vue"),
    props: true,
  },
  { path: "/:matchstring(.*)*", name: "NotFound", component: () => import("../views/NotFound.vue") },
];

const router = createRouter({
  routes,
  history: createWebHistory(),
  scrollBehavior(to, from, savedPostion) {
    return savedPostion || { top: 0, behavior: "smooth" };
  },
});

router.beforeEach((to: any, from: any) => {
  const isLoggedIn = localStorage.getItem("user") != null;

  if (to.name != "login" && to.meta.loginControl && isLoggedIn) {
    return { home };
  }
  if (to.name === "sales" && !isLoggedIn) {
    console.log(to);
    return { query: { redirect: "sales" }, ...login };
  }
});

export default router;
