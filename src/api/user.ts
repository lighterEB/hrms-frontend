import http from '@/utils/request'
import type { SysUser, UpdateUserRequest } from '@/types/auth'

/**
 * 获取用户详情
 * @param id 用户ID
 * @returns 用户详细信息
 */
export function getUserDetail(id: number): Promise<SysUser> {
  return http.get(`/v1/users/${id}`)
}

/**
 * 更新用户信息
 * @param id 用户ID
 * @param data 用户信息
 * @returns void
 */
export function updateUser(id: number, data: UpdateUserRequest): Promise<void> {
  return http.put(`/v1/users/${id}`, data)
}

/**
 * 上传用户头像
 * @param file 头像文件
 * @returns 头像URL
 */
export function uploadAvatar(file: File): Promise<string> {
  const formData = new FormData()
  formData.append('file', file)
  
  return http.post('/v1/users/avatar', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
} 