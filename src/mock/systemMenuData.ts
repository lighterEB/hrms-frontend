import type { MenuVO } from '@/types/menu'

/**
 * 系统管理菜单数据示例 - 用于接口测试
 */
export const systemMenuList: MenuVO[] = [
  // 系统管理
  {
    id: 1,
    name: '系统管理',
    path: '/system',
    component: 'Layout',
    icon: 'SettingOutlined',
    orderNum: 1,
    parentId: 0,
    hidden: false,
    sort: 1
  },
  // 用户管理
  {
    id: 2,
    name: '用户管理',
    path: '/system/user',
    component: 'system/user/index',
    icon: 'UserOutlined',
    orderNum: 1,
    parentId: 1,
    hidden: false,
    sort: 1
  },
  // 角色管理
  {
    id: 3,
    name: '角色管理',
    path: '/system/role',
    component: 'system/role/index',
    icon: 'TeamOutlined',
    orderNum: 2,
    parentId: 1,
    hidden: false,
    sort: 2
  },
  // 首页
  {
    id: 25,
    name: '首页',
    path: '/home',
    component: 'home/index',
    icon: 'HomeOutlined',
    orderNum: 0,
    parentId: 0,
    hidden: false,
    sort: 0
  }
] 