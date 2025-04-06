<template>
  <div class="side-menu">
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
        icon: renderIcon(menu.icon)
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

// 生成菜单选项
const menuOptions = computed(() => {
  return transformMenu(menuStore.menuTree)
})

// 菜单点击事件
function handleUpdateValue(key: string) {
  router.push(key)
}
</script>

<style scoped>
.side-menu {
  height: 100%;
}
</style> 