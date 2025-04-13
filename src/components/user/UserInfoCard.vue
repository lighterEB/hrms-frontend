<template>
  <n-card title="个人信息" class="profile-card">
    <template #header-extra>
      <n-space>
        <n-button size="small" type="primary" @click="emit('edit')">
          <template #icon>
            <n-icon><EditOutlined /></n-icon>
          </template>
          编辑信息
        </n-button>
        <n-button size="small" @click="emit('changePassword')">
          <template #icon>
            <n-icon><LockOutlined /></n-icon>
          </template>
          修改密码
        </n-button>
      </n-space>
    </template>
    
    <div class="profile-content">
      <div class="avatar-container">
        <n-avatar 
          round 
          :size="120" 
          :src="userInfo.avatar || defaultAvatar"
        />
        <n-button text class="avatar-btn" @click="handleClickUpload">更换头像</n-button>
        <input
          ref="fileInputRef"
          type="file"
          accept="image/*"
          style="display: none"
          @change="handleFileChange"
        />
      </div>
      
      <div class="info-container">
        <div class="info-header">
          <h2 class="username">{{ userInfo.username }}</h2>
          <div class="label">系统用户</div>
        </div>
        
        <div class="info-table">
          <div class="info-row">
            <div class="info-label">真实姓名</div>
            <div class="info-value">{{ userInfo.realName || '-' }}</div>
          </div>
          <div class="info-row">
            <div class="info-label">性别</div>
            <div class="info-value">
              <template v-if="userInfo.gender === 1">男</template>
              <template v-else-if="userInfo.gender === 2">女</template>
              <template v-else>保密</template>
            </div>
          </div>
          <div class="info-row">
            <div class="info-label">手机号</div>
            <div class="info-value">{{ userInfo.phone || '-' }}</div>
          </div>
          <div class="info-row">
            <div class="info-label">邮箱</div>
            <div class="info-value">{{ userInfo.email || '-' }}</div>
          </div>
          <div class="info-row">
            <div class="info-label">最后登录</div>
            <div class="info-value">{{ formatDate(userInfo.lastLoginTime) }}</div>
          </div>
        </div>
      </div>
    </div>
  </n-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '@/stores/user'
import { uploadAvatar } from '@/api/user'
import type { SysUser } from '@/types/auth'
import { EditOutlined, LockOutlined } from '@vicons/antd'
import message from '@/utils/message'

const props = defineProps<{
  userInfo: SysUser
}>()

const emit = defineEmits<{
  (e: 'edit'): void
  (e: 'changePassword'): void
  (e: 'update'): void
}>()

const userStore = useUserStore()
const fileInputRef = ref<HTMLInputElement | null>(null)

const defaultAvatar = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgdmlld0JveD0iMCAwIDEyMCAxMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBmaWxsPSIjZTRlOWYyIiBkPSJNMCAwaDEyMHYxMjBIMHoiLz48cGF0aCBkPSJNNjAgNzhhMzQgMzQgMCAwMDM0LTM0QTM0IDM0IDAgMDA2MCAxMCAzNCAzNCAwIDAwMjYgNDRhMzQgMzQgMCAwMDM0IDM0eiIgZmlsbD0iI2JlYzNjYyIvPjxwYXRoIGQ9Ik05MCAxMTBhNDAgNDAgMCAwMC02MC0zNC42NDNBNDAgNDAgMCAwMDMwIDExMHoiIGZpbGw9IiNiZWMzY2MiLz48L2c+PC9zdmc+'

function formatDate(dateStr?: string): string {
  if (!dateStr) return '-'
  
  try {
    const date = new Date(dateStr)
    return date.toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    })
  } catch (e) {
    return '-'
  }
}

function handleClickUpload() {
  fileInputRef.value?.click()
}

async function handleFileChange(e: Event) {
  const target = e.target as HTMLInputElement
  const file = target.files?.[0]
  
  if (!file) return
  
  const isImageFile = file.type.startsWith('image/')
  if (!isImageFile) {
    message.error('请上传图片文件')
    return
  }
  
  // 文件大小限制（2MB）
  const maxSize = 2 * 1024 * 1024
  if (file.size > maxSize) {
    message.error('图片大小不能超过2MB')
    return
  }
  
  try {
    message.loading('上传中...')
    const avatarUrl = await uploadAvatar(file)
    
    if (userStore.userInfo) {
      userStore.userInfo.avatar = avatarUrl
    }
    
    message.success('头像上传成功')
    emit('update')
  } catch (error) {
    console.error('上传头像失败：', error)
    message.error('上传头像失败，请稍后重试')
  } finally {
    if (fileInputRef.value) {
      fileInputRef.value.value = ''
    }
  }
}
</script>

<style scoped>
.profile-card {
  width: 100%;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

.profile-content {
  display: flex;
  gap: 40px;
  padding: 20px;
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
    padding: 16px 10px;
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

@media (max-width: 480px) {
  .profile-content {
    padding: 10px 5px;
  }
  
  .username {
    font-size: 20px;
  }
}
</style> 