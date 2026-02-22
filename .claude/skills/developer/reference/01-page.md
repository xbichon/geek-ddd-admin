# 页面开发规范

## 1. 项目文件结构规范

### 1.1 页面文件组织

**要求**：创建页面时，必须创建父级目录，目录内放置 `Index.vue`，禁止直接创建 `user.vue` 等命名方式。

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

### 1.2 样式文件组织

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

## 2. 页面代码编写规范

### 2.1 函数命名规范（camelCase）

| 场景 | 前缀 | 示例 |
|------|------|------|
| 事件处理 | `handle` | `handleSubmit`、`handleUserSelect` |
| 获取数据 | `get` / `fetch` | `getList`、`fetchData` |
| 创建/更新/删除 | `create` / `update` / `remove` | `createTab`、`removeItem` |
| 切换状态 | `toggle` / `set` | `toggleMenu`、`setActive` |

**禁止**：`snake_case`（如 `menu_click`）

### 2.2 响应式变量命名规范

| 类型 | 命名规则 | 示例 |
|------|---------|------|
| Ref 基本类型 | 名词/形容词 | `isLoading`、`userName` |
| Ref 对象 | 名词 | `formData`、`userInfo` |
| Ref 数组 | 复数名词 | `tabs`、`userList` |
| Computed | 名词或 `is`/`has` 前缀 | `displayName`、`isValid` |

### 2.3 代码组织顺序

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

## 3. 样式编写规范

### 3.1 命名规则

| 项目 | 规则 | 示例 |
|------|------|------|
| 类名 | kebab-case | `.user-form`、`.main-content` |
| SCSS 变量 | $kebab-case | `$primary-color` |
| 文件命名 | 与 Vue 文件同名 | `Index.vue` → `Index.scss` |

### 3.2 样式编写原则

- 必须使用 `<style scoped>` 避免全局污染
- 避免使用深层选择器 `:deep()`，必要时通过 props 或事件传递
- 颜色、尺寸等值优先使用 CSS 变量或 SCSS 变量