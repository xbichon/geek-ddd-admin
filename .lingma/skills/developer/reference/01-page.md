# 页面开发规范

## 1、文件与组件命名

| 类型 | 命名规则 | 示例 |
|------|---------|------|
| 页面文件 | 目录小写，`Index.vue` 大写 | `views/user/Index.vue` |

**必须要求**：创建页面时，必须创建父级目录，目录内放置 `Index.vue`，禁止直接创建 `user.vue` 等命名方式。

```
正确：
views/user/
└── Index.vue

正确：
views/manager/user/
└── Index.vue

禁止：
views/User.vue
views/user.vue
```

## 2、函数命名（camelCase）

| 场景 | 前缀 | 示例 |
|------|------|------|
| 事件处理 | `handle` | `handleSubmit`、`handleUserSelect` |
| 获取数据 | `get` / `fetch` | `getList`、`fetchData` |
| 创建/更新/删除 | `create` / `update` / `remove` | `createTab`、`removeItem` |
| 切换状态 | `toggle` / `set` | `toggleMenu`、`setActive` |

**禁止**：`snake_case`（如 `menu_click`）

## 3、响应式变量命名

| 类型 | 命名规则 | 示例 |
|------|---------|------|
| Ref 基本类型 | 名词/形容词 | `isLoading`、`userName` |
| Ref 对象 | 名词 | `formData`、`userInfo` |
| Ref 数组 | 复数名词 | `tabs`、`userList` |
| Computed | 名词或 `is`/`has` 前缀 | `displayName`、`isValid` |

## 4、代码组织顺序

```vue
<script setup>
// 1. 导入
import { ref, computed } from 'vue'

// 2. 类型定义
interface Props { ... }
interface FormData { ... }

// 3. Props / Emits
const props = defineProps<Props>()
const emit = defineEmits<...>()

// 4. 响应式数据
const form = ref<FormData>({...})
const loading = ref(false)

// 5. Computed
const isValid = computed(() => ...)

// 6. 方法
const handleSubmit = () => { ... }

// 7. 生命周期
onMounted(() => { ... })
</script>
```

## 5、样式规范

### （1）文件组织

**所有样式必须分离到同名 SCSS 文件**，Vue 文件中只保留 `@import`：

```
views/user/
├── Index.vue          # 逻辑代码
└── Index.scss         # 样式代码（同名）
```

```vue
<!-- Index.vue -->
<style scoped>
@import './Index.scss';
</style>
```

### （2）命名规则

| 项目 | 规则 | 示例 |
|------|------|------|
| 类名 | kebab-case | `.user-form`、`.main-content` |
| SCSS 变量 | $kebab-case | `$primary-color` |
| 文件命名 | 与 Vue 文件同名 | `Index.vue` → `Index.scss` |

### （3）样式编写原则

- 必须使用 `<style scoped>` 避免全局污染
- 避免使用深层选择器 `:deep()`，必要时通过 props 或事件传递
- 颜色、尺寸等值优先使用 CSS 变量或 SCSS 变量

## 6、分页表格规范

### （1）分页参数

所有分页表格统一使用以下参数名：

| 参数 | 类型 | 说明 |
|------|------|------|
| `pageNum` | number | 当前页码，从 1 开始 |
| `pageSize` | number | 每页条数 |


```ts
// 正确
const searchForm = reactive({
  // 业务筛选字段（可选）
  studentName: '',
  className: '',
  // 分页参数（必需）
  pageNum: 1,
  pageSize: 10
})
```

### （2）分页事件

| 事件 | 函数命名 |
|------|---------|
| 页码变化 | `handleCurrentChange` |
| 每页条数变化 | `handleSizeChange` |

### （3）表格列宽

| 场景 | 属性 | 说明 |
|------|------|------|
| 固定宽度 | `width` | 内容长度固定的列（如 ID、状态标签） |
| 自适应宽度 | `min-width` | 内容长度变化的列（如姓名、班级） |

表格需添加 `fit` 属性让列宽自适应容器。

```vue
<el-table :data="tableData" fit>
  <el-table-column prop="id" label="ID" width="60" />
  <el-table-column prop="name" label="姓名" min-width="100" />
</el-table>
```
