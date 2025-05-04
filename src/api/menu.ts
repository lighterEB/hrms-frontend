import http from '@/utils/request'
import type { MenuVO } from '@/types/menu'

/**
 * 获取当前用户的菜单列表
 */
export function getUserMenus(): Promise<MenuVO[]> {
  console.log('从后端API获取菜单数据')
  return http.get('/v1/permissions/menu')
} 