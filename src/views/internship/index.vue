<template>
  <div class="internship-management">
    <!-- 筛选区域 -->
    <el-card shadow="never" class="filter-card">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="班级">
          <el-select v-model="searchForm.class" placeholder="请选择班级" style="width: 120px;">
            <el-option label="移动应用" value="移动应用"></el-option>
            <el-option label="计应三班" value="计应三班"></el-option>
          </el-select>
        </el-form-item>
        
        <el-form-item label="指导老师">
          <el-select v-model="searchForm.teacher" placeholder="请选择指导老师" style="width: 120px;">
            <el-option label="杜老师" value="杜老师"></el-option>
          </el-select>
        </el-form-item>
        
        <el-form-item label="论文选题">
          <el-select v-model="searchForm.topic" placeholder="请选择论文选题" style="width: 120px;">
            <el-option label="软件开发" value="软件开发"></el-option>
          </el-select>
        </el-form-item>
        
        <el-form-item label="姓名">
          <el-input v-model="searchForm.name" placeholder="请输入姓名" style="width: 120px;"></el-input>
        </el-form-item>
        
        <el-form-item label="学号">
          <el-input v-model="searchForm.studentId" placeholder="请输入学号" style="width: 120px;"></el-input>
        </el-form-item>
        
        <el-form-item>
          <el-button type="default">重置</el-button>
          <el-button type="primary">搜索</el-button>
        </el-form-item>
        
        <el-form-item>
          <el-button type="success">导出Excel</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    
    <!-- 表格区域 -->
    <el-card shadow="never" class="table-card">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column type="index" label="id" width="50"></el-table-column>
        <el-table-column prop="name" label="姓名" width="120"></el-table-column>
        <el-table-column prop="studentId" label="学号" width="150"></el-table-column>
        <el-table-column prop="class" label="班级" width="120"></el-table-column>
        <el-table-column prop="topic" label="论文选题" width="120"></el-table-column>
        <el-table-column prop="teamMember" label="小组成员" width="120">
          <template #default="scope">
            <el-tag v-if="scope.row.teamMember === '姚处'" type="success">{{ scope.row.teamMember }}</el-tag>
            <el-tag v-else-if="scope.row.teamMember === '标兵'" type="warning">{{ scope.row.teamMember }}</el-tag>
            <el-tag v-else type="info">{{ scope.row.teamMember }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="teacher" label="指导老师" width="120"></el-table-column>
        <el-table-column prop="resultForm" label="成果形式" width="120"></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 搜索表单数据
const searchForm = ref({
  class: '',
  teacher: '',
  topic: '',
  name: '',
  studentId: ''
})

// 表格数据
const tableData = ref([
  {
    name: '李博文',
    studentId: '2023233012',
    class: '计应三班',
    topic: '软件开发',
    teamMember: '姚处',
    teacher: '杜老师',
    resultForm: '作品'
  },
  {
    name: '孙兴宇',
    studentId: '2023233021',
    class: '计应三班',
    topic: '软件开发',
    teamMember: '标兵',
    teacher: '杜老师',
    resultForm: '作品'
  },
  {
    name: '李博文',
    studentId: '2023233012',
    class: '计应三班',
    topic: '软件开发',
    teamMember: '无',
    teacher: '杜老师',
    resultForm: '作品'
  },
  {
    name: '孙兴宇',
    studentId: '2023233021',
    class: '计应三班',
    topic: '软件开发',
    teamMember: '姚处',
    teacher: '杜老师',
    resultForm: '作品'
  },
  {
    name: '李博文',
    studentId: '2023233012',
    class: '计应三班',
    topic: '软件开发',
    teamMember: '标兵',
    teacher: '杜老师',
    resultForm: '作品'
  },
  {
    name: '孙兴宇',
    studentId: '2023233021',
    class: '计应三班',
    topic: '软件开发',
    teamMember: '无',
    teacher: '杜老师',
    resultForm: '作品'
  },
  {
    name: '李博文',
    studentId: '2023233012',
    class: '计应三班',
    topic: '软件开发',
    teamMember: '姚处',
    teacher: '杜老师',
    resultForm: '作品'
  },
  {
    name: '孙兴宇',
    studentId: '2023233021',
    class: '计应三班',
    topic: '软件开发',
    teamMember: '标兵',
    teacher: '杜老师',
    resultForm: '作品'
  }
])
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
</style>