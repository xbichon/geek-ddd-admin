<template>
  <div class="dashboard">
    <!-- 顶部统计卡片 -->
    <el-row :gutter="20" class="stats-row">
      <el-col :span="6">
        <el-card class="stat-card" shadow="hover">
          <div class="stat-content">
            <div class="stat-icon bg-blue">
              <el-icon size="24"><User /></el-icon>
            </div>
            <div class="stat-info">
              <div class="stat-number">1,234</div>
              <div class="stat-label">用户总数</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="stat-card" shadow="hover">
          <div class="stat-content">
            <div class="stat-icon bg-green">
              <el-icon size="24"><Document /></el-icon>
            </div>
            <div class="stat-info">
              <div class="stat-number">567</div>
              <div class="stat-label">文档数量</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="stat-card" shadow="hover">
          <div class="stat-content">
            <div class="stat-icon bg-orange">
              <el-icon size="24"><TrendCharts /></el-icon>
            </div>
            <div class="stat-info">
              <div class="stat-number">89%</div>
              <div class="stat-label">完成率</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="stat-card" shadow="hover">
          <div class="stat-content">
            <div class="stat-icon bg-red">
              <el-icon size="24"><Bell /></el-icon>
            </div>
            <div class="stat-info">
              <div class="stat-number">23</div>
              <div class="stat-label">待处理</div>
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
import { User, Document, TrendCharts, Bell, Plus, Upload, Download, Delete, Search } from '@element-plus/icons-vue'
</script>

<style scoped>
.dashboard {
  padding: 20px;
  background-color: #f0f2f5;
  min-height: calc(100vh - 120px);
}

.stats-row {
  margin-bottom: 20px;
}

.stat-card {
  border-radius: 8px;
  transition: all 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.stat-content {
  display: flex;
  align-items: center;
  gap: 16px;
}

.stat-icon {
  width: 50px;
  height: 50px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.bg-blue { background: linear-gradient(135deg, #1890ff, #40a9ff); }
.bg-green { background: linear-gradient(135deg, #52c41a, #73d13d); }
.bg-orange { background: linear-gradient(135deg, #fa8c16, #ffa940); }
.bg-red { background: linear-gradient(135deg, #f5222d, #ff4d4f); }

.stat-info {
  flex: 1;
}

.stat-number {
  font-size: 24px;
  font-weight: 600;
  color: #262626;
  margin-bottom: 4px;
}

.stat-label {
  font-size: 14px;
  color: #8c8c8c;
}

.content-row {
  margin-bottom: 20px;
}

.chart-card, .notice-card, .quick-card {
  border-radius: 8px;
}

.card-header {
  font-size: 16px;
  font-weight: 500;
  color: #262626;
}

.chart-placeholder {
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 20px;
}

.chart-grid {
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
  height: 240px;
  margin-bottom: 10px;
  border-bottom: 1px solid #f0f0f0;
  position: relative;
}

.chart-grid::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 1px;
  background: #f0f0f0;
}

.chart-bar {
  width: 30px;
  background: linear-gradient(to top, #1890ff, #40a9ff);
  border-radius: 4px 4px 0 0;
  transition: height 0.5s ease;
  box-shadow: 0 2px 8px rgba(24, 144, 255, 0.3);
}

.chart-x-axis {
  display: flex;
  justify-content: space-around;
  font-size: 12px;
  color: #8c8c8c;
}

.notice-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.notice-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border-radius: 6px;
  background-color: #fafafa;
  transition: all 0.3s ease;
}

.notice-item:hover {
  background-color: #f0f0f0;
  transform: translateX(4px);
}

.notice-text {
  font-size: 14px;
  color: #595959;
  flex: 1;
}

.quick-actions {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.quick-actions .el-button {
  border-radius: 6px;
  padding: 12px 20px;
}

@media (max-width: 768px) {
  .dashboard {
    padding: 12px;
  }
  
  .stat-content {
    flex-direction: column;
    text-align: center;
    gap: 8px;
  }
  
  .quick-actions {
    flex-direction: column;
  }
  
  .quick-actions .el-button {
    width: 100%;
  }
}
</style>