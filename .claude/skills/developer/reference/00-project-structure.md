# 项目架构

## 一、技术栈

- Vue 3 + TypeScript + Vite
- Element Plus UI 组件库
- Axios HTTP 请求
- Vue Router 路由管理

## 二、目录结构

```
src/
├── assets/                 # 静态资源（图片、字体等）
├── components/             # 公共组件
│   └── common/             # 通用组件（多个页面复用）
├── layouts/                # 布局组件
│   ├── Index.vue           # 主布局
│   └── components/         # 布局私有子组件
│       ├── Header.vue
│       └── Sidebar.vue
├── router/                 # 路由配置
├── services/               # API 服务层（按业务模块组织）
│   ├── xxx/                # 业务模块（如：security、internship）
│   │   ├── xxx.ts          # 具体服务文件
│   │   └── index.ts        # 模块统一导出（必需）
│   └── ...
├── styles/                 # 全局样式
│   ├── main.css            # 全局样式入口
│   └── variables.scss      # SCSS 变量
├── utils/                  # 工具函数
│   ├── http.ts             # HTTP 封装
│   └── download.ts         # 下载工具
├── views/                  # 页面视图
│   ├── home/               # 首页
│   ├── login/              # 登录页
│   ├── manager/            # 管理后台页面
│   │   ├── user/
│   │   └── department/
│   └── internship/         # 实习模块页面
│       └── index.vue
├── App.vue                 # 根组件
└── main.ts                 # 应用入口
```

## 三、关键设计模式

### 1. Service 模块规范

#### （1）设计原则

| 原则 | 说明 |
|------|------|
| 按领域拆分 | 一个业务模块一个目录（如 `internship/`、`security/`） |
| 独立导出 | 各服务扁平导出，不嵌套在父对象中 |
| 命名规范 | 文件名简洁，导出变量加 `Service` 后缀 |
| 类型就近 | 类型定义在服务文件内，不单独建 types.ts |

#### （2）目录结构

```
services/
└── internship/             # 业务模块
    ├── advisor.ts          # 服务文件
    ├── thesis.ts
    └── index.ts            # 统一导出（必需）
```

#### （3）代码示例

- **服务文件（advisor.ts）**

  ```ts
  import { http } from '@/utils/http';

  export const advisorService = {
    getList: (): Promise<string[]> => {
      return http.get('/internship/advisor/list');
    }
  };
  ```

- **统一入口（index.ts）**

  ```ts
  // 导出所有服务
  export { advisorService } from './advisor';
  export { classService } from './class';

  // 导出所有类型
  export type { ThesisItem } from './thesis';
  ```

- **页面使用**

  ```ts
  import { advisorService, type ThesisItem } from '@/services/internship';

  const list = await advisorService.getList();
  ```

### 2. HTTP 使用
- 后台 API 用 `http` 实例（VITE_ADMIN_API_URL）
- 认证 API 用 `authHttp` 实例（VITE_AUTH_API_URL）
- 已统一处理 401/403 错误

### 3. 环境变量
- 必须 `VITE_` 开头才能在客户端使用
- URL 不要末尾斜杠
