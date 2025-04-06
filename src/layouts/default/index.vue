<template>
    <n-layout class="layout" has-sider>
      <!-- 侧边栏 -->
      <n-layout-sider
        bordered
        collapse-mode="width"
        :collapsed-width="64"
        :width="240"
        :collapsed="collapsed"
        show-trigger
        @collapse="collapsed = true"
        @expand="collapsed = false"
        class="layout-sider"
      >
        <!-- Logo -->
        <div class="logo">
          <h1>HRMS</h1>
        </div>
        
        <!-- 菜单 -->
        <side-menu :collapsed="collapsed" />
      </n-layout-sider>
  
      <!-- 主体区域 -->
      <n-layout>
        <!-- 头部 -->
        <n-layout-header bordered class="layout-header">
          <div class="header-left">
            <n-button quaternary circle @click="collapsed = !collapsed">
              <template #icon>
                <n-icon size="18">
                  <MenuFoldOutlined v-if="collapsed" />
                  <MenuUnfoldOutlined v-else />
                </n-icon>
              </template>
            </n-button>
          </div>
          <div class="header-right">
            <n-space align="center">
              <n-text>{{ userStore.userInfo?.realName || userStore.userInfo?.username }}</n-text>
              <n-dropdown :options="userOptions" @select="handleUserSelect">
                <n-avatar
                  round
                  size="small"
                  :src="userStore.userInfo?.avatar || ''"
                />
              </n-dropdown>
            </n-space>
          </div>
        </n-layout-header>
  
        <!-- 内容区域 -->
        <n-layout-content class="layout-content">
          <router-view></router-view>
        </n-layout-content>
      </n-layout>
    </n-layout>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { MenuFoldOutlined, MenuUnfoldOutlined } from '@vicons/antd'
  import { useUserStore } from '@/stores/user'
  import SideMenu from '@/components/SideMenu.vue'
  import type { DropdownOption } from 'naive-ui'
  
  const router = useRouter()
  const userStore = useUserStore()
  const collapsed = ref(false)
  
  // 用户下拉菜单选项
  const userOptions: DropdownOption[] = [
    {
      label: '个人信息',
      key: 'profile'
    },
    {
      label: '修改密码',
      key: 'password'
    },
    {
      label: '退出登录',
      key: 'logout'
    }
  ]
  
  // 处理用户菜单选择
  const handleUserSelect = async (key: string) => {
    switch (key) {
      case 'logout':
        await userStore.logout()
        break
      case 'password':
        router.push('/password')
        break
      case 'profile':
        router.push('/profile')
        break
    }
  }
  </script>
  
  <style scoped>
  .layout {
    height: 100vh;
  }
  
  .layout-sider {
    background: #fff;
  }
  
  .logo {
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid #f0f0f0;
  }
  
  .logo h1 {
    margin: 0;
    font-size: 18px;
    font-weight: 500;
    color: #333;
  }
  
  .layout-header {
    height: 64px;
    padding: 0 16px;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  
  .header-left, .header-right {
    display: flex;
    align-items: center;
  }
  
  .layout-content {
    padding: 16px;
    background: #f5f7f9;
  }
  </style>