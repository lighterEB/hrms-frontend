import http from '@/utils/request'
import type { RoleInfo } from '@/types/user'

/**
 * 获取所有角色列表（用于下拉框选择）
 */
export function getAllRoles(): Promise<RoleInfo[]> {
  return http.get('/v1/roles/all')
} 