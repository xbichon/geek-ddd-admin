# 项目结构全景

## 技术栈

- Vue 3 + TypeScript + Vite
- Element Plus UI 组件库
- Axios HTTP 请求
- Vue Router 路由管理

## 目录结构

```
src/
├── api/                    # API 接口层
│   ├── internship/         # 按业务模块组织
│   │   ├── index.ts        # 模块统一导出
│   │   └── xxx.ts          # 具体业务接口文件
│   └── xxx.ts              # 简单业务直接放根目录
├── assets/                 # 静态资源（图片、字体等）
├── components/             # 公共组件
│   └── common/             # 通用组件（多个页面复用）
├── layouts/                # 布局组件
│   └── Main/               # 主布局示例
│       ├── Index.vue
│       └── components/     # 布局私有子组件
├── router/                 # 路由配置
├── services/               # 业务服务层（复杂逻辑抽离）
│   └── menu/               # 示例：菜单服务
│       ├── data.ts         # 类型定义 + 配置数据
│       └── index.ts        # 服务入口
├── styles/                 # 全局样式
│   ├── main.css            # 全局样式入口
│   └── variables.scss      # SCSS 变量
├── utils/                  # 工具函数
│   └── http.ts             # HTTP 封装
└── views/                  # 页面视图
    └── xxx/                # 按业务模块组织
        └── index.vue
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
