<template>
  <div class="profile-page">
    <UserInfoCard
      :user-info="userInfo"
      @edit="showEditModal = true"
      @change-password="handleChangePassword"
      @update="getUserInfo"
    />
    
    <UserInfoEdit
      v-model:show="showEditModal"
      :user-info="userInfo"
      :is-password-mode="isPasswordMode"
      @success="handleEditSuccess"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, watch } from 'vue'
import { useMessage } from 'naive-ui'
import type { FormInst, FormRules } from 'naive-ui'
import { useUserStore } from '@/stores/user'
import { getUserDetail, updateUser, uploadAvatar } from '@/api/user'
import type { SysUser, UpdatePasswordRequest } from '@/types/auth'
import { 
  EditOutlined,
  LockOutlined
} from '@vicons/antd'
import UserInfoCard from '@/components/user/UserInfoCard.vue'
import UserInfoEdit from '@/components/user/UserInfoEdit.vue'

const userStore = useUserStore()
const message = useMessage()

// 用户信息
const userInfo = ref<SysUser>({} as SysUser)
const defaultAvatar = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgdmlld0JveD0iMCAwIDEyMCAxMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBmaWxsPSIjZTRlOWYyIiBkPSJNMCAwaDEyMHYxMjBIMHoiLz48cGF0aCBkPSJNNjAgNzhhMzQgMzQgMCAwMDM0LTM0QTM0IDM0IDAgMDA2MCAxMCAzNCAzNCAwIDAwMjYgNDRhMzQgMzQgMCAwMDM0IDM0eiIgZmlsbD0iI2JlYzNjYyIvPjxwYXRoIGQ9Ik05MCAxMTBhNDAgNDAgMCAwMC02MC0zNC42NDNBNDAgNDAgMCAwMDMwIDExMHoiIGZpbGw9IiNiZWMzY2MiLz48L2c+PC9zdmc+'

// 模态框显示状态
const showEditModal = ref(false)
const isPasswordMode = ref(false)

// 表单引用
const formRef = ref<FormInst | null>(null)
const passwordFormRef = ref<FormInst | null>(null)
const fileInputRef = ref<HTMLInputElement | null>(null)

// 提交状态
const submitting = ref(false)
const passwordSubmitting = ref(false)

// 编辑表单数据
const formData = reactive({
  username: '',
  realName: '',
  phone: '',
  email: '',
  gender: 0
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

// 密码表单数据
const passwordForm = reactive<UpdatePasswordRequest>({
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
})

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

// 获取用户信息
async function getUserInfo() {
  try {
    if (!userStore.userInfo?.id) {
      throw new Error('用户ID不存在')
    }
    
    userInfo.value = await getUserDetail(userStore.userInfo.id)
    
    // 更新表单数据
    formData.username = userInfo.value.username
    formData.realName = userInfo.value.realName || ''
    formData.phone = userInfo.value.phone || ''
    formData.email = userInfo.value.email || ''
    formData.gender = userInfo.value.gender || 0
  } catch (error) {
    console.error('获取用户信息失败：', error)
    message.error('获取用户信息失败')
  }
}

// 处理修改密码
function handleChangePassword() {
  isPasswordMode.value = true
  showEditModal.value = true
}

// 处理编辑成功
function handleEditSuccess() {
  getUserInfo()
}

// 监听模态框关闭
watch(() => showEditModal.value, (newValue) => {
  if (!newValue) {
    isPasswordMode.value = false
  }
})

// 处理提交编辑表单
async function handleSubmit() {
  if (!formRef.value) return
  
  try {
    await formRef.value.validate()
    
    submitting.value = true
    await updateUser(userInfo.value.id, {
      realName: formData.realName,
      phone: formData.phone,
      email: formData.email,
      gender: formData.gender
    })
    
    message.success('个人信息更新成功')
    showEditModal.value = false
    
    // 重新获取用户信息
    await getUserInfo()
    
    // 更新全局用户信息
    if (userStore.userInfo) {
      userStore.userInfo.realName = formData.realName
      userStore.userInfo.phone = formData.phone
      userStore.userInfo.email = formData.email
    }
  } catch (error) {
    console.error('更新用户信息失败：', error)
    message.error('更新用户信息失败')
  } finally {
    submitting.value = false
  }
}

// 处理密码提交
async function handlePasswordSubmit() {
  if (!passwordFormRef.value) return
  
  try {
    await passwordFormRef.value.validate()
    
    passwordSubmitting.value = true
    await userStore.changePassword(passwordForm)
    
    message.success('密码修改成功，请重新登录')
    showEditModal.value = false
    
    // 重置表单
    passwordForm.oldPassword = ''
    passwordForm.newPassword = ''
    passwordForm.confirmPassword = ''
  } catch (error: any) {
    console.error('修改密码失败：', error)
    message.error(error.message || '修改密码失败')
  } finally {
    passwordSubmitting.value = false
  }
}

// 点击上传头像按钮
function handleClickUpload() {
  fileInputRef.value?.click()
}

// 处理文件选择
async function handleFileChange(e: Event) {
  const target = e.target as HTMLInputElement
  const file = target.files?.[0]
  
  if (!file) return
  
  try {
    const avatarUrl = await uploadAvatar(file)
    
    // 更新本地用户信息和存储
    userInfo.value.avatar = avatarUrl
    if (userStore.userInfo) {
      userStore.userInfo.avatar = avatarUrl
    }
    
    message.success('头像上传成功')
  } catch (error) {
    console.error('上传头像失败：', error)
    message.error('上传头像失败')
  } finally {
    // 清空文件输入，以便可以再次选择同一文件
    if (fileInputRef.value) {
      fileInputRef.value.value = ''
    }
  }
}

// 页面加载时获取用户信息
onMounted(() => {
  getUserInfo()
})
</script>

<style scoped>
.profile-page {
  padding: 24px;
  min-height: calc(100vh - 64px);
  width: 100%;
  background-color: #f5f7f9;
}

.profile-card {
  max-width: 800px;
  margin: 0 auto;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

.profile-content {
  display: flex;
  gap: 40px;
  padding: 20px 0;
}

.avatar-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 20px;
}

.avatar-btn {
  margin-top: 16px;
  color: #2080f0;
}

.info-container {
  flex: 1;
}

.info-header {
  margin-bottom: 24px;
}

.username {
  font-size: 24px;
  margin: 0 0 8px 0;
  font-weight: 500;
}

.label {
  color: #8c8c8c;
  font-size: 14px;
}

.info-table {
  display: flex;
  flex-direction: column;
}

.info-row {
  display: flex;
  padding: 12px 0;
  border-bottom: 1px solid #f0f0f0;
}

.info-row:last-child {
  border-bottom: none;
}

.info-label {
  width: 100px;
  color: #8c8c8c;
}

.info-value {
  flex: 1;
}

@media (max-width: 768px) {
  .profile-content {
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }
  
  .info-header {
    text-align: center;
  }
  
  .info-row {
    flex-direction: column;
    gap: 4px;
  }
  
  .info-label {
    width: 100%;
  }
}
</style>