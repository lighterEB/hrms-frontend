<template>
    <n-card title="欢迎使用 人力资源管理系统">
      <n-space vertical>
        <n-statistic label="在职员工">
          <n-number-animation
            ref="numberAnimationInstRef"
            :from="0"
            :to="123"
          />
        </n-statistic>
      </n-space>
    </n-card>
  </template>
  
  <script setup lang="ts">
  // 这里可以添加首页的业务逻辑
  </script>