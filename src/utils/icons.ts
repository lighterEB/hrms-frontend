import { h } from 'vue'
import type { Component } from 'vue'
import { NIcon } from 'naive-ui'
import type { MenuOption } from 'naive-ui'
import * as AntdIcons from '@vicons/antd'

/**
 * 渲染图标
 * @param icon 图标名称或组件
 * @returns 渲染函数
 */
export function renderIcon(icon: any) {
  if (!icon) {
    // 默认图标
    return () => h(NIcon, null, { default: () => h(AntdIcons.AppstoreOutlined) })
  }
  
  // 如果已经是组件，直接使用
  if (typeof icon === 'object') {
    return () => h(NIcon, null, { default: () => h(icon) })
  }
  
  // 如果是字符串，尝试从Antd图标库中查找
  if (typeof icon === 'string') {
    const IconComponent = (AntdIcons as any)[icon]
    if (IconComponent) {
      return () => h(NIcon, null, { default: () => h(IconComponent) })
    }
  }
  
  // 默认返回一个基本图标
  return () => h(NIcon, null, { default: () => h(AntdIcons.AppstoreOutlined) })
}

export type { MenuOption }