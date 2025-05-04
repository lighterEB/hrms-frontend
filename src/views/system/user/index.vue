<template>
  <div class="user-management">
    <n-card title="用户管理" :bordered="false">
      <!-- 操作栏 -->
      <div class="action-bar">
        <n-form inline :label-width="80" :model="searchForm">
          <n-form-item label="用户名">
            <n-input v-model:value="searchForm.username" placeholder="请输入用户名" clearable />
          </n-form-item>
          <n-form-item label="姓名">
            <n-input v-model:value="searchForm.realName" placeholder="请输入姓名" clearable />
          </n-form-item>
          <n-form-item label="手机号">
            <n-input v-model:value="searchForm.phone" placeholder="请输入手机号" clearable />
          </n-form-item>
          <n-form-item label="状态">
            <n-select
              v-model:value="searchForm.status"
              placeholder="请选择状态"
              :options="[
                { label: '全部', value: undefined },
                { label: '启用', value: 1 },
                { label: '禁用', value: 0 }
              ]"
              style="width: 100px"
              clearable
            />
          </n-form-item>
          <n-form-item>
            <n-space>
              <n-button type="primary" @click="handleSearch">
                <template #icon>
                  <n-icon><search-outlined /></n-icon>
                </template>
                搜索
              </n-button>
              <n-button @click="resetSearch">
                <template #icon>
                  <n-icon><reload-outlined /></n-icon>
                </template>
                重置
              </n-button>
            </n-space>
          </n-form-item>
        </n-form>
      </div>

      <div class="table-operations">
        <n-button type="primary" @click="openAddUserModal">
          <template #icon>
            <n-icon><user-add-outlined /></n-icon>
          </template>
          新增用户
        </n-button>
      </div>

      <!-- 用户表格 -->
      <n-data-table
        :columns="columns"
        :data="userList"
        :loading="loading"
        :pagination="{
          page: pagination.page,
          pageSize: pagination.pageSize,
          itemCount: pagination.itemCount,
          pageCount: pagination.pageCount,
          showSizePicker: pagination.showSizePicker,
          pageSizes: pagination.pageSizes,
          onChange: handlePageChange,
          onUpdatePageSize: handlePageSizeChange
        }"
        :bordered="false"
        striped
      />

      <!-- 用户编辑模态框 -->
      <n-modal v-model:show="showUserModal" :title="modalTitle" preset="card" style="width: 600px">
        <n-form
          ref="userFormRef"
          :model="userForm"
          :rules="userRules"
          label-placement="left"
          label-width="80"
          require-mark-placement="right-hanging"
        >
          <n-form-item label="用户名" path="username">
            <n-input v-model:value="userForm.username" placeholder="请输入用户名" :disabled="isEdit" />
          </n-form-item>
          <n-form-item :label="isEdit ? '新密码' : '密码'" path="password">
            <n-input
              v-model:value="userForm.password"
              type="password"
              placeholder="请输入密码"
              :disabled="isEdit && !resetPassword"
            />
            <n-checkbox v-if="isEdit" v-model:checked="resetPassword" style="margin-top: 8px">
              重置密码
            </n-checkbox>
          </n-form-item>
          <n-form-item label="姓名" path="realName">
            <n-input v-model:value="userForm.realName" placeholder="请输入姓名" />
          </n-form-item>
          <n-form-item label="性别" path="gender">
            <n-radio-group v-model:value="userForm.gender">
              <n-space>
                <n-radio :value="1">男</n-radio>
                <n-radio :value="2">女</n-radio>
                <n-radio :value="0">未知</n-radio>
              </n-space>
            </n-radio-group>
          </n-form-item>
          <n-form-item label="手机号" path="phone">
            <n-input v-model:value="userForm.phone" placeholder="请输入手机号" />
          </n-form-item>
          <n-form-item label="邮箱" path="email">
            <n-input v-model:value="userForm.email" placeholder="请输入邮箱" />
          </n-form-item>
          <n-form-item label="角色" path="roleIds">
            <n-select
              v-model:value="userForm.roleIds"
              multiple
              placeholder="请选择角色"
              :options="roleOptions"
            />
          </n-form-item>
          <n-form-item label="状态" path="status">
            <n-radio-group v-model:value="userForm.status">
              <n-space>
                <n-radio :value="1">启用</n-radio>
                <n-radio :value="0">禁用</n-radio>
              </n-space>
            </n-radio-group>
          </n-form-item>
        </n-form>
        <template #footer>
          <n-space justify="end">
            <n-button @click="showUserModal = false">取消</n-button>
            <n-button type="primary" @click="submitUserForm" :loading="submitting">
              确定
            </n-button>
          </n-space>
        </template>
      </n-modal>

      <!-- 删除确认对话框 -->
      <n-modal
        v-model:show="showDeleteConfirm"
        preset="dialog"
        title="确认删除"
        positive-text="确认"
        negative-text="取消"
        @positive-click="confirmDelete"
      >
        <template #icon>
          <n-icon color="warning"><warning-outlined /></n-icon>
        </template>
        您确定要删除用户"{{ userToDelete?.realName }}"吗？此操作不可恢复。
      </n-modal>
    </n-card>
  </div>
