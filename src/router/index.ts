import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import { WHITE_LIST } from "./constants";
import { useUserStore } from "@/stores/user";
import { useMenuStore } from "@/stores/menu";
import message from "@/utils/message";

// 静态路由
export const constantRoutes: RouteRecordRaw[] = [
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
      {
        path: "my-profile",
        name: "UserProfile",
        component: () => import("@/views/user-profile/index.vue"),
        meta: {
          title: "个人资料",
          requiresAuth: true
        },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: constantRoutes,
});

// 是否已经加载过动态路由
let hasLoadedRoutes = false;

// 路由守卫
router.beforeEach(async (to, from, next) => {
  // 设置页面标题
  const title = to.meta.title
    ? `${to.meta.title} - 人力资源管理系统`
    : "人力资源管理系统"
  document.title = title

  const userStore = useUserStore()
  const menuStore = useMenuStore()
  const token = userStore.token
  
  console.log('路由守卫 - 当前路由:', to.path, '是否有token:', !!token);

  // 如果访问登录页且已登录，重定向到首页
  if (to.path === '/login' && token) {
    next('/')
    return
  }

  // 如果未登录且访问需要登录的页面，重定向到登录页
  if (!token && to.path !== '/login') {
    next('/login')
    return
  }

  // 如果已登录且不是访问登录页
  if (token && to.path !== '/login') {
    try {
      // 如果用户信息不存在，获取用户信息
      if (!userStore.userInfo) {
        await userStore.getInfo()
      }

      // 获取并加载菜单
      const menus = await menuStore.getMenus()
      if (menus.length > 0) {
        await menuStore.addDynamicRoutes()
      }

      // 如果访问的是根路径，重定向到首页
      if (to.path === '/') {
        next('/home')
        return
      }

      next()
    } catch (error) {
      console.error('路由守卫错误:', error)
      // 发生错误时清除状态并重定向到登录页
      userStore.resetState()
      next('/login')
    }
  } else {
    next()
  }
});

// 路由错误处理
router.onError((error) => {
  console.error("路由错误:", error);
  message.error("页面加载失败，请刷新重试");
});

export default router;
