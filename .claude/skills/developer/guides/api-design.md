# API 设计详细规范

## 文件模板

```typescript
import { http } from '@/utils/http';

/**
 * 实体描述
 */
export interface EntityItem {
  id: number;
  // ... 其他字段
}

/**
 * 查询参数
 */
export interface EntityQuery {
  name?: string;
  // ... 其他可选参数
}

/**
 * 分页数据
 */
export interface EntityPagination {
  records: EntityItem[];
  total: number;
  pageNum: number;
  pageSize: number;
}

/**
 * 实体 API
 */
export const entityApi = {
  /**
   * 获取列表
   */
  getList: (): Promise<EntityItem[]> => {
    return http.get('/module/entity/list');
  },

  /**
   * 获取分页列表
   */
  getPage: (params: EntityQuery): Promise<EntityPagination> => {
    return http.get('/module/entity/page', { params });
  },

  /**
   * 获取详情
   */
  getDetail: (id: number): Promise<EntityItem> => {
    return http.get(`/module/entity/${id}`);
  },

  /**
   * 创建
   */
  create: (data: Partial<EntityItem>): Promise<void> => {
    return http.post('/module/entity', data);
  },

  /**
   * 更新
   */
  update: (id: number, data: Partial<EntityItem>): Promise<void> => {
    return http.put(`/module/entity/${id}`, data);
  },

  /**
   * 删除
   */
  delete: (id: number): Promise<void> => {
    return http.delete(`/module/entity/${id}`);
  }
};
```

## TypeScript 规范

- 接口使用 `interface` 而非 `type`（对象类型）
- 类型定义放在使用它的文件中
- 导出类型使用 `export interface`
- 可选属性使用 `?` 标记

## 命名规则

| 类型 | 命名 | 示例 |
|-----|------|------|
| API 对象 | xxxApi | `studentApi`, `teacherApi` |
| 实体类型 | XxxItem | `StudentItem`, `TeacherItem` |
| 查询参数 | XxxQuery | `StudentQuery` |
| 分页数据 | XxxPagination | `StudentPagination` |
| 方法名 | 小驼峰 | `getList`, `create`, `update`, `delete` |
| API 路径 | 全小写 + 连字符 | `/internship/advisor/list` |

## 模块组织示例

```typescript
// index.ts
export const internshipApi = {
  advisor: advisorApi,
  class: classApi,
  thesis: thesisApi,
  selection: selectionApi
};
```
