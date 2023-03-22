import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: () => import("@/views/HomeView.vue"),
    },
    {
      path: "/form",
      component: () => import("@/views/FormView.vue"),
    },
    {
      path: "/documents",
      component: () => import("@/views/DocumentsView.vue"),
    },
    {
      path: "/calendar",
      component: () => import("@/views/CalendarView.vue"),
    },
    {
      path: "/tools",
      component: () => import("@/views/ToolsView.vue"),
    },
  ],
});

export default router;
