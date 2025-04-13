<template>
  <div class="login-container">
    <n-card class="login-card">
      <template #header>
        <div class="card-title">人力资源管理系统</div>
      </template>
      <!-- 登录表单 -->
      <n-form v-if="isLogin" ref="loginFormRef" :model="loginForm" :rules="loginRules" label-placement="left" label-width="auto" require-mark-placement="right-hanging" size="large">
        <n-form-item path="username" label="用户名" first>
          <n-input v-model:value="loginForm.username" placeholder="请输入用户名" />
        </n-form-item>
        <n-form-item path="password" label="密码">
          <n-input v-model:value="loginForm.password" type="password" placeholder="请输入密码" @keyup.enter="handleLogin" />
        </n-form-item>
        <div class="login-options">
          <n-checkbox v-model:checked="rememberMe">记住我</n-checkbox>
          <n-button text type="primary">忘记密码？</n-button>
        </div>
        <div class="form-actions">
          <n-button type="primary" size="large" :loading="userStore.loading" @click="handleLogin">
            登录
          </n-button>
          <n-button size="large" @click="switchForm(false)">
            注册账号
          </n-button>
        </div>
      </n-form>

      <!-- 注册表单 -->
      <n-form v-else ref="registerFormRef" :model="registerForm" :rules="registerRules" label-placement="left" label-width="auto" require-mark-placement="right-hanging" size="large">
        <n-form-item path="username" label="用户名" first>
          <n-input v-model:value="registerForm.username" placeholder="请输入用户名" />
        </n-form-item>
        <n-form-item path="password" label="密码">
          <n-input v-model:value="registerForm.password" type="password" placeholder="密码必须包含大小写字母和数字，长度6-20位" />
        </n-form-item>
        <n-form-item path="confirmPassword" label="确认密码">
          <n-input
            v-model:value="registerForm.confirmPassword"
            type="password"
            placeholder="请再次输入密码"
          />
        </n-form-item>
        <n-form-item path="realName" label="真实姓名">
          <n-input v-model:value="registerForm.realName" placeholder="请输入真实姓名" />
        </n-form-item>
        <n-form-item path="phone" label="手机号">
          <n-input v-model:value="registerForm.phone" placeholder="请输入手机号" />
        </n-form-item>
        <n-form-item path="email" label="邮箱">
          <n-input v-model:value="registerForm.email" placeholder="请输入邮箱（选填）" />
        </n-form-item>
        <div class="form-actions">
          <n-button type="primary" size="large" :loading="userStore.isRegistering" @click="handleRegister">
            注册
          </n-button>
          <n-button size="large" @click="switchForm(true)">
            返回登录
          </n-button>
        </div>
      </n-form>
    </n-card>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useMessage } from 'naive-ui'
import type { FormInst, FormRules } from 'naive-ui'
import { useUserStore } from '@/stores/user'
import type { RegisterRequest } from '@/types/auth'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const message = useMessage()
const userStore = useUserStore()

const isLogin = ref(true)
const loginFormRef = ref<FormInst | null>(null)
const registerFormRef = ref<FormInst | null>(null)

// 登录表单数据
const loginForm = ref({
  username: userStore.savedUsername,
  password: userStore.savedPassword
})

// 记住我
const rememberMe = ref(userStore.rememberMe)

// 监听记住我状态变化
watch(rememberMe, (value) => {
  userStore.setRememberMe(value)
})

interface RegisterFormData extends RegisterRequest {
  confirmPassword: string
}

// 注册表单数据
const registerForm = ref<RegisterFormData>({
  username: '',
  password: '',
  confirmPassword: '',
  realName: '',
  phone: '',
  email: ''
})

// 登录表单校验规则
const loginRules: FormRules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' }
  ]
}

// 注册表单校验规则
const registerRules: FormRules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    {
      pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,20}$/,
      message: '密码必须包含大小写字母和数字，长度6-20位',
      trigger: 'blur'
    }
  ],
  confirmPassword: [
    { required: true, message: '请再次输入密码', trigger: 'blur' },
    {
      validator: (_rule, value) => {
        return value === registerForm.value.password || new Error('两次输入的密码不一致')
      },
      trigger: ['blur', 'input']
    }
  ],
  realName: [
    { required: true, message: '请输入真实姓名', trigger: 'blur' }
  ],
  phone: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    {
      pattern: /^1[3-9]\d{9}$/,
      message: '手机号格式不正确',
      trigger: 'blur'
    }
  ],
  email: [
    {
      type: 'email',
      message: '邮箱格式不正确',
      trigger: 'blur'
    }
  ]
}

// 切换登录/注册表单
const switchForm = (login: boolean) => {
  isLogin.value = login
}

// 登录处理
const handleLogin = () => {
  loginFormRef.value?.validate(async (errors) => {
    if (errors) return

    try {
      console.log('开始登录...')
      const result = await userStore.loginAction({
        username: loginForm.value.username,
        password: loginForm.value.password
      })
      
      console.log('登录成功, 返回结果:', result)
      message.success('登录成功')
      
      // 获取重定向地址
      const redirect = route.query.redirect as string
      console.log('即将跳转到:', redirect || '/')
      
      // 确保异步操作完成后再跳转
      setTimeout(() => {
        router.push(redirect || '/')
      }, 100)
    } catch (error: any) {
      // 显示具体的错误信息
      console.error('登录失败:', error)
      message.error(error.message || '登录失败，请检查用户名和密码')
    }
  })
}

// 注册处理
const handleRegister = () => {
  registerFormRef.value?.validate(async (errors) => {
    if (errors) return

    try {
      const { confirmPassword, ...registerData } = registerForm.value
      await userStore.registerAction(registerData)
      message.success('注册成功，请登录')
      // 重置表单
      registerForm.value = {
        username: '',
        password: '',
        confirmPassword: '',
        realName: '',
        phone: '',
        email: ''
      }
      // 切换到登录表单
      switchForm(true)
    } catch (error: any) {
      message.error(error.message || '注册失败，请稍后重试')
    }
  })
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100%;
  background-color: #f5f7fa;
  padding: 20px;
  box-sizing: border-box;
}

.login-card {
  width: 100%;
  max-width: 500px;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: visible;
}

.card-title {
  font-size: 24px;
  text-align: center;
  font-weight: 500;
  color: #333;
}

:deep(.n-form) {
  margin-top: 20px;
  position: relative;
}

:deep(.n-form-item) {
  display: flex;
  margin-bottom: 24px;
  position: relative;
}

:deep(.n-form-item-label) {
  font-size: 14px;
  color: #333;
  padding-right: 12px;
  width: 70px;
  flex-shrink: 0;
}

:deep(.n-input) {
  width: 280px;
}

:deep(.n-form-item-feedback-wrapper) {
  position: absolute;
  left: calc(80%);
  top: 50%;
  transform: translateY(-50%);
  white-space: nowrap;
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
}

:deep(.n-form-item-feedback--error) {
  color: #f56c6c;
  font-size: 12px;
}

.login-options {
  display: flex;
  justify-content: space-evenly;
  align-items: stretch;
  margin: 0 0 24px 0;
}

.form-actions {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 24px;
}

:deep(.n-button) {
  min-width: 100px;
}

@media (max-width: 768px) {
  .login-card {
    max-width: 100%;
  }

  :deep(.n-input) {
    width: 100%;
  }

  :deep(.n-form-item-feedback-wrapper) {
    position: static;
    margin-left: 0;
    transform: none;
    max-width: none;
  }

  .login-options {
    margin-left: 0;
  }
}
</style>