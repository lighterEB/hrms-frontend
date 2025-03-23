<template>
  <div class="login-container">
    <n-card :title="isLogin ? '企业人事管理系统登录' : '账号注册'" class="login-card">
      <!-- 登录表单 -->
      <n-form v-if="isLogin" ref="loginFormRef" :model="loginForm" :rules="loginRules">
        <n-form-item path="username" label="用户名">
          <n-input v-model:value="loginForm.username" placeholder="请输入用户名" />
        </n-form-item>
        <n-form-item path="password" label="密码">
          <n-input v-model:value="loginForm.password" type="password" placeholder="请输入密码" @keyup.enter="handleLogin" />
        </n-form-item>
        <n-space justify="center" :wrap="true">
          <n-button type="primary" :loading="loading" @click="handleLogin">
            {{ loading ? '登录中...' : '登录' }}
          </n-button>
          <n-button @click="switchForm(false)">
            注册账号
          </n-button>
        </n-space>
      </n-form>

      <!-- 注册表单 -->
      <n-form v-else ref="registerFormRef" :model="registerForm" :rules="registerRules">
        <n-form-item path="username" label="用户名">
          <n-input v-model:value="registerForm.username" placeholder="请输入用户名" />
        </n-form-item>
        <n-form-item path="password" label="密码">
          <n-input v-model:value="registerForm.password" type="password" placeholder="密码必须包含大小写字母和数字，长度6-20位" />
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
        <n-space justify="center" :wrap="true">
          <n-button type="primary" :loading="userStore.isRegistering" @click="handleRegister">
            {{ userStore.isRegistering ? '注册中...' : '注册' }}
          </n-button>
          <n-button @click="switchForm(true)">
            返回登录
          </n-button>
        </n-space>
      </n-form>
    </n-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useMessage } from 'naive-ui'
import type { FormInst, FormRules } from 'naive-ui'
import { useUserStore } from '@/stores/user'
import type { RegisterRequest } from '@/types/auth'

const router = useRouter()
const message = useMessage()
const userStore = useUserStore()

const isLogin = ref(true)
const loading = ref(false)
const loginFormRef = ref<FormInst | null>(null)
const registerFormRef = ref<FormInst | null>(null)

// 登录表单数据
const loginForm = ref({
  username: '',
  password: ''
})

// 注册表单数据
const registerForm = ref<RegisterRequest>({
  username: '',
  password: '',
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
      loading.value = true
      await userStore.loginAction(loginForm.value.username, loginForm.value.password)
      message.success('登录成功')
      router.push('/')
    } catch (error) {
      console.error('登录失败:', error)
    } finally {
      loading.value = false
    }
  })
}

// 注册处理
const handleRegister = () => {
  registerFormRef.value?.validate(async (errors) => {
    if (errors) return

    try {
      await userStore.registerAction(registerForm.value)
      // 重置表单
      registerForm.value = {
        username: '',
        password: '',
        realName: '',
        phone: '',
        email: ''
      }
      // 切换到登录表单
      switchForm(true)
    } catch (error) {
      console.error('注册失败:', error)
    }
  })
}
</script>

<style scoped>
.login-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f7f9;
}

.login-card {
  width: 360px;
}

.login-card :deep(.n-card-header) {
  text-align: center;
}
</style>