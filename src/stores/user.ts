import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { UserInfoResponse, RegisterRequest, LoginRequest, SysUser, UpdatePasswordRequest } from '@/types/auth'
import { login, getUserInfo, logout as logoutApi, register, updatePassword } from '@/api/auth'
import message from '@/utils/message'
import router from '@/router'

// Token 存储的键名
const TOKEN_KEY = 'token'
const TOKEN_TYPE_KEY = 'tokenType'
const REMEMBER_KEY = 'remember'
const USERNAME_KEY = 'username'
const PASSWORD_KEY = 'password'

export const useUserStore = defineStore('user', () => {
  // 状态
  const token = ref(localStorage.getItem(TOKEN_KEY) || '')
  const tokenType = ref(localStorage.getItem(TOKEN_TYPE_KEY) || 'Bearer')
  const userInfo = ref<SysUser | null>(null)
  const roles = ref<string[]>([])
  const permissions = ref<string[]>([])
  const isRegistering = ref(false)
  const loading = ref(false)
  const rememberMe = ref(localStorage.getItem(REMEMBER_KEY) === 'true')

  // 计算属性
  const isLoggedIn = computed(() => Boolean(token.value))
  const savedUsername = computed(() => rememberMe.value ? localStorage.getItem(USERNAME_KEY) || '' : '')
  const savedPassword = computed(() => {
    if (!rememberMe.value) return ''
    const pwd = localStorage.getItem(PASSWORD_KEY)
    return pwd ? atob(pwd) : '' // 简单的 base64 解码
  })

  // 保存记住的用户信息
  function saveRemembered(username: string, password: string) {
    if (rememberMe.value) {
      localStorage.setItem(USERNAME_KEY, username)
      localStorage.setItem(PASSWORD_KEY, btoa(password)) // 简单的 base64 编码
      localStorage.setItem(REMEMBER_KEY, 'true')
    } else {
      clearRemembered()
    }
  }

  // 清除记住的用户信息
  function clearRemembered() {
    localStorage.removeItem(USERNAME_KEY)
    localStorage.removeItem(PASSWORD_KEY)
    localStorage.removeItem(REMEMBER_KEY)
  }

  // 设置记住我状态
  function setRememberMe(value: boolean) {
    rememberMe.value = value
    localStorage.setItem(REMEMBER_KEY, value ? 'true' : 'false')
  }

  // 登录
  async function loginAction(loginData: LoginRequest) {
    try {
      loading.value = true
      console.log('调用登录API...')
      const result = await login(loginData)
      console.log('登录API返回结果:', result)
      
      // 保存 token 信息
      token.value = result.token
      tokenType.value = result.tokenType || 'Bearer'
      localStorage.setItem(TOKEN_KEY, result.token)
      localStorage.setItem(TOKEN_TYPE_KEY, result.tokenType || 'Bearer')
      
      // 直接使用返回的用户信息
      if (result.userInfo) {
        console.log('获取到用户信息:', result.userInfo)
        userInfo.value = {
          id: result.userInfo.id,
          username: result.userInfo.username,
          realName: result.userInfo.realName || '',
          phone: result.userInfo.phone || '',
          email: result.userInfo.email || '',
          avatar: result.userInfo.avatar || '',
          // 填充必要的字段，避免类型错误
          createTime: '',
          createUser: '',
          updateTime: '',
          updateUser: '',
          isDeleted: 0,
          password: '',
          gender: 0,
          status: 1,
          lastLoginTime: new Date().toISOString()
        }
        
        // 保存角色和权限
        roles.value = result.userInfo.roles || []
        permissions.value = result.userInfo.permissions || []
        console.log('保存的角色:', roles.value)
        console.log('保存的权限:', permissions.value)
      } else {
        console.log('未获取到用户信息，尝试从API获取完整信息')
        // 如果没有用户信息，获取完整的用户信息
        await getInfo()
      }
      
      // 处理记住我
      if (rememberMe.value) {
        saveRemembered(loginData.username, loginData.password)
      } else {
        clearRemembered()
      }
      
      console.log('登录处理完成，返回结果')
      return result
    } catch (error: any) {
      console.error('登录过程发生错误:', error)
      return Promise.reject(error)
    } finally {
      loading.value = false
    }
  }

  // 使用存储的凭据自动登录
  async function autoLogin() {
    if (rememberMe.value && savedUsername.value && savedPassword.value) {
      try {
        return await loginAction({
          username: savedUsername.value,
          password: savedPassword.value
        })
      } catch (error) {
        // 自动登录失败，清除存储的凭据
        clearRemembered()
        return null
      }
    }
    return null
  }

  // 注册
  async function registerAction(registerData: RegisterRequest) {
    try {
      isRegistering.value = true
      await register(registerData)
      message.success('注册成功')
      return true
    } catch (error: any) {
      return Promise.reject(error)
    } finally {
      isRegistering.value = false
    }
  }

  // 修改密码
  async function changePassword(passwordData: UpdatePasswordRequest) {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      message.error('两次输入的密码不一致')
      return Promise.reject(new Error('两次输入的密码不一致'))
    }
    try {
      await updatePassword(passwordData)
      message.success('密码修改成功，请重新登录')
      // 修改密码成功后退出登录
      await logout()
      return true
    } catch (error) {
      return Promise.reject(error)
    }
  }

  // 登出
  async function logout(silent = false) {
    try {
      // 只有在有 token 的情况下才调用登出接口
      if (token.value) {
        await logoutApi()
      }
    } catch (error) {
      console.error('登出失败:', error)
    } finally {
      // 无论如何都清除状态
      resetState()
      if (!silent) {
        message.success('已退出登录')
      }
      // 跳转到登录页
      if (router.currentRoute.value.path !== '/login') {
        router.push('/login')
      }
    }
  }

  // 获取用户信息
  async function getInfo() {
    try {
      const result = await getUserInfo()
      userInfo.value = result
      return result
    } catch (error) {
      // 获取用户信息失败时，清除本地状态并重定向到登录页
      await logout(true) // 静默登出
      return Promise.reject(error)
    }
  }

  // 判断是否有角色
  function hasRole(role: string): boolean {
    return roles.value.includes(role)
  }

  // 判断是否有权限
  function hasPermission(permission: string): boolean {
    return permissions.value.includes(permission)
  }

  // 重置状态
  function resetState() {
    token.value = ''
    tokenType.value = 'Bearer'
    userInfo.value = null
    roles.value = []
    permissions.value = []
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(TOKEN_TYPE_KEY)
    // 保留记住我的设置
  }

  return {
    token,
    tokenType,
    userInfo,
    roles,
    permissions,
    isRegistering,
    loading,
    rememberMe,
    isLoggedIn,
    savedUsername,
    savedPassword,
    loginAction,
    autoLogin,
    registerAction,
    changePassword,
    logout,
    getInfo,
    resetState,
    setRememberMe,
    hasRole,
    hasPermission
  }
})