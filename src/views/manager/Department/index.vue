<template>
  <div class="department-container">
    <!-- 页面标题 -->
    <div class="page-header">
      <h2 class="page-title">
        <el-icon class="title-icon"><OfficeBuilding /></el-icon>
        部门管理
      </h2>
      <p class="page-subtitle">该功能正在紧张开发中...</p>
    </div>

    <!-- 开发状态卡片 -->
    <div class="status-card">
      <div class="construction-animation">
        <div class="hammer">🔨</div>
        <div class="wrench">🔧</div>
      </div>
      
      <div class="status-content">
        <el-alert
          title="功能建设中"
          type="warning"
          description="部门管理模块正在开发中，敬请期待！"
          show-icon
          :closable="false"
        />
        
      </div>
    </div>

    <!-- 功能预告 -->
    <div class="feature-preview">
      <h3 class="preview-title">即将支持的功能</h3>
      <div class="feature-list">
        <el-card v-for="feature in features" :key="feature.id" class="feature-card" shadow="hover">
          <div class="feature-content">
            <el-icon class="feature-icon" :color="feature.color">
              <component :is="feature.icon" />
            </el-icon>
            <div class="feature-text">
              <h4>{{ feature.title }}</h4>
              <p>{{ feature.description }}</p>
            </div>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { OfficeBuilding, User, List, Search, Edit } from '@element-plus/icons-vue'

// 功能预告数据
const features = ref([
  {
    id: 1,
    title: '部门列表',
    description: '查看所有部门信息，支持分页和搜索',
    icon: 'List',
    color: '#409EFF'
  },
  {
    id: 2,
    title: '部门管理',
    description: '新增、编辑、删除部门信息',
    icon: 'Edit',
    color: '#67C23A'
  },
  {
    id: 3,
    title: '人员管理',
    description: '管理部门成员，分配角色权限',
    icon: 'User',
    color: '#E6A23C'
  },
  {
    id: 4,
    title: '智能搜索',
    description: '快速查找部门和人员信息',
    icon: 'Search',
    color: '#F56C6C'
  }
])
</script>

<style lang="scss" scoped>
.department-container {
  padding: 20px;
  min-height: 100%;
  
  .page-header {
    text-align: center;
    margin-bottom: 30px;
    
    .page-title {
      font-size: 28px;
      color: #303133;
      margin-bottom: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
      
      .title-icon {
        font-size: 32px;
        color: #409EFF;
      }
    }
    
    .page-subtitle {
      font-size: 16px;
      color: #909399;
      margin: 0;
    }
  }
  
  .status-card {
    max-width: 600px;
    margin: 0 auto 40px;
    background: linear-gradient(135deg, #fff 0%, #f8f9fa 100%);
    border-radius: 12px;
    padding: 30px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    position: relative;
    overflow: hidden;
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: linear-gradient(90deg, #409EFF, #67C23A, #E6A23C, #F56C6C);
      animation: gradientMove 3s ease-in-out infinite;
    }
    
    .construction-animation {
      display: flex;
      justify-content: center;
      gap: 20px;
      margin-bottom: 25px;
      
      .hammer, .wrench {
        font-size: 36px;
        animation: construction 1.5s ease-in-out infinite alternate;
        
        &:nth-child(2) {
          animation-delay: 0.3s;
        }
      }
    }
    
    .status-content {
      .progress-info {
        margin-top: 25px;
        
        .progress-item {
          display: flex;
          align-items: center;
          gap: 15px;
          margin-bottom: 15px;
          
          .label {
            font-weight: 500;
            color: #606266;
            min-width: 80px;
          }
        }
      }
    }
  }
  
  .feature-preview {
    .preview-title {
      text-align: center;
      font-size: 22px;
      color: #303133;
      margin-bottom: 25px;
    }
    
    .feature-list {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 20px;
      max-width: 1200px;
      margin: 0 auto;
      
      .feature-card {
        transition: transform 0.3s ease, box-shadow 0.3s ease;
        
        &:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
        }
        
        .feature-content {
          display: flex;
          align-items: flex-start;
          gap: 15px;
          
          .feature-icon {
            font-size: 28px;
            min-width: 28px;
            margin-top: 3px;
          }
          
          .feature-text {
            flex: 1;
            
            h4 {
              margin: 0 0 8px 0;
              font-size: 16px;
              color: #303133;
            }
            
            p {
              margin: 0;
              font-size: 14px;
              color: #909399;
              line-height: 1.5;
            }
          }
        }
      }
    }
  }
}

// 动画定义
@keyframes construction {
  0% {
    transform: rotate(-10deg) translateY(0);
  }
  100% {
    transform: rotate(10deg) translateY(-10px);
  }
}

@keyframes gradientMove {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

// 响应式设计
@media (max-width: 768px) {
  .department-container {
    padding: 15px;
    
    .page-header {
      .page-title {
        font-size: 24px;
        
        .title-icon {
          font-size: 28px;
        }
      }
    }
    
    .status-card {
      padding: 20px;
      
      .construction-animation {
        .hammer, .wrench {
          font-size: 28px;
        }
      }
    }
    
    .feature-list {
      grid-template-columns: 1fr;
    }
  }
}
</style>