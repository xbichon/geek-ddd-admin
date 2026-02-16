# 项目架构

## 技术栈

- Vue 3 + TypeScript + Vite
- Element Plus UI 组件库
- Axios HTTP 请求

## 目录结构

```
src/
├── api/              # API 接口层
│   └── [module]/     # 按模块组织
│       ├── index.ts  # 统一导出
│       ├── types.ts  # 类型定义（仅共享类型）
│       └── [domain].ts # 领域接口文件
├── components/       # 公共组件
├── router/           # 路由配置
├── utils/            # 工具函数
│   ├── http.ts       # HTTP 封装
│   └── env.ts        # 环境变量
└── views/            # 页面视图
    └── [module]/     # 按模块组织
```

## API 模块设计规范

### 1. 按领域拆分文件

每个领域独立文件：
- `advisor.ts` - 指导老师相关
- `class.ts` - 班级相关
- `thesis.ts` - 论文相关
- `selection.ts` - 选题相关

### 2. 类型就近定义

类型定义在使用它的文件中，只有真正需要共享的类型才放 `types.ts`。

### 3. 统一入口导出

`index.ts` 分类嵌套导出：

```typescript
export const internshipApi = {
  advisor: advisorApi,
  class: classApi,
  thesis: thesisApi,
  selection: selectionApi
};
```

### 4. 使用方式

```typescript
import { internshipApi, type ThesisItem } from '@/api/internship';

// 分类调用
internshipApi.advisor.getList();
internshipApi.thesis.getList();
```
