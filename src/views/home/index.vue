<template>
  <div class="dashboard">
    <!-- 顶部统计卡片 -->
    <el-row :gutter="20" class="stats-row">
      <el-col :span="6">
        <el-card class="stat-card" shadow="hover" v-loading="loading">
          <div class="stat-content">
            <div class="stat-icon bg-blue">
              <el-icon size="24"><User /></el-icon>
            </div>
            <div class="stat-info">
              <div class="stat-number">{{ statistics.totalCount }}</div>
              <div class="stat-label">学生总数</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="stat-card" shadow="hover" v-loading="loading">
          <div class="stat-content">
            <div class="stat-icon bg-green">
              <el-icon size="24"><Document /></el-icon>
            </div>
            <div class="stat-info">
              <div class="stat-number">{{ statistics.selectedCount }}</div>
              <div class="stat-label">已选人数</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="stat-card" shadow="hover" v-loading="loading">
          <div class="stat-content">
            <div class="stat-icon bg-orange">
              <el-icon size="24"><TrendCharts /></el-icon>
            </div>
            <div class="stat-info">
              <div class="stat-number">{{ statistics.completionRate }}%</div>
              <div class="stat-label">完成率</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="stat-card" shadow="hover" v-loading="loading">
          <div class="stat-content">
            <div class="stat-icon bg-red">
              <el-icon size="24"><Bell /></el-icon>
            </div>
            <div class="stat-info">
              <div class="stat-number">{{ statistics.uncompletedCount }}</div>
              <div class="stat-label">未完成数</div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 图表和列表区域 -->
    <el-row :gutter="20" class="content-row">
      <el-col :span="16">
        <el-card class="chart-card" shadow="never">
          <template #header>
            <div class="card-header">
              <span>数据趋势</span>
            </div>
          </template>
          <div class="chart-placeholder">
            <div class="chart-grid">
              <div class="chart-bar" style="height: 70%"></div>
              <div class="chart-bar" style="height: 45%"></div>
              <div class="chart-bar" style="height: 80%"></div>
              <div class="chart-bar" style="height: 60%"></div>
              <div class="chart-bar" style="height: 90%"></div>
              <div class="chart-bar" style="height: 55%"></div>
              <div class="chart-bar" style="height: 75%"></div>
              <div class="chart-bar" style="height: 65%"></div>
            </div>
            <div class="chart-x-axis">
              <span>周一</span>
              <span>周二</span>
              <span>周三</span>
              <span>周四</span>
              <span>周五</span>
              <span>周六</span>
              <span>周日</span>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="notice-card" shadow="never">
          <template #header>
            <div class="card-header">
              <span>最新通知</span>
            </div>
          </template>
          <div class="notice-list">
            <div class="notice-item">
              <el-tag type="success" size="small">新功能</el-tag>
              <span class="notice-text">系统新增数据分析模块</span>
            </div>
            <div class="notice-item">
              <el-tag type="warning" size="small">维护</el-tag>
              <span class="notice-text">本周六凌晨2点系统维护</span>
            </div>
            <div class="notice-item">
              <el-tag type="danger" size="small">紧急</el-tag>
              <span class="notice-text">请及时处理待办事项</span>
            </div>
            <div class="notice-item">
              <el-tag type="info" size="small">公告</el-tag>
              <span class="notice-text">欢迎使用管理系统</span>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 快捷操作区域 -->
    <el-row :gutter="20" class="quick-row">
      <el-col :span="24">
        <el-card class="quick-card" shadow="never">
          <template #header>
            <div class="card-header">
              <span>快捷操作</span>
            </div>
          </template>
          <div class="quick-actions">
            <el-button type="primary" :icon="Plus">新增用户</el-button>
            <el-button type="success" :icon="Upload">导入数据</el-button>
            <el-button type="warning" :icon="Download">导出报表</el-button>
            <el-button type="danger" :icon="Delete">批量删除</el-button>
            <el-button type="info" :icon="Search">查询统计</el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { User, Document, TrendCharts, Bell, Plus, Upload, Download, Delete, Search } from '@element-plus/icons-vue';
import { selectionService, type SelectionStatistics } from '@/services/internship';

// 统计数据
const statistics = ref<SelectionStatistics>({
  totalCount: 0,
  selectedCount: 0,
  completionRate: 0,
  uncompletedCount: 0
});

// 加载状态
const loading = ref(false);

// 获取统计数据
const getStatistics = async () => {
  loading.value = true;
  try {
    const data = await selectionService.getStatistics();
    statistics.value = data;
  } finally {
    loading.value = false;
  }
};

// 生命周期
onMounted(() => {
  getStatistics();
});
</script>

<style scoped>
@import './Index.scss';
</style>
