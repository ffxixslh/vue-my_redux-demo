import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "main",
    redirect: "/index",
    component: () => import("@/views/Main.vue"),
    children: [
      {
        path: "/index",
        name: "index",
        component: () => import("@/views/Index.vue"),
      },
      {
        path: "/add",
        name: "add",
        component: () => import("@/views/Add.vue"),
      },
      {
        path: "/find",
        name: "find",
        component: () => import("@/views/Find.vue"),
      },
      {
        name: "404",
        path: "/:catchAll(.*)",
        component: () => import("@/views/404.vue"),
      },
    ],
  },
];

const router = createRouter({
  // 配置地址栏中的路径
  history: createWebHistory("/"),
  routes,
});

export default router;
