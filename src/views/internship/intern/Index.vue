<template>
  <div class="intern-management">
    <!-- 搜索区域 -->
    <el-card shadow="never" class="filter-card">
      <el-form :inline="true" :model="searchForm">
        <el-form-item label="学号">
          <el-input
            v-model="searchForm.studentNo"
            placeholder="请输入学号"
            clearable
            style="width: 160px"
          />
        </el-form-item>

        <el-form-item label="姓名">
          <el-input
            v-model="searchForm.studentName"
            placeholder="请输入姓名"
            clearable
            style="width: 140px"
          />
        </el-form-item>

        <el-form-item label="班级">
          <el-input
            v-model="searchForm.className"
            placeholder="请输入班级"
            clearable
            style="width: 140px"
          />
        </el-form-item>

        <el-form-item label="指导老师">
          <el-input
            v-model="searchForm.advisorName"
            placeholder="请输入指导老师"
            clearable
            style="width: 140px"
          />
        </el-form-item>

        <el-form-item label="选题状态">
          <el-select
            v-model="searchForm.selected"
            placeholder="请选择"
            clearable
            style="width: 120px"
          >
            <el-option label="已选题" :value="true" />
            <el-option label="未选题" :value="false" />
          </el-select>
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
        <el-table-column prop="studentNo" label="学号" min-width="120" />
        <el-table-column prop="name" label="姓名" width="100" />
        <el-table-column prop="className" label="班级" min-width="140" />
        <el-table-column prop="advisorName" label="指导老师" min-width="100" />
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
          :page-sizes="[10, 20, 50]"
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
import {
  internService,
  type InternItem,
  type InternQuery,
  type PageData
} from '@/services/internship'

// 加载状态
const loading = ref(false)

// 表单初始状态
const initialSearchForm = {
  studentNo: '',
  studentName: '',
  className: '',
  advisorName: '',
  selected: undefined as boolean | undefined
}

// 搜索表单数据（纯业务字段，不包含分页）
const searchForm = reactive({ ...initialSearchForm })

// 查询参数初始状态
const initialSearchParams: InternQuery = {
  studentNo: undefined,
  studentName: undefined,
  className: undefined,
  advisorName: undefined,
  selected: undefined,
  pageNum: 1,
  pageSize: 10
}

// 当前查询参数（用于分页和搜索）
let searchParams: InternQuery = { ...initialSearchParams }

// 表格数据
const tableData = ref<InternItem[]>([])

// 分页数据
const pagination = reactive({
  pageNum: 1,
  pageSize: 10,
  total: 0
})

// 获取列表数据
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

// 搜索
const handleSearch = () => {
  // 更新 searchParams 为当前表单值
  searchParams = {
    studentNo: searchForm.studentNo || undefined,
    studentName: searchForm.studentName || undefined,
    className: searchForm.className || undefined,
    advisorName: searchForm.advisorName || undefined,
    selected: searchForm.selected,
    pageNum: 1, // 重置页码
    pageSize: pagination.pageSize
  }

  // 重新获取数据（fetchData会自动更新分页信息）
  fetchData()
}

// 重置
const handleReset = () => {
  // 重置表单
  Object.assign(searchForm, initialSearchForm)
  
  // 重置搜索参数
  searchParams = { ...initialSearchParams }
  
  fetchData()
}

// 分页大小变化
const handleSizeChange = (val: number) => {
  pagination.pageSize = val
  pagination.pageNum = 1
  searchParams = { ...searchParams, pageSize: val, pageNum: 1 }
  fetchData()
}

// 页码变化
const handleCurrentChange = (val: number) => {
  pagination.pageNum = val
  searchParams = { ...searchParams, pageNum: val }
  fetchData()
}

// 初始化加载数据
onMounted(() => {
  fetchData()
})
</script>

<style scoped>
@import './Index.scss';
</style>
