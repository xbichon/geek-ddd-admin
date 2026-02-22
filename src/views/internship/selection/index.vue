<template>
  <div class="internship-management">
    <!-- 筛选区域 -->
    <el-card shadow="never" class="filter-card">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="论文选题">
          <el-select v-model="searchForm.topic" placeholder="请选择论文选题" style="width: 160px;">
            <el-option v-for="thesis in thesisList" :key="thesis.id" :label="thesis.title" :value="thesis.id" />
          </el-select>
        </el-form-item>

        <!-- 指导老师筛选 -->
        <el-form-item label="指导老师">
          <el-select v-model="searchForm.advisor" placeholder="请选择指导老师" style="width: 140px;" clearable>
            <el-option v-for="advisor in advisorList" :key="advisor" :label="advisor" :value="advisor" />
          </el-select>
        </el-form-item>

        <!-- 班级筛选 -->
        <el-form-item label="班级">
          <el-select v-model="searchForm.className" placeholder="请选择班级" style="width: 140px;" clearable>
            <el-option v-for="className in classList" :key="className" :label="className" :value="className" />
          </el-select>
        </el-form-item>

        <el-form-item label="姓名">
          <el-input v-model="searchForm.name" placeholder="请输入姓名" style="width: 140px;" />
        </el-form-item>

        <el-form-item>
          <el-button @click="handleReset">重置</el-button>
          <el-button type="primary" @click="handleSearch">搜索</el-button>
        </el-form-item>

        <el-form-item>
          <el-button type="success" @click="downloadExcel">导出Excel</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 表格区域 -->
    <el-card shadow="never" class="table-card">
      <el-table :data="tableData" style="width: 100%" v-loading="loading" fit>
        <el-table-column prop="selectionId" label="ID" width="60" />
        <el-table-column prop="studentNumber" label="学号" min-width="120" />
        <el-table-column prop="studentName" label="姓名" min-width="80" />
        <el-table-column prop="className" label="班级" min-width="140" />
        <el-table-column prop="advisorName" label="指导老师" min-width="100" />
        <el-table-column prop="thesisTitle" label="论文选题" min-width="180" />

        <el-table-column prop="achievementType" label="成果形式" min-width="100">
          <template #default="scope">
            <el-tag type="primary">{{ scope.row.achievementType }}</el-tag>
          </template>
        </el-table-column>

        <el-table-column prop="selectionType" label="选题类型" min-width="100">
          <template #default="scope">
            <el-tag :type="getSelectionTypeTag(scope.row.selectionType)">
              {{ getSelectionTypeText(scope.row.selectionType) }}
            </el-tag>
          </template>
        </el-table-column>

        <el-table-column prop="groupMembers" label="小组成员" min-width="150" />
      </el-table>

      <!-- 分页 -->
      <div class="pagination-container">
        <el-pagination v-model:current-page="pagination.pageNum" v-model:page-size="pagination.pageSize"
          :page-sizes="[20, 50, 100]" :total="pagination.total" layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange" @current-change="handleCurrentChange" />
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import {
  advisorService,
  classService,
  thesisService,
  selectionService,
  type SelectionRecord,
  type ThesisItem,
  type PageData
} from '@/services/internship'
import { downloadExcel as downloadExcelUtil } from '@/utils/download'
import { ElMessage } from 'element-plus'

// 接口定义
interface SearchParams {
  topic: string | number
  name: string
  studentId: string
  advisor: string
  className: string
}

interface PaginationConfig {
  pageNum: number
  pageSize: number
  total: number
}

// 响应式数据
const loading = ref<boolean>(false)
const tableData = ref<SelectionRecord[]>([])
const thesisList = ref<ThesisItem[]>([])
const advisorList = ref<string[]>([])
const classList = ref<string[]>([])

// 表单数据
const searchForm = reactive<SearchParams>({
  topic: '',
  name: '',
  studentId: '',
  advisor: '',
  className: ''
})

// 分页配置
const pagination = reactive<PaginationConfig>({
  pageNum: 1,
  pageSize: 20,
  total: 0
})

// 工具方法
const getSelectionTypeTag = (type: string): 'success' | 'warning' => {
  return type === 'INDIVIDUAL' ? 'success' : 'warning'
}

const getSelectionTypeText = (type: string): string => {
  return type === 'INDIVIDUAL' ? '个人' : '小组'
}

// 数据获取方法
const getAdvisorNames = async (): Promise<void> => {
  try {
    const res = await advisorService.getList()
    advisorList.value = res
  } catch (error) {
    ElMessage.error('获取指导老师列表失败')
  }
}

const getClassNames = async (): Promise<void> => {
  try {
    const res = await classService.getList()
    classList.value = res
  } catch (error) {
    ElMessage.error('获取班级列表失败')
  }
}

const getThesisList = async (): Promise<void> => {
  try {
    const res = await thesisService.getList()
    thesisList.value = res
  } catch (error) {
    ElMessage.error('获取论文列表失败')
  }
}

const fetchData = async (): Promise<void> => {
  loading.value = true
  try {
    const params = {
      studentName: searchForm.name || undefined,
      advisorName: searchForm.advisor || undefined,
      className: searchForm.className || undefined,
      thesisId: searchForm.topic ? String(searchForm.topic) : undefined,
      pageNum: pagination.pageNum,
      pageSize: pagination.pageSize
    }

    const res = await selectionService.getList(params)
    const data: PageData<SelectionRecord> = res

    tableData.value = data.records
    pagination.total = data.total
    pagination.pageNum = data.pageNum
    pagination.pageSize = data.pageSize
  } catch (error) {
    ElMessage.error('获取数据失败')
  } finally {
    loading.value = false
  }
}

// 事件处理方法
const handleSearch = (): void => {
  pagination.pageNum = 1
  fetchData()
}

const handleReset = (): void => {
  Object.assign(searchForm, {
    topic: '',
    name: '',
    studentId: '',
    advisor: '',
    className: ''
  })
  pagination.pageNum = 1
  fetchData()
}

const handleSizeChange = (val: number): void => {
  pagination.pageSize = val
  pagination.pageNum = 1
  fetchData()
}

const handleCurrentChange = (val: number): void => {
  pagination.pageNum = val
  fetchData()
}

const downloadExcel = async (): Promise<void> => {
  try {
    loading.value = true
    await downloadExcelUtil('/internship/selection/excel', {}, '实习选题列表')
  } catch (error) {
    ElMessage.error('导出Excel失败')
  } finally {
    loading.value = false
  }
}

// 生命周期
onMounted(() => {
  Promise.all([
    getThesisList(),
    getAdvisorNames(),
    getClassNames()
  ]).then(() => {
    fetchData()
  })
})
</script>

<style scoped>
@import './Index.scss';
</style>