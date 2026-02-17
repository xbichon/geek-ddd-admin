# 命名规范

## 文件命名

| 类型 | 规范 | 示例 |
|-----|------|------|
| API 文件 | 小写驼峰 | `advisor.ts`, `userManager.ts` |
| 组件文件 | 大驼峰 | `UserManager.vue` |
| 工具文件 | 小写驼峰 | `http.ts`, `download.ts` |
| 类型文件 | 小写驼峰 | `types.ts` |

## 变量命名

| 类型 | 规范 | 示例 |
|-----|------|------|
| API 对象 | 小写驼峰 + Api | `advisorApi`, `http` |
| 接口类型 | 大驼峰 + Item/Params | `ThesisItem`, `SelectionQuery` |
| 响应式数据 | 小写驼峰 | `loading`, `list`, `pagination` |
| 方法 | 小写驼峰 | `getList`, `handleSearch` |

## API 路径命名

- 全小写
- 使用连字符分隔
- 模块名 + 领域名 + 动作

```
/internship/advisor/list
/internship/thesis/create
/system/user/update
```

## 目录命名

- 全部小写
- 多个单词用连字符分隔
- 简短清晰

```
src/api/internship/
src/views/user-manager/
```
