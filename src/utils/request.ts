import axios from 'axios'
import type { AxiosInstance, AxiosResponse } from 'axios'
import type { ApiResponse } from '@/types/auth'
import message from './message'

const request: AxiosInstance = axios.create({
  baseURL: '/api',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
})

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
request.interceptors.response.use(
    (response: AxiosResponse) => {
      const { data } = response
      // 处理后端返回的数据结构
      if (data.code === 0 || response.status === 200) {  // 添加状态码判断
        return data.data || data
      }
      message.error(data.msg || '请求失败')
      return Promise.reject(new Error(data.msg || '请求失败'))
    },
    (error) => {
      if (error.code === 'ECONNABORTED' && error.message.includes('timeout')) {
        message.error('请求超时，请重试')
        return Promise.reject(new Error('请求超时'))
      }
  
      let msg = '请求失败'
      if (error.response) {
        switch (error.response.status) {
          case 401:
            msg = '未授权，请重新登录'
            break
          case 403:
            msg = '拒绝访问'
            break
          case 404:
            msg = '请求错误，未找到该资源'
            break
          case 500:
            msg = '服务器错误'
            break
          default:
            msg = `连接错误${error.response.status}`
        }
      }
      message.error(msg)
      return Promise.reject(error)
    }
  )

// 封装请求方法
const http = {
  get<T = any>(url: string, config?: any): Promise<T> {
    return request.get(url, config)
  },
  post<T = any>(url: string, data?: any, config?: any): Promise<T> {
    return request.post(url, data, config)
  },
  put<T = any>(url: string, data?: any, config?: any): Promise<T> {
    return request.put(url, data, config)
  },
  delete<T = any>(url: string, config?: any): Promise<T> {
    return request.delete(url, config)
  }
}

export default http