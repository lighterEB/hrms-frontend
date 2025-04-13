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

  // 已经登录的情况
  if (token) {
    if (to.path === "/login") {
      // 已登录状态下访问登录页，重定向到首页
      console.log('已登录，重定向到首页');
      next({ path: "/" })
    } else {
      // 如果还没有加载过动态路由，先获取用户信息和菜单
      if (!hasLoadedRoutes) {
        try {
          console.log('准备加载动态路由...');
          // 先获取用户信息
          if (!userStore.userInfo) {
            console.log('获取用户信息...');
            await userStore.getInfo()
          }
          
          // 加载菜单并生成路由
          console.log('获取菜单...');
          const menus = await menuStore.getMenus()
          console.log('获取到的菜单数据:', menus);
          
          console.log('添加动态路由...');
          await menuStore.addDynamicRoutes()
          
          // 标记已加载动态路由
          hasLoadedRoutes = true
          
          // 重新进入当前路由，确保所有动态路由已加载
          console.log('重新导航到:', to.path);
          next({ ...to, replace: true })
          return
        } catch (error) {
          // 获取信息失败，可能是token过期
          console.error('获取信息失败:', error);
          message.error("登录状态已过期，请重新登录")
          userStore.resetState()
          // 重置路由加载状态
          hasLoadedRoutes = false
          next(`/login?redirect=${to.path}`)
          return
        }
      }
      
      // 正常访问路由
      console.log('正常访问路由:', to.path);
      next()
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
