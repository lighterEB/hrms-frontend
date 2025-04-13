<template>
  <n-modal
    :show="show"
    @update:show="emit('update:show', $event)"
    preset="card"
    :title="isPasswordMode ? '修改密码' : '编辑个人信息'"
    style="width: 500px"
    :mask-closable="false"
  >
    <!-- 编辑个人信息表单 -->
    <n-form
      v-if="!isPasswordMode"
      ref="formRef"
      :model="formData"
      :rules="rules"
      label-placement="left"
      label-width="80"
    >
      <n-form-item label="用户名" path="username">
        <n-input v-model:value="formData.username" disabled />
      </n-form-item>
      <n-form-item label="真实姓名" path="realName">
        <n-input v-model:value="formData.realName" />
      </n-form-item>
      <n-form-item label="手机号" path="phone">
        <n-input v-model:value="formData.phone" />
      </n-form-item>
      <n-form-item label="邮箱" path="email">
        <n-input v-model:value="formData.email" />
      </n-form-item>
      <n-form-item label="性别" path="gender">
        <n-radio-group v-model:value="formData.gender">
          <n-space>
            <n-radio :value="1">男</n-radio>
            <n-radio :value="2">女</n-radio>
            <n-radio :value="0">保密</n-radio>
          </n-space>
        </n-radio-group>
      </n-form-item>
    </n-form>

    <!-- 修改密码表单 -->
    <n-form
      v-else
      ref="passwordFormRef"
      :model="passwordForm"
      :rules="passwordRules"
      label-placement="left"
      label-width="80"
    >
      <n-form-item label="原密码" path="oldPassword">
        <n-input
          v-model:value="passwordForm.oldPassword"
          type="password"
          show-password-on="click"
        />
      </n-form-item>
      <n-form-item label="新密码" path="newPassword">
        <n-input
          v-model:value="passwordForm.newPassword"
          type="password"
          show-password-on="click"
        />
      </n-form-item>
      <n-form-item label="确认密码" path="confirmPassword">
        <n-input
          v-model:value="passwordForm.confirmPassword"
          type="password"
          show-password-on="click"
        />
      </n-form-item>
    </n-form>

    <template #footer>
      <n-space justify="end">
        <n-button @click="handleCancel">取消</n-button>
        <n-button
          type="primary"
          :loading="submitting"
          @click="handleSubmit"
        >
          保存
        </n-button>
      </n-space>
    </template>
  </n-modal>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import type { FormInst, FormRules } from 'naive-ui'
import { useUserStore } from '@/stores/user'
import { updateUser } from '@/api/user'
import type { SysUser, UpdatePasswordRequest } from '@/types/auth'
import message from '@/utils/message'

const props = defineProps<{
  show: boolean
  userInfo: SysUser
  isPasswordMode: boolean
}>()

const emit = defineEmits<{
  (e: 'update:show', value: boolean): void
  (e: 'success'): void
}>()

const userStore = useUserStore()
const formRef = ref<FormInst | null>(null)
const passwordFormRef = ref<FormInst | null>(null)
const submitting = ref(false)

// 编辑表单数据
const formData = reactive({
  username: '',
  realName: '',
  phone: '',
  email: '',
  gender: 0
})

// 密码表单数据
const passwordForm = reactive<UpdatePasswordRequest>({
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
})

// 表单校验规则
const rules: FormRules = {
  realName: [
    { required: true, message: '请输入真实姓名', trigger: 'blur' }
  ],
  phone: [
    { pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确', trigger: 'blur' }
  ],
  email: [
    { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
  ]
}

// 密码表单校验规则
const passwordRules: FormRules = {
  oldPassword: [
    { required: true, message: '请输入原密码', trigger: 'blur' }
  ],
  newPassword: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    { 
      pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,20}$/,
      message: '密码必须包含大小写字母和数字，长度6-20位',
      trigger: 'blur'
    }
  ],
  confirmPassword: [
    { required: true, message: '请再次输入新密码', trigger: 'blur' },
    {
      validator: (rule, value) => {
        return value === passwordForm.newPassword || new Error('两次输入的密码不一致')
      },
      trigger: ['blur', 'input']
    }
  ]
}

// 监听用户信息变化，更新表单数据
watch(() => props.userInfo, (newValue) => {
  formData.username = newValue.username
  formData.realName = newValue.realName || ''
  formData.phone = newValue.phone || ''
  formData.email = newValue.email || ''
  formData.gender = newValue.gender || 0
}, { immediate: true })

// 处理取消
function handleCancel() {
  emit('update:show', false)
  
  // 重置表单
  if (props.isPasswordMode) {
    passwordForm.oldPassword = ''
    passwordForm.newPassword = ''
    passwordForm.confirmPassword = ''
  }
}

// 处理提交
async function handleSubmit() {
  if (props.isPasswordMode) {
    if (!passwordFormRef.value) return
    try {
      await passwordFormRef.value.validate()
      submitting.value = true
      message.loading('提交中...')
      await userStore.changePassword(passwordForm)
      message.success('密码修改成功，请重新登录')
      emit('update:show', false)
      
      // 重置表单
      passwordForm.oldPassword = ''
      passwordForm.newPassword = ''
      passwordForm.confirmPassword = ''
    } catch (error: any) {
      console.error('修改密码失败：', error)
      message.error(error.message || '修改密码失败，请稍后重试')
    } finally {
      submitting.value = false
    }
  } else {
    if (!formRef.value) return
    try {
      await formRef.value.validate()
      submitting.value = true
      message.loading('保存中...')
      await updateUser(props.userInfo.id, {
        realName: formData.realName,
        phone: formData.phone,
        email: formData.email,
        gender: formData.gender
      })
      
      message.success('个人信息更新成功')
      emit('update:show', false)
      emit('success')
      
      // 更新全局用户信息
      if (userStore.userInfo) {
        userStore.userInfo.realName = formData.realName
        userStore.userInfo.phone = formData.phone
        userStore.userInfo.email = formData.email
        userStore.userInfo.gender = formData.gender
      }
    } catch (error) {
      console.error('更新用户信息失败：', error)
      message.error('更新用户信息失败，请检查网络连接')
    } finally {
      submitting.value = false
    }
  }
}
</script> 