</template>

<script setup lang="ts">
import { h, reactive, ref } from 'vue'
import { useMessage } from 'naive-ui'
import type { DataTableColumns, FormInst, FormRules } from 'naive-ui'
import {
  SearchOutlined,
  ReloadOutlined,
  UserAddOutlined,
  EditOutlined,
  DeleteOutlined,
  WarningOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined
} from '@vicons/antd'
import { getUserList, createUser, updateUser, deleteUser, resetUserPassword } from '@/api/user'
import type { UserVO, UserForm, UserQuery } from '@/types/user'
import type { PageQuery } from '@/types/common'
import { getAllRoles } from '@/api/role'

// 组件API
const message = useMessage()

// 搜索相关
const searchForm = reactive<UserQuery>({
  username: '',
  realName: '',
  phone: '',
  email: '',
  status: undefined
})

const handleSearch = () => {
  pagination.page = 1
  loadUserData()
}

const resetSearch = () => {
  Object.keys(searchForm).forEach(key => {
    if (key === 'status') {
      searchForm.status = undefined;
    } else {
      (searchForm as any)[key] = '';
    }
  });
  handleSearch();
}

// 表格数据
const loading = ref(false)
const userList = ref<UserVO[]>([])

// 分页
const pagination = reactive({
  page: 1,
  pageSize: 10,
  itemCount: 0,
  pageCount: 0,
  showSizePicker: true,
  pageSizes: [10, 20, 50]
})

// 加载用户数据
const loadUserData = async () => {
  loading.value = true
  try {
    const params: PageQuery & UserQuery = {
      pageNum: pagination.page,
      pageSize: pagination.pageSize,
      ...searchForm
    }
    
    // 开发环境使用模拟数据
    if (import.meta.env.DEV) {
      setTimeout(() => {
        // 模拟数据
        userList.value = [
          {
            id: 1,
            username: 'admin',
            realName: '系统管理员',
            gender: 1,
            phone: '13800138000',
            email: 'admin@example.com',
            status: 1,
            createTime: '2023-01-01 00:00:00',
            updateTime: '2023-01-01 00:00:00',
            roles: [{ id: 1, name: '超级管理员', description: '系统最高权限' }]
          },
          {
            id: 2,
            username: 'hr_admin',
            realName: '人事主管',
            gender: 2,
            phone: '13900139000',
            email: 'hr@example.com',
            status: 1,
            createTime: '2023-01-02 00:00:00',
            updateTime: '2023-01-02 00:00:00',
            roles: [{ id: 2, name: '人事专员', description: '人事部门专员' }]
          },
          {
            id: 3,
            username: 'employee1',
            realName: '张三',
            gender: 1,
            phone: '13700137000',
            email: 'employee1@example.com',
            status: 1,
            createTime: '2023-01-03 00:00:00',
            updateTime: '2023-01-03 00:00:00',
            roles: [{ id: 3, name: '普通员工', description: '普通员工' }]
          },
          {
            id: 4,
            username: 'employee2',
            realName: '李四',
            gender: 2,
            phone: '13600136000',
            email: 'employee2@example.com',
            status: 0,
            createTime: '2023-01-04 00:00:00',
            updateTime: '2023-01-04 00:00:00',
            roles: [{ id: 3, name: '普通员工', description: '普通员工' }]
          }
        ]
        pagination.itemCount = 4
        pagination.pageCount = 1
        loading.value = false
      }, 500)
      return
    }
    
    // 生产环境调用API
    const data = await getUserList(params)
    userList.value = data.list
    pagination.itemCount = data.total
    pagination.pageCount = Math.ceil(data.total / pagination.pageSize)
  } catch (error) {
    console.error('获取用户列表失败:', error)
    message.error('获取用户列表失败')
  } finally {
    loading.value = false
  }
}

