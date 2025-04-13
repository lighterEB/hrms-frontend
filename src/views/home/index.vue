<template>
  <div class="home-container">
    <div class="welcome-section">
      <h1 class="welcome-title">欢迎使用 人力资源管理系统</h1>
      <p class="welcome-subtitle">一站式企业人力资源管理平台</p>
    </div>
    
    <div class="stats-section">
      <n-grid :cols="4" :x-gap="12" :y-gap="12" responsive="screen">
        <n-grid-item span="1 m:2 l:1">
          <n-card class="stat-card">
            <n-statistic label="在职员工">
              <n-number-animation
                ref="numberAnimationInstRef"
                :from="0"
                :to="123"
              />
            </n-statistic>
          </n-card>
        </n-grid-item>
        
        <n-grid-item span="1 m:2 l:1">
          <n-card class="stat-card">
            <n-statistic label="本月新入职">
              <n-number-animation
                :from="0"
                :to="15"
              />
            </n-statistic>
          </n-card>
        </n-grid-item>
        
        <n-grid-item span="1 m:2 l:1">
          <n-card class="stat-card">
            <n-statistic label="部门数量">
              <n-number-animation
                :from="0"
                :to="8"
              />
            </n-statistic>
          </n-card>
        </n-grid-item>
        
        <n-grid-item span="1 m:2 l:1">
          <n-card class="stat-card">
            <n-statistic label="总绩效分">
              <n-number-animation
                :from="0"
                :to="95"
                :precision="1"
                suffix="%"
              />
            </n-statistic>
          </n-card>
        </n-grid-item>
      </n-grid>
    </div>
    
    <div class="recent-section">
      <n-card title="最近动态" class="recent-card">
        <n-list>
          <n-list-item v-for="(item, index) in recentActivities" :key="index">
            <n-thing :title="item.title" :description="item.time">
              {{ item.content }}
            </n-thing>
          </n-list-item>
        </n-list>
      </n-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 最近动态数据
const recentActivities = ref([
  {
    title: '系统更新',
    content: '系统已更新至最新版本 v1.2.0，新增绩效管理模块',
    time: '2023-06-15 10:30'
  },
  {
    title: '员工入职',
    content: '张三已成功入职，部门：技术部，职位：前端开发工程师',
    time: '2023-06-10 09:15'
  },
  {
    title: '部门调整',
    content: '市场部与销售部合并为市场销售部',
    time: '2023-06-05 14:22'
  }
])
</script>

<style scoped>
.home-container {
  width: 100%;
  padding-bottom: 30px;
}

.welcome-section {
  padding: 30px 0;
  text-align: center;
  margin-bottom: 20px;
  border-radius: 8px;
  background-color: #fff;
}

.welcome-title {
  font-size: 28px;
  color: #333;
  margin: 0 0 12px 0;
}

.welcome-subtitle {
  font-size: 16px;
  color: #666;
  margin: 0;
}

.stats-section {
  margin-bottom: 24px;
}

.stat-card {
  height: 100%;
  transition: all 0.3s;
}

.stat-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.recent-section {
  margin-top: 24px;
}

.recent-card {
  width: 100%;
}

@media (max-width: 768px) {
  .welcome-title {
    font-size: 24px;
  }
  
  .welcome-subtitle {
    font-size: 14px;
  }
}
</style>