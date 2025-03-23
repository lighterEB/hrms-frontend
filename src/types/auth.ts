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

// 登录响应
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

// 通用响应格式
export interface ApiResponse<T> {
  code: number;
  msg: string;
  data: T;
}

// 通用响应格式
export interface ApiResponse<T> {
  code: number;
  msg: string;
  data: T;
}
