import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { UserInfoResponse, RegisterRequest } from '@/types/auth'
import { login, getUserInfo, logout as logoutApi, register } from '@/api/auth'
import message from '@/utils/message'

export const useUserStore = defineStore('user', () => {
  // 状态
  const token = ref(localStorage.getItem('token') || '')
  const tokenType = ref(localStorage.getItem('tokenType') || 'Bearer')
  const userInfo = ref<UserInfoResponse | null>(null)
  const isRegistering = ref(false)

  // 登录
  async function loginAction(username: string, password: string) {
    try {
      const result = await login({ username, password })
      // 保存 token 信息
      token.value = result.token
      tokenType.value = result.tokenType
      localStorage.setItem('token', result.token)
      localStorage.setItem('tokenType', result.tokenType)
      // 保存用户信息
      userInfo.value = result.userInfo
      return result
    } catch (error) {
      // 清空状态
      resetState()
      return Promise.reject(error)
    }
  }

    // 注册
    async function registerAction(registerData: RegisterRequest) {
        try {
          isRegistering.value = true
          await register(registerData)
          message.success('注册成功')
          return true
        } catch (error) {
          message.error('注册失败')
          return Promise.reject(error)
        } finally {
          isRegistering.value = false
        }
      }

  // 登出
  async function logout() {
    try {
      await logoutApi()
      resetState()
    } catch (error) {
      console.error('登出失败:', error)
    }
  }

  // 获取用户信息
  async function getInfo() {
    try {
      const result = await getUserInfo()
      userInfo.value = result
      return result
    } catch (error) {
      return Promise.reject(error)
    }
  }

  // 重置状态
  function resetState() {
    token.value = ''
    tokenType.value = 'Bearer'
    userInfo.value = null
    localStorage.removeItem('token')
    localStorage.removeItem('tokenType')
  }

  return {
    token,
    tokenType,
    userInfo,
    loginAction,
    isRegistering,
    registerAction,
    logout,
    getInfo,
    resetState
  }
})