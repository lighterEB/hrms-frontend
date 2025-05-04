/**
 * 用户VO
 */
export interface UserVO {
  id: number
  username: string
  realName: string
  gender: number
  phone: string | null
  email: string | null
  status: number
  avatar?: string | null
  createTime: string
  updateTime: string
  roles: RoleInfo[]
}

/**
 * 角色信息
 */
export interface RoleInfo {
  id: number
  name: string
  description: string
}

/**
 * 用户表单数据
 */
export interface UserForm {
  username: string
  password: string
  realName: string
  gender: number
  phone: string
  email: string
  roleIds: number[]
  status: number
}

/**
 * 用户查询参数
 */
export interface UserQuery {
  username?: string
  realName?: string
  phone?: string
  email?: string
  status?: number
} 