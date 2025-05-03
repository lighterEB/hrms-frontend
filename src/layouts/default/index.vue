<template>
  <div class="main-layout" :class="{ collapsed: isCollapsed }">
    <div class="sidebar" :class="{ collapsed: isCollapsed }">
      <side-menu :collapsed="isCollapsed" />
    </div>
    <div class="content-wrapper">
      <header class="header">
        <div class="header-left">
          <n-button quaternary circle @click="toggleCollapse">
            <template #icon>
              <n-icon size="20">
                <MenuFoldOutlined v-if="isCollapsed" />
                <MenuUnfoldOutlined v-else />
              </n-icon>
            </template>
          </n-button>
        </div>
        <div class="header-right">
          <n-dropdown :options="userOptions" @select="handleUserSelect">
            <n-avatar
              round
              :size="32"
              :src="userStore.userInfo?.avatar || defaultAvatar"
            />
          </n-dropdown>
        </div>
      </header>
      <main class="main-content">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@vicons/antd'
import { useUserStore } from '@/stores/user'
import SideMenu from '@/components/SideMenu.vue'
import message from '@/utils/message'
import type { DropdownOption } from 'naive-ui'

const defaultAvatar = '/avatar-default.png'
const router = useRouter()
const userStore = useUserStore()
const isCollapsed = ref(false)

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
  if (key === 'logout') {
    await userStore.logout()
    router.push('/login')
  } else if (key === 'profile') {
    router.push('/my-profile')
  }
}

const toggleCollapse = () => {
  isCollapsed.value = !isCollapsed.value
}
</script>

<style scoped>
.main-layout {
  min-height: 100vh;
  display: flex;
  background-color: #f5f7fa;
}

.sidebar {
  width: 240px;
  flex-shrink: 0;
  background-color: #18222c;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-in-out;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  z-index: 100;
}

.sidebar.collapsed {
  width: 64px;
}

.content-wrapper {
  flex: 1;
  margin-left: 240px;
  min-width: 0;
  transition: all 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
}

.main-layout.collapsed .content-wrapper {
  margin-left: 64px;
}

.header {
  height: 64px;
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 99;
}

.header-left {
  display: flex;
  align-items: center;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.main-content {
  flex: 1;
  padding: 24px;
  min-height: calc(100vh - 64px);
  box-sizing: border-box;
}

@media (max-width: 768px) {
  .sidebar {
    transform: translateX(-100%);
  }

  .sidebar.collapsed {
    transform: translateX(0);
  }

  .content-wrapper {
    margin-left: 0 !important;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>