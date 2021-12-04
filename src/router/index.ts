/*
 * @Author: qianlong github:https://github.com/LINGyue-dot
 * @Date: 2021-12-03 15:19:58
 * @LastEditors: qianlong github:https://github.com/LINGyue-dot
 * @LastEditTime: 2021-12-04 17:59:26
 * @Description:
 */
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/form",
  },
  {
    path: "/form",
    component: () => import("@/views/form/index.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
