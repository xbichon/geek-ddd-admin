# 页面开发规范

## 1、文件与组件命名

| 类型 | 命名规则 | 示例 |
|------|---------|------|
| 页面文件 | 目录小写，`Index.vue` 大写 | `views/user/Index.vue` |

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
