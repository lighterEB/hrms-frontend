import { h } from 'vue'
import type { Component } from 'vue'
import { NIcon } from 'naive-ui'
import type { MenuOption } from 'naive-ui'
import * as AntdIcons from '@vicons/antd'

// 定义常用菜单的图标映射
const ICON_MAP: Record<string, string> = {
  // 系统管理
  '系统管理': 'SettingOutlined',
  '用户管理': 'UserOutlined',
  '角色管理': 'TeamOutlined',
  '菜单管理': 'MenuOutlined',
  '权限管理': 'SafetyCertificateOutlined',
  '字典管理': 'BookOutlined',
  '系统日志': 'FileTextOutlined',
  
  // 人事管理
  '人事管理': 'IdcardOutlined',
  '员工档案': 'SolutionOutlined',
  '入职管理': 'UserAddOutlined',
  '离职管理': 'UserDeleteOutlined',
  '部门管理': 'ApartmentOutlined',
  '岗位管理': 'BranchesOutlined',
  
  // 考勤管理
  '考勤管理': 'FieldTimeOutlined',
  '考勤记录': 'CheckCircleOutlined',
  '请假管理': 'CalendarOutlined',
  '出差管理': 'CarOutlined',
  '加班管理': 'ClockCircleOutlined',
  
  // 薪资管理
  '薪资管理': 'DollarOutlined',
  '薪资设置': 'SettingOutlined',
  '薪资核算': 'AccountBookOutlined',
  '薪资发放': 'TransactionOutlined',
  '薪资报表': 'BarChartOutlined',
  
  // 绩效管理
  '绩效管理': 'TrophyOutlined',
  '绩效考核': 'AuditOutlined',
  '绩效目标': 'AimOutlined',
  '绩效分析': 'LineChartOutlined',
  
  // 招聘管理
  '招聘管理': 'UsergroupAddOutlined',
  '招聘需求': 'FileAddOutlined',
  '简历管理': 'FileTextOutlined',
  '面试管理': 'ScheduleOutlined',
  '招聘统计': 'PieChartOutlined',
  
  // 培训管理
  '培训管理': 'ReadOutlined',
  '培训计划': 'ScheduleOutlined',
  '培训课程': 'BookOutlined',
  '培训记录': 'FileTextOutlined',
  
  // 首页
  '首页': 'HomeOutlined',
  '个人资料': 'UserOutlined',
  '仪表盘': 'DashboardOutlined',
  '统计报表': 'BarChartOutlined',
  '通知公告': 'NotificationOutlined',
  '消息中心': 'MessageOutlined'
}

/**
 * 渲染图标
 * @param icon 图标名称或组件
 * @param menuName 菜单名称，用于从映射表中查找图标
 * @returns 渲染函数
 */
export function renderIcon(icon: any, menuName?: string) {
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
  
  // 根据菜单名称尝试查找映射的图标
  if (menuName && ICON_MAP[menuName]) {
    const MappedIcon = (AntdIcons as any)[ICON_MAP[menuName]]
    if (MappedIcon) {
      return () => h(NIcon, null, { default: () => h(MappedIcon) })
    }
  }
  
  // 默认返回一个基本图标
  return () => h(NIcon, null, { default: () => h(AntdIcons.AppstoreOutlined) })
}

export type { MenuOption }