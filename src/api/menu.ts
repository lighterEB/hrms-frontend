import http from '@/utils/request'
import type { MenuVO } from '@/types/menu'
import { menuList } from '@/mock/menuData'

/**
 * 获取当前用户的菜单列表
 */
export function getUserMenus(): Promise<MenuVO[]> {
  // 使用本地mock数据
  if (import.meta.env.DEV) {
    return Promise.resolve(menuList)
  }
  // 生产环境使用真实API
  return http.get('/v1/permissions/menu')
} 