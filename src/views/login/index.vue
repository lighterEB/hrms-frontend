<template>
  <div class="login-container">
    <n-card title="企业人事管理系统登录" class="login-card">
      <n-form
        ref="formRef"
        :model="formData"
        :rules="rules"
      >
        <n-form-item path="username" label="用户名">
          <n-input v-model:value="formData.username" placeholder="请输入用户名" />
        </n-form-item>
        <n-form-item path="password" label="密码">
          <n-input
            v-model:value="formData.password"
            type="password"
            placeholder="请输入密码"
            @keyup.enter="handleLogin"
          />
        </n-form-item>
        <n-space justify="center">
          <n-button type="primary" @click="handleLogin">登录</n-button>
        </n-space>
      </n-form>
    </n-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { FormInst, FormRules } from 'naive-ui'

const formRef = ref<FormInst | null>(null)
const formData = ref({
  username: '',
  password: ''
})

const rules: FormRules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' }
  ]
}

const handleLogin = () => {
  formRef.value?.validate((errors) => {
    if (!errors) {
      console.log('登录信息：', formData.value)
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