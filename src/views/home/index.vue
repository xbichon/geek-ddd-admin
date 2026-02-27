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

    <!-- 选题方向排名 - 横向柱状图 -->
    <el-row :gutter="20" class="content-row">
      <el-col :span="24">
        <el-card class="ranking-card" shadow="never" v-loading="rankingLoading">
          <template #header>
            <div class="card-header">
              <span>选题方向排名</span>
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

    <!-- 数据趋势 -->
    <el-row :gutter="20" class="content-row">
      <el-col :span="24">
        <el-card class="chart-card" shadow="never" v-loading="trendLoading">
          <template #header>
            <div class="card-header">
              <span>数据趋势</span>
            </div>
          </template>
          <div v-if="dailyTrend.length === 0" class="chart-empty">
            <el-empty description="暂无数据" />
          </div>
          <div v-else class="chart-placeholder">
            <div class="chart-grid">
              <div
                v-for="(item, index) in dailyTrend"
                :key="item.date"
                class="chart-bar-wrapper"
              >
                <div
                  class="chart-bar"
                  :style="{ height: getTrendHeight(item.selectionCount) + '%' }"
                  :title="formatDate(item.date) + ': ' + item.selectionCount + '人'"
                >
                  <span v-if="item.selectionCount > 0" class="chart-bar-value">{{ item.selectionCount }}</span>
                </div>
              </div>
            </div>
            <div class="chart-x-axis">
              <span v-for="item in dailyTrend" :key="item.date">{{ formatDate(item.date) }}</span>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { User, Document, TrendCharts, Bell } from '@element-plus/icons-vue';
import { selectionService, type SelectionStatistics, thesisService, type ThesisRanking, type DailySelection } from '@/services/internship';

// 统计数据
const statistics = ref<SelectionStatistics>({
  totalCount: 0,
  selectedCount: 0,
  completionRate: 0,
  uncompletedCount: 0
});

// 论文排名数据
const thesisRanking = ref<ThesisRanking[]>([]);

// 每日选题趋势数据
const dailyTrend = ref<DailySelection[]>([]);

// 加载状态
const loading = ref(false);
const rankingLoading = ref(false);
const trendLoading = ref(false);

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

// 获取每日选题趋势
const getDailyTrend = async () => {
  trendLoading.value = true;
  try {
    const data = await thesisService.getDailyTrend();
    // 按日期升序排序
    dailyTrend.value = data.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  } finally {
    trendLoading.value = false;
  }
};

// 计算趋势图高度百分比
const getTrendHeight = (count: number) => {
  if (dailyTrend.value.length === 0) return 0;
  const maxCount = Math.max(...dailyTrend.value.map(item => item.selectionCount));
  if (maxCount === 0) return 0;
  return Math.round((count / maxCount) * 100);
};

// 格式化日期显示
const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return `${date.getMonth() + 1}/${date.getDate()}`;
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
  getDailyTrend();
});
</script>

<style scoped>
@import './Index.scss';
</style>