// 表格列
const createColumns = (): DataTableColumns<UserVO> => {
  return [
    {
      title: '用户名',
      key: 'username'
    },
    {
      title: '姓名',
      key: 'realName'
    },
    {
      title: '性别',
      key: 'gender',
      render(row) {
        const genderMap = {
          0: '未知',
          1: '男',
          2: '女'
        }
        return genderMap[row.gender as keyof typeof genderMap] || '未知'
      }
    },
    {
      title: '手机号',
      key: 'phone',
      render(row) {
        return row.phone || '-'
      }
    },
    {
      title: '邮箱',
      key: 'email',
      render(row) {
        return row.email || '-'
      }
    },
    {
      title: '角色',
      key: 'roles',
      render(row) {
        return row.roles.map(role => role.name).join(', ')
      }
    },
    {
      title: '状态',
      key: 'status',
      render(row) {
        return h(
          'div',
          {
            style: {
              display: 'flex',
              alignItems: 'center'
            }
          },
          [
            h(
              row.status === 1 ? CheckCircleOutlined : CloseCircleOutlined,
              {
                style: {
                  marginRight: '4px',
                  color: row.status === 1 ? '#18a058' : '#d03050'
                }
              }
            ),
            row.status === 1 ? '启用' : '禁用'
          ]
        )
      }
    },
    {
      title: '创建时间',
      key: 'createTime'
    },
    {
      title: '操作',
      key: 'actions',
      fixed: 'right',
      width: 150,
      render(row) {
        return h('div', [
          h(
            'a',
            {
              style: {
                marginRight: '10px',
                color: '#2080f0'
              },
              onClick: () => handleEditUser(row)
            },
            [
              h(EditOutlined, {
                style: {
                  marginRight: '4px'
                }
              }),
              '编辑'
            ]
          ),
          h(
            'a',
            {
              style: {
                color: '#d03050'
              },
              onClick: () => handleDeleteUser(row)
            },
            [
              h(DeleteOutlined, {
                style: {
                  marginRight: '4px'
                }
              }),
              '删除'
            ]
          )
        ])
      }
    }
  ]
}

const columns = createColumns()

// 新增/编辑用户
const userFormRef = ref<FormInst | null>(null)
const showUserModal = ref(false)
const modalTitle = ref('新增用户')
const isEdit = ref(false)
const resetPassword = ref(false)
const submitting = ref(false)

// 用户表单
const userForm = ref<UserForm>({
  username: '',
  password: '',
  realName: '',
  gender: 1,
  phone: '',
  email: '',
  roleIds: [],
  status: 1
})

// 角色选项
const roleOptions = ref<{ label: string, value: number }[]>([])

// 加载角色选项
const loadRoleOptions = async () => {
  try {
    if (import.meta.env.DEV) {
      roleOptions.value = [
        { label: '超级管理员', value: 1 },
        { label: '人事专员', value: 2 },
        { label: '普通员工', value: 3 }
      ]
      return
    }
    
    const roles = await getAllRoles()
    roleOptions.value = roles.map(role => ({
      label: role.name,
      value: role.id
    }))
  } catch (error) {
    console.error('获取角色列表失败:', error)
    message.error('获取角色列表失败')
  }
}

