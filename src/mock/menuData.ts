import type { MenuVO } from '@/types/menu'

/**
 * 系统菜单数据
 */
export const menuList: MenuVO[] = [
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
  // 菜单管理
  {
    id: 4,
    name: '菜单管理',
    path: '/system/menu',
    component: 'system/menu/index',
    icon: 'MenuOutlined',
    orderNum: 3,
    parentId: 1,
    hidden: false,
    sort: 3
  },
  // 系统监控
  {
    id: 5,
    name: '系统监控',
    path: '/system/monitor',
    component: 'system/monitor/index',
    icon: 'MonitorOutlined',
    orderNum: 4,
    parentId: 1,
    hidden: false,
    sort: 4
  },
  // 字典管理
  {
    id: 25,
    name: '字典管理',
    path: '/system/dict',
    component: 'system/dict/index',
    icon: 'BookOutlined',
    orderNum: 5,
    parentId: 1,
    hidden: false,
    sort: 5
  },
  // 日志管理
  {
    id: 26,
    name: '日志管理',
    path: '/system/log',
    component: 'system/log/index',
    icon: 'FileTextOutlined',
    orderNum: 6,
    parentId: 1,
    hidden: false,
    sort: 6
  },
  
  // 人事管理
  {
    id: 6,
    name: '人事管理',
    path: '/hr',
    component: 'Layout',
    icon: 'IdcardOutlined',
    orderNum: 2,
    parentId: 0,
    hidden: false,
    sort: 2
  },
  // 员工管理
  {
    id: 7,
    name: '员工管理',
    path: '/hr/employee',
    component: 'hr/employee/index',
    icon: 'SolutionOutlined',
    orderNum: 1,
    parentId: 6,
    hidden: false,
    sort: 1
  },
  // 部门管理
  {
    id: 8,
    name: '部门管理',
    path: '/hr/department',
    component: 'hr/department/index',
    icon: 'ApartmentOutlined',
    orderNum: 2,
    parentId: 6,
    hidden: false,
    sort: 2
  },
  // 岗位管理
  {
    id: 9,
    name: '岗位管理',
    path: '/hr/position',
    component: 'hr/position/index',
    icon: 'BranchesOutlined',
    orderNum: 3,
    parentId: 6,
    hidden: false,
    sort: 3
  },
  
  // 考勤管理
  {
    id: 10,
    name: '考勤管理',
    path: '/attendance',
    component: 'Layout',
    icon: 'FieldTimeOutlined',
    orderNum: 3,
    parentId: 0,
    hidden: false,
    sort: 3
  },
  // 考勤记录
  {
    id: 11,
    name: '考勤记录',
    path: '/attendance/record',
    component: 'attendance/record/index',
    icon: 'CheckCircleOutlined',
    orderNum: 1,
    parentId: 10,
    hidden: false,
    sort: 1
  },
  // 请假管理
  {
    id: 12,
    name: '请假管理',
    path: '/attendance/leave',
    component: 'attendance/leave/index',
    icon: 'CalendarOutlined',
    orderNum: 2,
    parentId: 10,
    hidden: false,
    sort: 2
  },
  
  // 薪资管理
  {
    id: 13,
    name: '薪资管理',
    path: '/salary',
    component: 'Layout',
    icon: 'DollarOutlined',
    orderNum: 4,
    parentId: 0,
    hidden: false,
    sort: 4
  },
  // 薪资记录
  {
    id: 14,
    name: '薪资记录',
    path: '/salary/record',
    component: 'salary/record/index',
    icon: 'AccountBookOutlined',
    orderNum: 1,
    parentId: 13,
    hidden: false,
    sort: 1
  },
  // 薪资配置
  {
    id: 15,
    name: '薪资配置',
    path: '/salary/config',
    component: 'salary/config/index',
    icon: 'SettingOutlined',
    orderNum: 2,
    parentId: 13,
    hidden: false,
    sort: 2
  },
  
  // 绩效管理
  {
    id: 16,
    name: '绩效管理',
    path: '/performance',
    component: 'Layout',
    icon: 'TrophyOutlined',
    orderNum: 5,
    parentId: 0,
    hidden: false,
    sort: 5
  },
  // 绩效考核
  {
    id: 17,
    name: '绩效考核',
    path: '/performance/assessment',
    component: 'performance/assessment/index',
    icon: 'AuditOutlined',
    orderNum: 1,
    parentId: 16,
    hidden: false,
    sort: 1
  },
  // 绩效配置
  {
    id: 18,
    name: '绩效配置',
    path: '/performance/config',
    component: 'performance/config/index',
    icon: 'SettingOutlined',
    orderNum: 2,
    parentId: 16,
    hidden: false,
    sort: 2
  },
  
  // 培训管理
  {
    id: 19,
    name: '培训管理',
    path: '/training',
    component: 'Layout',
    icon: 'ReadOutlined',
    orderNum: 6,
    parentId: 0,
    hidden: false,
    sort: 6
  },
  // 培训计划
  {
    id: 20,
    name: '培训计划',
    path: '/training/plan',
    component: 'training/plan/index',
    icon: 'ScheduleOutlined',
    orderNum: 1,
    parentId: 19,
    hidden: false,
    sort: 1
  },
  // 培训记录
  {
    id: 21,
    name: '培训记录',
    path: '/training/record',
    component: 'training/record/index',
    icon: 'FileTextOutlined',
    orderNum: 2,
    parentId: 19,
    hidden: false,
    sort: 2
  },
  
  // 组织管理
  {
    id: 22,
    name: '组织管理',
    path: '/organization',
    component: 'Layout',
    icon: 'ClusterOutlined',
    orderNum: 7,
    parentId: 0,
    hidden: false,
    sort: 7
  },
  // 组织架构
  {
    id: 23,
    name: '组织架构',
    path: '/organization/structure',
    component: 'organization/structure/index',
    icon: 'NodeExpandOutlined',
    orderNum: 1,
    parentId: 22,
    hidden: false,
    sort: 1
  },
  // 公司信息
  {
    id: 24,
    name: '公司信息',
    path: '/organization/company',
    component: 'organization/company/index',
    icon: 'HomeOutlined',
    orderNum: 2,
    parentId: 22,
    hidden: false,
    sort: 2
  }
] 