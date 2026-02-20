# Service 模块规范

## 1、设计原则

| 原则 | 说明 |
|------|------|
| 按领域拆分 | 一个业务模块一个目录（如 `internship/`、`security/`） |
| 独立导出 | 各服务扁平导出，不嵌套在父对象中 |
| 命名规范 | 文件名简洁，导出变量加 `Service` 后缀 |
| 类型就近 | 类型定义在服务文件内，不单独建 types.ts |

## 2、目录结构

```
services/
└── internship/             # 业务模块
    ├── advisor.ts          # 服务文件
    ├── thesis.ts
    └── index.ts            # 统一导出（必需）
```

## 3、代码示例

### (1) **服务文件（advisor.ts）**

```ts
import { http } from '@/utils/http';

export const advisorService = {
getList: (): Promise<string[]> => {
    return http.get('/internship/advisor/list');
}
};
```

### (2) **统一入口（index.ts）**

  ```ts
  // 导出所有服务
  export { advisorService } from './advisor';
  export { classService } from './class';

  // 导出所有类型
  export type { ThesisItem } from './thesis';
  ```

### (3) **页面使用**

  ```ts
  import { advisorService, type ThesisItem } from '@/services/internship';

  const list = await advisorService.getList();
  ```

## 4、HTTP 使用
- 后台 API 用 `http` 实例（VITE_ADMIN_API_URL）
- 认证 API 用 `authHttp` 实例（VITE_AUTH_API_URL）
- 已统一处理 401/403 错误
