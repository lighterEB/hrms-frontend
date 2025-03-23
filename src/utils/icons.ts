import { h } from 'vue'
import type { Component } from 'vue'
import { NIcon } from 'naive-ui'
import type { MenuOption } from 'naive-ui'

export function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

export type { MenuOption }