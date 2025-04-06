import http from '@/utils/request'
import type { 
  LoginRequest, 
  LoginResponse, 
  UserInfoResponse, 
  RegisterRequest, 
  UpdatePasswordRequest,
  SysUser
} from '@/types/auth'

// 登录接口
export function login(data: LoginRequest): Promise<LoginResponse> {
  return http.post('/auth/login', data)
}

// 注册接口
export function register(data: RegisterRequest): Promise<void> {
  return http.post('/auth/register', data)
}

// 获取用户信息
export function getUserInfo(): Promise<SysUser> {
  return http.get('/auth/info')
}

// 登出
export function logout(): Promise<void> {
  return http.post('/auth/logout')
}

// 修改密码
export function updatePassword(data: UpdatePasswordRequest): Promise<void> {
  return http.post('/auth/password', data)
}