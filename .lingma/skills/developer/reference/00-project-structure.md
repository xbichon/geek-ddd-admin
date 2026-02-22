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
