import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import { WHITE_LIST } from "./constants";
import { useUserStore } from "@/stores/user";
import message from "@/utils/message";

const routes: RouteRecordRaw[] = [
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/login/index.vue"),
    meta: {
      title: "登录",
    },
  },
  {
    path: "/",
    component: () => import("@/layouts/default/index.vue"),
    redirect: "/home",
    children: [
      {
        path: "home",
        name: "Home",
        component: () => import("@/views/home/index.vue"),
        meta: {
          title: "首页",
        },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 路由守卫
router.beforeEach(async (to, from, next) => {
  // 设置页面标题
  const title = to.meta.title
    ? `${to.meta.title} - 人力资源管理系统`
    : "人力资源管理系统"
  document.title = title

  const userStore = useUserStore()
  const token = userStore.token

  // 已经登录的情况
  if (token) {
    if (to.path === "/login") {
      // 已登录状态下访问登录页，重定向到首页
      next({ path: "/" })
    } else {
      // 如果没有用户信息，先获取用户信息
      if (!userStore.userInfo) {
        try {
          await userStore.getInfo()
          next()
        } catch (error) {
          // 获取用户信息失败，可能是token过期
          message.error("登录状态已过期，请重新登录")
          userStore.resetState()
          next(`/login?redirect=${to.path}`)
        }
      } else {
        next()
      }
    }
    return
  }

  // 未登录但有记住我的情况，尝试自动登录
  if (!token && userStore.rememberMe && to.path !== '/login' && !WHITE_LIST.includes(to.path)) {
    try {
      await userStore.autoLogin()
      // 自动登录成功，继续访问目标页面
      if (to.path === '/login') {
        next('/')
      } else {
        next()
      }
      return
    } catch (error) {
      // 自动登录失败，重定向到登录页
      next(`/login?redirect=${to.path}`)
      return
    }
  }

  // 白名单路由直接放行
  if (WHITE_LIST.includes(to.path)) {
    next()
    return
  }
  
  // 其他未登录情况，重定向到登录页
  message.warning("请先登录")
  next(`/login?redirect=${to.path}`)
});

// 路由错误处理
router.onError((error) => {
  console.error("路由错误:", error);
  message.error("页面加载失败，请刷新重试");
});

export default router;
