import type { RouteRecordRaw } from 'vue-router';

// 菜单项
export interface MenuVO {
  id: number;
  name: string;
  path: string;
  component: string;
  icon: string;
  orderNum: number;
  parentId: number;
  hidden: boolean;
  sort: number;
  children?: MenuVO[];
}

// 扩展路由类型，与Vue Router兼容
export interface RouteMenu extends Omit<RouteRecordRaw, 'children' | 'name' | 'meta'> {
  name: string;
  meta: {
    title: string;
    icon?: string;
    hidden?: boolean;
    sort?: number;
  };
  children?: RouteMenu[];
}

// 菜单树节点
export interface MenuTreeNode extends MenuVO {
  children?: MenuTreeNode[];
} 