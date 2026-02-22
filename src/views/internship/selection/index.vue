<template>
  <div class="internship-management">
    <!-- 筛选区域 -->
    <el-card shadow="never" class="filter-card">
      <el-form :inline="true" :model="searchForm">
        <el-form-item label="论文选题">
          <el-select v-model="searchForm.topic" placeholder="请选择论文选题" clearable style="width: 160px;">
            <el-option v-for="thesis in thesisList" :key="thesis.id" :label="thesis.title" :value="thesis.id" />
          </el-select>
        </el-form-item>

        <!-- 指导老师筛选 -->
        <el-form-item label="指导老师">
          <el-select v-model="searchForm.advisor" placeholder="请选择指导老师" clearable style="width: 140px;">
            <el-option v-for="advisor in advisorList" :key="advisor" :label="advisor" :value="advisor" />
          </el-select>
        </el-form-item>

        <!-- 班级筛选 -->
        <el-form-item label="班级">
          <el-select v-model="searchForm.className" placeholder="请选择班级" clearable style="width: 140px;">
            <el-option v-for="className in classList" :key="className" :label="className" :value="className" />
          </el-select>
        </el-form-item>

        <el-form-item label="姓名">
          <el-input v-model="searchForm.name" placeholder="请输入姓名" clearable style="width: 140px;" />
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
          :page-sizes="[10,20, 50, 100]" :total="pagination.total" layout="total, sizes, prev, pager, next, jumper"
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
  type SelectionQuery,
  type ThesisItem
} from '@/services/internship'
import { downloadExcel as downloadExcelUtil } from '@/utils/download'
import { ElMessage } from 'element-plus'

// 状态管理
const loading = ref(false)
const initialSearchForm = { topic: '', name: '', advisor: '', className: '' }
const initialSearchParams: SelectionQuery = {
  studentName: undefined,
  advisorName: undefined,
  className: undefined,
  thesisId: undefined,
  pageNum: 1,
  pageSize: 10
}

// 三层数据结构
const searchForm = reactive({ ...initialSearchForm })     // 表单数据
const tableData = ref<SelectionRecord[]>([])              // 表格数据
const pagination = reactive({ pageNum: 1, pageSize: 10, total: 0 })
let searchParams: SelectionQuery = { ...initialSearchParams }  // 查询参数（非响应式）

// 下拉列表数据
const thesisList = ref<ThesisItem[]>([])
const advisorList = ref<string[]>([])
const classList = ref<string[]>([])

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

// 数据获取
const fetchData = async () => {
  loading.value = true
  try {
    const res = await selectionService.getList(searchParams)
    tableData.value = res.records
    pagination.total = res.total
  } finally {
    loading.value = false
  }
}

// 搜索处理：点击搜索才更新查询条件
const handleSearch = () => {
  searchParams = {
    studentName: searchForm.name || undefined,
    advisorName: searchForm.advisor || undefined,
    className: searchForm.className || undefined,
    thesisId: searchForm.topic ? String(searchForm.topic) : undefined,
    pageNum: 1,
    pageSize: pagination.pageSize
  }
  pagination.pageNum = 1
  fetchData()
}

// 重置处理
const handleReset = () => {
  Object.assign(searchForm, initialSearchForm)
  searchParams = { ...initialSearchParams }
  pagination.pageNum = 1
  fetchData()
}

// 分页处理
const handleSizeChange = (val: number) => {
  pagination.pageSize = val
  pagination.pageNum = 1
  searchParams = { ...searchParams, pageSize: val, pageNum: 1 }
  fetchData()
}

const handleCurrentChange = (val: number) => {
  pagination.pageNum = val
  searchParams = { ...searchParams, pageNum: val }
  fetchData()
}

const downloadExcel = async (): Promise<void> => {
  try {
    loading.value = true
    await downloadExcelUtil('/internship/selection/export', {}, '实习选题列表')
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