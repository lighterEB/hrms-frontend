<template>
  <div class="side-menu">
    <div class="logo-container" v-if="!collapsed">
      <h2 class="logo-text">人力资源管理系统</h2>
    </div>
    <div class="logo-container collapsed-logo" v-else>
      <h2 class="logo-text">HR</h2>
    </div>
    <n-menu
      :options="menuOptions"
      :collapsed="collapsed"
      :collapsed-width="64"
      :collapsed-icon-size="22"
      :indent="24"
      :root-indent="18"
      :inverted="inverted"
      :value="activeKey"
      @update:value="handleUpdateValue"
      :theme-overrides="menuThemeOverrides"
    />
  </div>
</template>

<script setup lang="ts">
import { h, ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useMenuStore } from '@/stores/menu'
import type { MenuOption } from 'naive-ui'
import type { MenuVO } from '@/types/menu'
import { renderIcon } from '@/utils/icons'
import { HomeOutlined } from '@vicons/antd'

const props = defineProps({
  collapsed: {
    type: Boolean,
    default: false
  },
  inverted: {
    type: Boolean,
    default: true
  }
})

const route = useRoute()
const router = useRouter()
const menuStore = useMenuStore()

const activeKey = ref('')

// 自定义菜单主题
const menuThemeOverrides = {
  // 文字颜色
  itemTextColor: 'rgba(255, 255, 255, 0.85)',
  itemTextColorHover: '#ffffff',
  itemTextColorActive: '#ffffff',
  itemTextColorChildActive: '#ffffff',
  
  // 菜单项背景色
  itemColor: 'transparent',
  itemColorHover: 'rgba(255, 255, 255, 0.15)',
  itemColorActive: '#18aa57',
  itemColorActiveHover: '#1dbd61',
  
  // 箭头颜色
  arrowColor: 'rgba(255, 255, 255, 0.85)',
  arrowColorHover: '#ffffff',
  arrowColorActive: '#ffffff',
  arrowColorChildActive: '#ffffff',
  
  // 图标颜色
  itemIconColor: 'rgba(255, 255, 255, 0.85)',
  itemIconColorHover: '#ffffff',
  itemIconColorActive: '#ffffff',
  itemIconColorChildActive: '#ffffff',
  itemIconColorCollapsed: 'rgba(255, 255, 255, 0.85)',
  itemIconColorHoverCollapsed: '#ffffff',
  itemIconColorActiveCollapsed: '#ffffff',
  itemIconColorChildActiveCollapsed: '#ffffff',
  
  // 菜单背景色
  color: '#18222c', 
  colorHover: '#18222c',
  colorActive: '#18222c',
  
  // 子菜单背景色
  colorItemDivider: 'rgba(255, 255, 255, 0.1)'
}

// 监听路由变化，更新激活的菜单项
watch(() => route.path, (path) => {
  activeKey.value = path
}, { immediate: true })

// 将菜单树转换为Naive UI菜单选项
function transformMenu(menus: MenuVO[]): MenuOption[] {
  return menus
    .filter(menu => !menu.hidden)
    .map(menu => {
      const option: MenuOption = {
        label: menu.name,
        key: menu.path,
        icon: renderIcon(menu.icon, menu.name)
      }
      
      if (menu.children && menu.children.length > 0) {
        option.children = transformMenu(menu.children)
      }
      
      return option
    })
    .sort((a, b) => {
      const aSort = (a as any).sort || 0
      const bSort = (b as any).sort || 0
      return aSort - bSort
    })
}

// 生成菜单选项，添加首页选项
const menuOptions = computed(() => {
  // 获取菜单树
  const menuItems = transformMenu(menuStore.menuTree)
  
  // 检查是否已经包含了首页
  const hasHome = menuItems.some(item => item.key === '/home')
  
  if (!hasHome) {
    // 如果菜单中没有首页,添加首页选项
    const homeOption: MenuOption = {
      label: '首页',
      key: '/home',
      icon: renderIcon('HomeOutlined')
    }
    return [homeOption, ...menuItems]
  }
  
  return menuItems
})

// 菜单点击事件
function handleUpdateValue(key: string) {
  router.push(key)
}
</script>

<style scoped>
.side-menu {
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #18222c;
}

.logo-container {
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  background-color: #18222c;
}

.collapsed-logo {
  padding: 16px 0;
}

.logo-text {
  color: white;
  margin: 0;
  font-size: 18px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 选中样式覆盖 */
:deep(.n-menu-item-content--selected) {
  background-color: #18aa57 !important;
}

:deep(.n-menu-item-content--selected:hover) {
  background-color: #1dbd61 !important;
}

:deep(.n-menu-item.n-menu-item--selected .n-menu-item-content::before) {
  left: 0;
  content: '';
  width: 4px;
  top: 0;
  bottom: 0;
  position: absolute;
  background-color: #1ed676;
}
</style> 