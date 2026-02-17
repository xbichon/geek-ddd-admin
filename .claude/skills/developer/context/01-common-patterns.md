# 通用编码模式

## API 模块创建流程

1. 在 `src/api/` 下创建模块文件夹
2. 按领域创建接口文件（advisor.ts, student.ts 等）
3. 每个文件包含：类型定义 + API 对象
4. 创建 index.ts 统一嵌套导出
5. 使用时：`import { moduleApi } from '@/api/module'`

## Vue 组件创建流程

1. 在 `src/views/` 下创建模块文件夹
2. 创建 index.vue（页面入口）
3. 使用 script setup + TypeScript
4. 导入 API：`import { moduleApi } from '@/api/module'`
5. 使用 Element Plus 组件构建界面

## 标准方法命名

| 操作 | 方法名 | HTTP | 示例 |
|-----|--------|------|------|
| 获取列表 | getList | GET | `/module/list` |
| 获取分页 | getPage | GET | `/module/page` |
| 获取详情 | getDetail | GET | `/module/{id}` |
| 创建 | create | POST | `/module` |
| 更新 | update | PUT | `/module/{id}` |
| 删除 | delete | DELETE | `/module/{id}` |