// 表单验证规则
const userRules: FormRules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 20, message: '用户名长度在3到20个字符', trigger: 'blur' }
  ],
  password: [
    {
      required: true,
      message: '请输入密码',
      trigger: 'blur',
      validator: (rule, value) => {
        if (isEdit.value && !resetPassword.value) return true
        return !!value
      }
    },
    {
      min: 6,
      message: '密码长度不能少于6个字符',
      trigger: 'blur',
      validator: (rule, value) => {
        if ((isEdit.value && !resetPassword.value) || !value) return true
        return value.length >= 6
      }
    }
  ],
  realName: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
  phone: [
    {
      pattern: /^1[3-9]\d{9}$/,
      message: '手机号格式不正确',
      trigger: 'blur'
    }
  ],
  email: [
    {
      type: 'email',
      message: '邮箱格式不正确',
      trigger: 'blur'
    }
  ],
  roleIds: [
    {
      type: 'array',
      min: 1,
      message: '请至少选择一个角色',
      trigger: ['blur', 'change']
    }
  ]
}

// 打开新增用户模态框
const openAddUserModal = () => {
  isEdit.value = false
  resetPassword.value = false
  modalTitle.value = '新增用户'
  userForm.value = {
    username: '',
    password: '',
    realName: '',
    gender: 1,
    phone: '',
    email: '',
    roleIds: [],
    status: 1
  }
  showUserModal.value = true
}

// 处理编辑用户
const handleEditUser = (row: UserVO) => {
  isEdit.value = true
  resetPassword.value = false
  modalTitle.value = '编辑用户'
  userForm.value = {
    username: row.username,
    password: '',
    realName: row.realName,
    gender: row.gender,
    phone: row.phone || '',
    email: row.email || '',
    roleIds: row.roles.map(role => role.id),
    status: row.status
  }
  showUserModal.value = true
}

// 提交用户表单
const submitUserForm = () => {
  userFormRef.value?.validate(async (errors) => {
    if (errors) return

    submitting.value = true
    try {
      if (isEdit.value) {
        // 更新用户
        const userId = userToEdit.value?.id
        if (!userId) {
          message.error('用户ID不能为空')
          return
        }
        
        if (resetPassword.value) {
          // 重置密码
          await resetUserPassword(userId, userForm.value.password)
        }
        
        // 更新其他信息
        const updateData = { ...userForm.value }
        if (!resetPassword.value) {
          const { password, ...rest } = updateData
          await updateUser(userId, rest as UserForm)
        } else {
          await updateUser(userId, updateData)
        }
        
        message.success('修改用户成功')
      } else {
        // 创建用户
        await createUser(userForm.value)
        message.success('新增用户成功')
      }
      
      showUserModal.value = false
      loadUserData()
    } catch (error: any) {
      message.error(error.message || '操作失败')
    } finally {
      submitting.value = false
    }
  })
}

// 删除用户
const showDeleteConfirm = ref(false)
const userToDelete = ref<UserVO | null>(null)
const userToEdit = ref<UserVO | null>(null)

const handleDeleteUser = (row: UserVO) => {
  userToDelete.value = row
  showDeleteConfirm.value = true
}

const confirmDelete = async () => {
  if (!userToDelete.value) return
  
  try {
    await deleteUser(userToDelete.value.id)
    message.success('删除用户成功')
    loadUserData()
  } catch (error: any) {
    message.error(error.message || '删除用户失败')
  }
}

// 分页变化
const handlePageChange = (page: number) => {
  pagination.page = page
  loadUserData()
}

const handlePageSizeChange = (pageSize: number) => {
  pagination.pageSize = pageSize
  pagination.page = 1
  loadUserData()
}

// 初始加载
loadUserData()
loadRoleOptions()
</script>

<style scoped>
.user-management {
  padding: 20px;
}

.action-bar {
  margin-bottom: 16px;
  padding: 16px;
  background-color: #fff;
  border-radius: 4px;
}

.table-operations {
  margin-bottom: 16px;
  display: flex;
  justify-content: flex-end;
}

:deep(.n-card__content) {
  padding-top: 16px;
}
</style> 