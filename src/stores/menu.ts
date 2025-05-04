import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { getUserMenus } from '@/api/menu'
import type { MenuVO, RouteMenu } from '@/types/menu'
import router from '@/router'

export const useMenuStore = defineStore('menu', () => {
  const menus = ref<MenuVO[]>([])
  const loading = ref(false)
  const hasMenus = ref(false)

  // 菜单树形结构
  const menuTree = computed(() => buildMenuTree(menus.value))
  
  // 获取用户菜单
  async function getMenus() {
    try {
      loading.value = true
      const result = await getUserMenus()
      menus.value = result
      hasMenus.value = result.length > 0
      return result
    } catch (error) {
      console.error('获取菜单失败:', error)
      menus.value = []
      hasMenus.value = false
      return []
    } finally {
      loading.value = false
    }
  }
  
  // 重置菜单状态
  function resetState() {
    console.log('重置菜单状态');
    menus.value = []
    loading.value = false
    hasMenus.value = false
  }
  
  // 构建树形菜单
  function buildMenuTree(menus: MenuVO[]): MenuVO[] {
    if (!menus || menus.length === 0) {
      return []
    }
    
    console.log('构建菜单树，原始菜单数据:', menus);
    
    // 检查是否已经是树形结构
    const isAlreadyTree = menus.some(menu => menu.children && menu.children.length > 0);
    if (isAlreadyTree) {
      console.log('API已返回树形结构，无需再次构建');
      return menus;
    }
    
    // 创建一个映射，用于快速查找菜单项
    // const menuMap = new Map<number, MenuVO>()
    // const result: MenuVO[] = []
    const result = [...menus];
    
    // // 第一步：建立映射关系
    // menus.forEach(menu => {
    //   menuMap.set(menu.id, { ...menu, children: [] })
    // })
    
    // // 第二步：构建树形结构
    // menus.forEach(menu => {
    //   const currentMenu = menuMap.get(menu.id)
    //   if (currentMenu) {
    //     // 判断是否为顶级菜单（父ID为null或0）
    //     if (menu.parentId === null || menu.parentId === 0) {
    //       // 一级菜单
    //       result.push(currentMenu)
    //     } else {
    //       // 子菜单
    //       const parentMenu = menuMap.get(menu.parentId)
    //       if (parentMenu) {
    //         if (!parentMenu.children) {
    //           parentMenu.children = []
    //         }
    //         parentMenu.children.push(currentMenu)
    //       } else {
    //         // 如果找不到父菜单，作为顶级菜单处理
    //         console.warn(`菜单ID ${menu.id} 的父菜单 ${menu.parentId} 不存在，作为顶级菜单处理`);
    //         result.push(currentMenu)
    //       }
    //     }
    //   }
    // })
    
    // 第三步：按照排序字段排序
    result.sort((a, b) => (a.sort || 0) - (b.sort || 0))
    result.forEach(menu => {
      if (menu.children && menu.children.length > 0) {
        menu.children.sort((a, b) => (a.sort || 0) - (b.sort || 0))
      }
    })
    
    console.log('构建完成的菜单树:', result);
    return result
  }
  
  // 将菜单转换为路由
  function generateRoutes(tree: MenuVO[] = menuTree.value) {
    if (!tree || tree.length === 0) {
      return []
    }
    
    console.log('转换菜单为路由, 菜单数据:', tree);
    
    return tree.map(menu => {
      // 处理父级菜单，如果component为null，使用Layout组件
      if (!menu.component && menu.children && menu.children.length > 0) {
        menu.component = 'Layout';
      }
      
      const route: RouteMenu = {
        path: menu.path,
        name: menu.name,
        component: loadComponent(menu.component),
        redirect: menu.children && menu.children.length > 0 ? menu.children[0].path : undefined,
        meta: {
          title: menu.name,
          icon: menu.icon,
          hidden: menu.hidden || false,
          sort: menu.sort || 0
        },
        children: menu.children?.length ? generateRoutes(menu.children) : undefined
      }
      
      console.log(`生成路由: ${menu.name}, path: ${menu.path}, component: ${menu.component}`);
      return route
    })
  }
  
  // 动态加载组件
  function loadComponent(component: string) {
    if (!component) {
      // 对于没有组件的菜单项，使用空白组件
      return () => import('@/views/empty.vue')
    }
    
    // 处理布局组件
    if (component === 'Layout') {
      return () => import('@/layouts/default/index.vue')
    }
    
    // 修正组件路径，去掉前面的斜杠
    const path = component.startsWith('/') ? component.substring(1) : component;
    const parts = path.split('/');
    const module = parts[0];
    const submodule = parts[1];
    const view = parts[2] || 'index';
    
    // 动态导入组件
    return () => {
      // 使用动态导入并添加错误处理
      return import(`@/views/${module}/${submodule}/${view}.vue`).catch(err => {
        console.error(`无法加载组件: @/views/${module}/${submodule}/${view}.vue`, err);
        // 导入失败时返回空白组件
        return import('@/views/empty.vue');
      });
    };
  }
  
  // 动态添加路由
  async function addDynamicRoutes() {
    try {
      console.log('开始添加动态路由');
      const routes = generateRoutes()
      console.log('生成的路由配置:', JSON.stringify(routes, null, 2));
      
      // 清除旧路由
      const currentRoutes = router.getRoutes()
      currentRoutes.forEach(route => {
        // 只清除非基础路由
        if (route.name && 
            !['Login', 'Home', 'UserProfile'].includes(route.name.toString()) && 
            route.path !== '/' && 
            route.path !== '/login' && 
            route.path !== '/home' && 
            route.path !== '/my-profile') {
          console.log('移除路由:', route.name);
          router.removeRoute(route.name)
        }
      })
      
      // 添加新路由
      routes.forEach(route => {
        console.log('添加路由:', route.name, route.path);
        router.addRoute(route as any)
      })
      
      console.log('动态路由添加完成');
      return routes
    } catch (error) {
      console.error('添加动态路由出错:', error);
      return []
    }
  }
  
  return {
    menus,
    loading,
    hasMenus,
    menuTree,
    getMenus,
    generateRoutes,
    addDynamicRoutes,
    resetState
  }
}) 