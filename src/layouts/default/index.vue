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
        <n-menu
          :collapsed="collapsed"
          :collapsed-width="64"
          :collapsed-icon-size="22"
          :options="menuOptions"
        />
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
            <n-dropdown :options="userOptions" @select="handleUserSelect">
              <n-avatar
                round
                size="small"
                :src="userStore.userInfo?.avatar || ''"
              />
            </n-dropdown>
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
  import { MenuFoldOutlined, MenuUnfoldOutlined, HomeOutlined, TeamOutlined } from '@vicons/antd'
  import { useUserStore } from '@/stores/user'
  import type { MenuOption } from 'naive-ui'
import { renderIcon } from '@/utils/icons'
  
  const router = useRouter()
  const userStore = useUserStore()
  const collapsed = ref(false)
  
  // 菜单配置
  const menuOptions: MenuOption[] = [
    {
      label: '首页',
      key: 'home',
      icon: renderIcon(HomeOutlined)
    },
    {
      label: '员工管理',
      key: 'employee',
      icon: renderIcon(TeamOutlined),
      children: [
        {
          label: '员工列表',
          key: 'employee_list'
        },
        {
          label: '员工档案',
          key: 'employee_profile'
        }
      ]
    }
    // ... 其他菜单项
  ]
  
  // 用户下拉菜单选项
  const userOptions = [
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
        await router.push('/login')
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