# 项目结构全景

## 技术栈

- Vue 3 + TypeScript + Vite
- Element Plus UI 组件库
- Axios HTTP 请求
- Vue Router 路由管理

## 目录结构

```
src/
├── api/                    # API 接口层（按模块组织）
│   ├── internship/         # 实习模块示例
│   │   ├── index.ts        # 统一导出：internshipApi
│   │   ├── advisor.ts      # 指导老师接口
├── components/             # 公共组件
│   └── common/             # 通用组件
├── router/                 # 路由配置
│   └── index.ts
├── utils/                  # 工具函数
│   ├── http.ts             # HTTP 封装（已封装 http/authHttp）
└── views/                  # 页面视图
    ├── internship/         # 实习管理页面
    ├── login/              # 登录页
    ├── manager/            # 管理后台
    └── home/               # 首页
```

## 关键设计模式

### API 模块设计
- 按领域拆分文件（不要所有接口放一个文件）
- 类型就近定义（不要集中 types.ts）
- index.ts 分类嵌套导出
- 使用方式：`internshipApi.advisor.getList()`

### HTTP 使用
- 后台 API 用 `http` 实例（VITE_ADMIN_API_URL）
- 认证 API 用 `authHttp` 实例（VITE_AUTH_API_URL）
- 已统一处理 401/403 错误

### 环境变量
- 必须 `VITE_` 开头才能在客户端使用
- URL 不要末尾斜杠
