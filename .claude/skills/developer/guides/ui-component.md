# 组件开发详细规范

## Vue 单文件组件结构

```vue
<template>
  <!-- 模板 -->
</template>

<script setup lang="ts">
// 1. 类型导入
import type { SomeType } from '@/api/module';

// 2. 组合式函数/API 导入
import { ref, reactive, onMounted } from 'vue';
import { moduleApi } from '@/api/module';

// 3. 类型定义（组件特有）
interface LocalState {
  // ...
}

// 4. 响应式数据
const loading = ref(false);
const list = ref<SomeType[]>([]);

// 5. 方法
const fetchData = async () => {
  loading.value = true;
  try {
    list.value = await moduleApi.getList();
  } finally {
    loading.value = false;
  }
};

// 6. 生命周期
onMounted(() => {
  fetchData();
});
</script>

<style scoped>
/* 样式 */
</style>
```

## 组件命名

- 大驼峰命名（如 `UserManager.vue`）
- 与路由名称对应

## 导入顺序

1. 类型导入（`import type`）
2. Vue 组合式函数
3. API 导入
4. 组件特有类型定义
5. 响应式数据
6. 方法定义
7. 生命周期钩子

## Element Plus 使用

- 使用 `el-card` 包裹内容区域
- 使用 `el-table` 展示列表数据
- 使用 `el-form` + `el-form-item` 构建表单
- 使用 `el-pagination` 分页组件
- 使用 `v-loading` 指令显示加载状态
