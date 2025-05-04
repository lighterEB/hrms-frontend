/**
 * 分页查询参数
 */
export interface PageQuery {
  pageNum: number
  pageSize: number
}

/**
 * 分页结果
 */
export interface PageResult<T> {
  list: T[]
  total: number
  pageNum: number
  pageSize: number
}

/**
 * API通用响应结构
 */
export interface ApiResponse<T> {
  code: number
  message: string
  data: T
  success: boolean
  timestamp: number
  extra?: Record<string, any>
} 