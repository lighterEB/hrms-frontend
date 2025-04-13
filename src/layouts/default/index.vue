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
      <n-layout class="main-layout" :class="{ collapsed }">
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
          <div class="content-wrapper">
            <router-view></router-view>
          </div>
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
  import message from '@/utils/message'
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
    try {
      switch (key) {
        case 'logout':
          await userStore.logout()
          break
        case 'password':
          // 转到密码修改页面，暂未实现使用模态框代替
          message.info('密码修改功能暂未实现')
          break
        case 'profile':
          console.log('正在导航到个人信息页面...')
          // 提前获取用户详情，避免导航时数据不完整
          try {
            if (userStore.userInfo?.id) {
              // 使用完整路径避免相对路径问题
              router.push({ path: '/my-profile' })
            } else {
              message.error('用户信息不完整，无法访问个人资料')
            }
          } catch (routeError) {
            console.error('导航到个人信息页面出错:', routeError)
            message.error('导航失败，请刷新页面后重试')
          }
          break
      }
    } catch (error) {
      console.error('处理用户菜单选择出错:', error)
      message.error('操作失败，请稍后重试')
    }
  }
  </script>
  
  <style scoped>
  .layout {
    height: 100vh;
    width: 100vw;
    display: flex;
    overflow: hidden;
    margin: 0;
    padding: 0;
  }
  
  .layout-sider {
    background: #fff;
    height: 100%;
    overflow-y: auto;
    flex-shrink: 0;
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    z-index: 100;
  }
  
  .main-layout {
    flex: 1;
    width: calc(100% - 240px);
    display: flex;
    flex-direction: column;
    margin-left: 0;
  }
  
  .main-layout.collapsed {
    width: calc(100% - 64px);
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
    flex-shrink: 0;
    position: sticky;
    top: 0;
    z-index: 99;
  }
  
  .header-left, .header-right {
    display: flex;
    align-items: center;
  }
  
  .layout-content {
    padding: 16px;
    background: #f5f7f9;
    width: 100%;
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
  }
  
  .content-wrapper {
    width: 100%;
    padding: 0 20px;
  }
  
  /* 移动设备适配 */
  @media (max-width: 768px) {
    .layout-header {
      padding: 0 8px;
    }
    
    .header-left button {
      padding: 4px;
    }
    
    .layout-sider {
      position: fixed;
      z-index: 1000;
    }
    
    .main-layout {
      margin-left: 0;
    }
    
    .main-layout.collapsed {
      margin-left: 0;
    }
    
    .layout-content {
      padding: 12px;
    }
  }
  </style>