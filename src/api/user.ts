import http from '@/utils/request'
import type { PageQuery, PageResult } from '@/types/common'
import type { UserVO, UserForm, UserQuery } from '@/types/user'

/**
 * 分页获取用户列表
 * @param params 查询参数
 */
export function getUserList(params: UserQuery & PageQuery): Promise<PageResult<UserVO>> {
  return http.get('/v1/users/page', { params })
}

/**
 * 获取用户详情
 * @param id 用户ID
 */
export function getUserDetail(id: number): Promise<UserVO> {
  return http.get(`/v1/users/${id}`)
}

/**
 * 创建用户
 * @param data 用户数据
 */
export function createUser(data: UserForm): Promise<UserVO> {
  return http.post('/v1/users', data)
}

/**
 * 更新用户
 * @param id 用户ID
 * @param data 用户数据
 */
export function updateUser(id: number, data: UserForm): Promise<UserVO> {
  return http.put(`/v1/users/${id}`, data)
}

/**
 * 删除用户
 * @param id 用户ID
 */
export function deleteUser(id: number): Promise<void> {
  return http.delete(`/v1/users/${id}`)
}

/**
 * 修改用户状态
 * @param id 用户ID
 * @param status 状态(0-禁用,1-启用)
 */
export function updateUserStatus(id: number, status: number): Promise<void> {
  return http.patch(`/v1/users/${id}/status`, { status })
}

/**
 * 重置用户密码
 * @param id 用户ID
 * @param password 新密码
 */
export function resetUserPassword(id: number, password: string): Promise<void> {
  return http.patch(`/v1/users/${id}/password`, { password })
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