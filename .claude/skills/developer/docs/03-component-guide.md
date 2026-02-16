# 组件开发规范

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
