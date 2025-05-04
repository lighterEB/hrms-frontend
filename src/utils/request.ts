import axios from 'axios'
import type { AxiosInstance, AxiosResponse, AxiosError } from 'axios'
import message from './message'
import router from '@/router'
import type { ApiResponse } from '@/types/common'

// 创建请求实例
const request: AxiosInstance = axios.create({
  baseURL: '/api',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
})

// 统一错误处理函数
const handleError = (error: any, url?: string) => {
  // 不处理取消请求的错误
  if (axios.isCancel(error)) {
    return Promise.reject(error)
  }

  // 处理超时错误
  if (error.code === 'ECONNABORTED' && error.message.includes('timeout')) {
    message.error('请求超时，请重试')
    return Promise.reject(new Error('请求超时'))
  }

  // 处理请求错误
  if (error.response) {
    const { status, data } = error.response
    // 登录接口错误单独处理
    if (url?.includes('/auth/login')) {
      return Promise.reject(new Error(data?.message || '用户名或密码错误'))
    }

    switch (status) {
      case 401:
        handleUnauthorized()
        return Promise.reject(new Error('登录状态已过期，请重新登录'))
      case 403:
        message.error('没有权限访问该资源')
        return Promise.reject(new Error('拒绝访问'))
      case 404:
        message.error('请求的资源不存在')
        return Promise.reject(new Error('资源不存在'))
      case 500:
        message.error(data?.message || '服务器错误')
        return Promise.reject(new Error(data?.message || '服务器错误'))
      default:
        message.error(data?.message || `请求错误 (${status})`)
        return Promise.reject(new Error(data?.message || `请求错误 (${status})`))
    }
  }

  // 处理网络错误
  message.error('网络连接错误，请检查网络设置')
  return Promise.reject(new Error('网络连接错误'))
}

// 处理 401 未授权错误
const handleUnauthorized = () => {
  // 清除本地存储的 token
  localStorage.removeItem('token')
  localStorage.removeItem('tokenType')
  // 如果不是登录页，跳转到登录页
  if (router.currentRoute.value.path !== '/login') {
    message.error('登录状态已过期，请重新登录')
    router.push(`/login?redirect=${router.currentRoute.value.path}`)
  }
}

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    // 添加 token 到请求头
    const token = localStorage.getItem('token')
    const tokenType = localStorage.getItem('tokenType') || 'Bearer'
    if (token) {
      config.headers['Authorization'] = `${tokenType} ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
request.interceptors.response.use(
  (response: AxiosResponse<ApiResponse<any>>) => {
    console.log('收到响应:', response.config.url, response.data)
    const { data } = response
    
    // 处理业务逻辑错误
    if (!data.success && data.code !== 200 && data.code !== 0) {
      // 登录接口的错误单独处理
      if (response.config.url?.includes('/auth/login')) {
        console.error('登录接口返回错误:', data.message)
        return Promise.reject(new Error(data.message || '用户名或密码错误'))
      }
      message.error(data.message || '请求失败')
      return Promise.reject(new Error(data.message || '请求失败'))
    }
    
    // 正常返回业务数据
    return data.data
  },
  (error: AxiosError) => {
    console.error('请求错误:', error.config?.url, error)
    return handleError(error, error.config?.url)
  }
)

// 封装请求方法
const http = {
  get<T = any>(url: string, params?: any, config?: any): Promise<T> {
    return request.get(url, { params, ...config })
  },
  post<T = any>(url: string, data?: any, config?: any): Promise<T> {
    return request.post(url, data, config)
  },
  put<T = any>(url: string, data?: any, config?: any): Promise<T> {
    return request.put(url, data, config)
  },
  delete<T = any>(url: string, config?: any): Promise<T> {
    return request.delete(url, config)
  },
  patch<T = any>(url: string, data?: any, config?: any): Promise<T> {
    return request.patch(url, data, config)
  }
}

export default http