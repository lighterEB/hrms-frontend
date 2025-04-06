// 登录请求参数
export interface LoginRequest {
  username: string;
  password: string;
}

// 注册请求参数
export interface RegisterRequest {
  username: string;
  password: string;
  realName: string;
  phone: string;
  email?: string;
}

// 修改密码请求参数
export interface UpdatePasswordRequest {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

// 登录响应数据
export interface LoginResponse {
  token: string;
  tokenType: string;
  expiresIn: number;
  userInfo: UserInfoResponse;
}

// 用户信息
export interface UserInfoResponse {
  id: number;
  username: string;
  realName: string | null;
  avatar: string | null;
  email: string | null;
  phone: string | null;
  roles: string[];
  permissions: string[];
}

// 系统用户信息
export interface SysUser {
  id: number;
  createTime: string;
  createUser: string;
  updateTime: string;
  updateUser: string;
  isDeleted: number;
  username: string;
  password: string;
  realName: string;
  phone: string;
  email: string;
  avatar: string;
  gender: number;
  status: number;
  lastLoginTime: string;
}

// 通用响应格式
export interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
  extra?: any;
  success: boolean;
  timestamp: number;
}
