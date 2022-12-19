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
      path: "/form",
      component: () => import("../views/FormView.vue"),
    },
    {
      path: "/chat",
      component: () => import("../views/ChatView.vue"),
    },
    {
      path: "/documents",
      component: () => import("../views/DocumentsView.vue"),
    },
    {
      path: "/calendar",
      component: () => import("../views/CalendarView.vue"),
    },
  ],
});

export default router;
