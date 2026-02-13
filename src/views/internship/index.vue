<template>
  <div class="internship-management">
    <!-- 筛选区域 -->
    <el-card shadow="never" class="filter-card">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="论文选题">
          <el-select v-model="searchForm.topic" placeholder="请选择论文选题" style="width: 160px;">
            <el-option 
              v-for="thesis in thesisList" 
              :key="thesis.id" 
              :label="thesis.title" 
              :value="thesis.id">
            </el-option>
          </el-select>
        </el-form-item>

        <!-- 新增指导老师下拉筛选 -->
        <el-form-item label="指导老师">
          <el-select v-model="searchForm.advisor" placeholder="请选择指导老师" style="width: 140px;" clearable>
            <el-option 
              v-for="advisor in advisorList" 
              :key="advisor" 
              :label="advisor" 
              :value="advisor">
            </el-option>
          </el-select>
        </el-form-item>

        <!-- 新增班级下拉筛选 -->
        <el-form-item label="班级">
          <el-select v-model="searchForm.className" placeholder="请选择班级" style="width: 140px;" clearable>
            <el-option 
              v-for="className in classList" 
              :key="className" 
              :label="className" 
              :value="className">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="姓名">
          <el-input v-model="searchForm.name" placeholder="请输入姓名" style="width: 140px;"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="default" @click="handleReset">重置</el-button>
          <el-button type="primary" @click="handleSearch">搜索</el-button>
        </el-form-item>

        <el-form-item>
          <el-button type="success">导出Excel</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 表格区域 -->
    <el-card shadow="never" class="table-card">
      <el-table :data="tableData" border style="width: 100%" v-loading="loading">
        <!-- <el-table-column type="selection" width="55"></el-table-column> -->
        <el-table-column prop="selectionId" label="ID" width="40"></el-table-column>
        <el-table-column prop="studentNumber" label="学号" width="140"></el-table-column>
        <el-table-column prop="studentName" label="姓名" width="80"></el-table-column>
        <el-table-column prop="className" label="班级" width="150"></el-table-column>
        <el-table-column prop="advisorName" label="指导老师" width="100"></el-table-column>
        <el-table-column prop="thesisTitle" label="论文选题" width="140"></el-table-column>
        <el-table-column prop="achievementType" label="成果形式" width="100">
          <template #default="scope">
            <el-tag type="primary">{{ scope.row.achievementType }}</el-tag>
          </template>
        </el-table-column>

        <el-table-column prop="selectionType" label="选题类型" width="100">
          <template #default="scope">
            <el-tag :type="scope.row.selectionType === 'INDIVIDUAL' ? 'success' : 'warning'">
              {{ scope.row.selectionType === 'INDIVIDUAL' ? '个人' : '小组' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="groupMembers" label="小组成员" min-width="150"></el-table-column>


      </el-table>

      <!-- 分页 -->
      <div class="pagination-container">
        <el-pagination v-model:current-page="pagination.pageNum" v-model:page-size="pagination.pageSize"
          :page-sizes="[10, 20, 50]" :total="pagination.total" layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange" @current-change="handleCurrentChange" />
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { http } from '@/utils/http'

// 定义数据接口
interface SelectionRecord {
  selectionId: number
  thesisId: number
  thesisTitle: string
  advisorName: string
  achievementType: string
  selectionType: string
  studentName: string
  studentNumber: string
  groupMembers: string
  className: string  // 新增班级名称字段
}

interface ThesisItem {
  id: number
  title: string
  maxSelections: number
  currentSelections: number
  achievementTypes: string[]
}

interface PaginationData {
  records: SelectionRecord[]
  total: number
  pageNum: number
  pageSize: number
  totalPages: number
}

// 加载状态
const loading = ref(false)

// 搜索表单数据 - 新增指导老师和班级字段
const searchForm = reactive({
  topic: '',
  name: '',
  studentId: '',
  advisor: '',  // 指导老师筛选
  className: '' // 班级筛选
})

// 表格数据
const tableData = ref<SelectionRecord[]>([])

// 论文列表数据
const thesisList = ref<ThesisItem[]>([])

// 指导老师列表数据
const advisorList = ref<string[]>([])

// 班级列表数据
const classList = ref<string[]>([])

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
    const res = await http.get('internship/thesis/selectionList', {
      params: {
        studentName: searchForm.name || undefined,
        advisorName: searchForm.advisor || undefined,
        className: searchForm.className || undefined,
        thesisId: searchForm.topic || undefined  // 使用论文ID作为筛选条件
      }
    })

    const data: PaginationData = res
    tableData.value = data.records
    pagination.total = data.total
    pagination.pageNum = data.pageNum
    pagination.pageSize = data.pageSize

  } catch (error) {
    console.error('获取数据失败:', error)
  } finally {
    loading.value = false
  }
}

// 搜索
const handleSearch = () => {
  pagination.pageNum = 1
  fetchData()
}

// 重置
const handleReset = () => {
  searchForm.topic = ''
  searchForm.name = ''
  searchForm.studentId = ''
  searchForm.advisor = ''   // 重置指导老师筛选
  searchForm.className = ''  // 重置班级筛选
  pagination.pageNum = 1
  fetchData()
}

// 分页大小变化
const handleSizeChange = (val: number) => {
  pagination.pageSize = val
  pagination.pageNum = 1
  fetchData()
}

// 页码变化
const handleCurrentChange = (val: number) => {
  pagination.pageNum = val
  fetchData()
}

// 获取论文列表数据
const fetchThesisList = async () => {
  try {
    const res = await http.get('internship/thesis/list')
    thesisList.value = res
  } catch (error) {
    console.error('获取论文列表失败:', error)
  }
}

// 获取指导老师列表数据
const fetchAdvisorList = async () => {
  try {
    const res = await http.get('internship/thesis/advisorNames')
    advisorList.value = res
  } catch (error) {
    console.error('获取指导老师列表失败:', error)
  }
}

// 获取班级列表数据
const fetchClassList = async () => {
  try {
    const res = await http.get('internship/thesis/classNames')
    classList.value = res
  } catch (error) {
    console.error('获取班级列表失败:', error)
  }
}

// 初始化加载数据
onMounted(() => {
  fetchThesisList() // 初始化时获取论文列表
  fetchAdvisorList() // 初始化时获取指导老师列表
  fetchClassList()   // 初始化时获取班级列表
  fetchData()
})
</script>

<style scoped>
.internship-management {
  padding: 20px;
}

.filter-card {
  margin-bottom: 20px;
}

.table-card {
  margin-top: 20px;
}

.pagination-container {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}
</style>