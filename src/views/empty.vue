<template>
  <div class="empty-container">
    <n-card>
      <n-empty description="正在开发中，敬请期待...">
        <template #icon>
          <n-icon size="100">
            <tool-outlined />
          </n-icon>
        </template>
        <template #extra>
          <n-button type="primary" @click="goBack">返回</n-button>
        </template>
      </n-empty>
    </n-card>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ToolOutlined } from '@vicons/antd'

const router = useRouter()

const goBack = () => {
  router.go(-1)
}
</script>

<style scoped>
.empty-container {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style> 