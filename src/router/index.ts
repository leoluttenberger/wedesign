import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: () => import("../views/HomeView.vue"),
    },
    {
      path: "/register",
      name: "Register",
      component: () => import("../views/RegisterView.vue"),
    },
    {
      path: "/sign-in",
      component: () => import("../views/SignInView.vue"),
    },
    {
      path: "/feed",
      component: () => import("../views/FeedView.vue"),
    },
    {
      path: "/about",
      component: () => import("../views/AboutView.vue"),
    },
  ],
});

export default router;
