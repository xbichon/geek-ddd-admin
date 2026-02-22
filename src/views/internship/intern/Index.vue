<template>
  <div class="intern-management">
    <!-- 搜索区域 -->
    <el-card shadow="never" class="filter-card">
      <el-form :inline="true" :model="searchForm">
        <el-form-item label="姓名">
          <el-input v-model="searchForm.studentName" placeholder="请输入姓名" clearable style="width: 140px" />
        </el-form-item>
        <el-form-item label="学号">
          <el-input v-model="searchForm.studentNo" placeholder="请输入学号" clearable style="width: 140px" />
        </el-form-item>
        <el-form-item label="班级">
          <el-input v-model="searchForm.className" placeholder="请输入班级" clearable style="width: 140px" />
        </el-form-item>
        <el-form-item label="指导老师">
          <el-input v-model="searchForm.advisorName" placeholder="请输入指导老师" clearable style="width: 140px" />
        </el-form-item>
        <el-form-item>
          <el-button @click="handleReset">重置</el-button>
          <el-button type="primary" @click="handleSearch">搜索</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 表格区域 -->
    <el-card shadow="never" class="table-card">
      <el-table :data="tableData" style="width: 100%" v-loading="loading" fit>
        <el-table-column prop="id" label="ID" width="60" />
        <el-table-column prop="name" label="姓名" min-width="100" />
        <el-table-column prop="studentNo" label="学号" min-width="120" />
        <el-table-column prop="className" label="班级" min-width="140" />
        <el-table-column prop="advisorName" label="指导老师" min-width="120" />
        <el-table-column prop="selected" label="选题状态" width="90">
          <template #default="scope">
            <el-tag :type="scope.row.selected ? 'success' : 'info'">
              {{ scope.row.selected ? '已选题' : '未选题' }}
            </el-tag>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <div class="pagination-container">
        <el-pagination
          v-model:current-page="pagination.pageNum"
          v-model:page-size="pagination.pageSize"
          :page-sizes="[20, 50,100]"
          :total="pagination.total"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { internService, type InternItem, type InternQuery } from '@/services/internship'

// 状态管理
const loading = ref(false)
const initialSearchForm = { studentName: '', studentNo: '', className: '', advisorName: '' }
const initialSearchParams: InternQuery = { 
  studentName: undefined, 
  studentNo: undefined,
  className: undefined, 
  advisorName: undefined,
  pageNum: 1, 
  pageSize: 20 
}

const searchForm = reactive({ ...initialSearchForm })
const tableData = ref<InternItem[]>([])
const pagination = reactive({ pageNum: 1, pageSize: 20, total: 0 })
let searchParams: InternQuery = { ...initialSearchParams }

// 数据获取
const fetchData = async () => {
  loading.value = true
  try {
    const res = await internService.getList(searchParams)
    tableData.value = res.records
    pagination.total = res.total
    pagination.pageNum = res.pageNum
    pagination.pageSize = res.pageSize
  } finally {
    loading.value = false
  }
}

// 搜索处理
const handleSearch = () => {
  searchParams = {
    studentName: searchForm.studentName || undefined,
    studentNo: searchForm.studentNo || undefined,
    className: searchForm.className || undefined,
    advisorName: searchForm.advisorName || undefined,
    pageNum: 1,
    pageSize: pagination.pageSize
  }
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

onMounted(() => fetchData())
</script>

<style scoped>
@import './Index.scss';
</style>