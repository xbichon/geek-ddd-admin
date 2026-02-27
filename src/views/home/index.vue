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
              <span>系统公告</span>
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
              <el-tag type="info" size="small">公告</el-tag>
              <span class="notice-text">欢迎使用管理系统</span>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 论文选择排名 - 横向柱状图 -->
    <el-row :gutter="20" class="content-row">
      <el-col :span="24">
        <el-card class="ranking-card" shadow="never" v-loading="rankingLoading">
          <template #header>
            <div class="card-header">
              <span>论文选择排名</span>
            </div>
          </template>
          <div class="ranking-chart">
            <div
              v-for="(item, index) in thesisRanking"
              :key="item.thesisId"
              class="ranking-bar-item"
            >
              <div class="ranking-bar-label">{{ item.thesisTitle }}</div>
              <div class="ranking-bar-wrapper">
                <div
                  class="ranking-bar"
                  :style="getBarStyle(item, index)"
                  :class="{ 'top-1': index === 0, 'top-2': index === 1, 'top-3': index === 2 }"
                >
                  <span v-if="item.selectionCount > 0" class="ranking-bar-text">{{ item.selectionCount }}</span>
                </div>
              </div>
              <div class="ranking-bar-count">{{ item.selectionCount }}/{{ item.maxSelections }}</div>
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
import { selectionService, type SelectionStatistics, thesisService, type ThesisRanking } from '@/services/internship';

// 统计数据
const statistics = ref<SelectionStatistics>({
  totalCount: 0,
  selectedCount: 0,
  completionRate: 0,
  uncompletedCount: 0
});

// 论文排名数据
const thesisRanking = ref<ThesisRanking[]>([]);

// 加载状态
const loading = ref(false);
const rankingLoading = ref(false);

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

// 获取论文排名
const getThesisRanking = async () => {
  rankingLoading.value = true;
  try {
    const data = await thesisService.getRanking();
    // 按已选人数降序排序
    thesisRanking.value = data.sort((a, b) => b.selectionCount - a.selectionCount);
  } finally {
    rankingLoading.value = false;
  }
};

// 16色渐变配色方案
const barColors = [
  'linear-gradient(90deg, #ff6b6b, #ee5a24)', // 红色
  'linear-gradient(90deg, #ff9f43, #feca57)', // 橙色
  'linear-gradient(90deg, #feca57, #ff9ff3)', // 黄粉
  'linear-gradient(90deg, #ff9ff3, #f368e0)', // 粉色
  'linear-gradient(90deg, #f368e0, #a55eea)', // 紫粉
  'linear-gradient(90deg, #a55eea, #8c7ae6)', // 紫色
  'linear-gradient(90deg, #8c7ae6, #5f27cd)', // 深紫
  'linear-gradient(90deg, #5f27cd, #341f97)', // 蓝紫
  'linear-gradient(90deg, #341f97, #0984e3)', // 深蓝
  'linear-gradient(90deg, #0984e3, #00b894)', // 蓝绿
  'linear-gradient(90deg, #00b894, #00cec9)', // 青绿
  'linear-gradient(90deg, #00cec9, #81ecec)', // 青色
  'linear-gradient(90deg, #81ecec, #74b9ff)', // 浅蓝
  'linear-gradient(90deg, #74b9ff, #3498db)', // 天蓝
  'linear-gradient(90deg, #3498db, #1abc9c)', // 青蓝
  'linear-gradient(90deg, #1abc9c, #16a085)', // 绿色
];

// 获取柱状图样式
const getBarStyle = (item: ThesisRanking, index: number) => {
  const width = Math.round((item.selectionCount / item.maxSelections) * 100);
  // 前3名使用特殊样式，其他使用配色方案
  if (index < 3) {
    return { width: width + '%' };
  }
  return {
    width: width + '%',
    background: barColors[index % barColors.length],
  };
};

// 生命周期
onMounted(() => {
  getStatistics();
  getThesisRanking();
});
</script>

<style scoped>
@import './Index.scss';
</style>
