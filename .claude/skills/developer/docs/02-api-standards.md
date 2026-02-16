# API 编写规范

## TypeScript 规范

### 类型定义

- 接口使用 `interface` 而非 `type`（对象类型）
- 类型定义放在使用它的文件中
- 导出类型使用 `export interface`
- 可选属性使用 `?` 标记

## API 编写模板

```typescript
import { http } from '@/utils/http';

// 1. 先定义类型
export interface EntityItem {
  id: number;
  name: string;
  // ...
}

// 2. 再定义 API
export const entityApi = {
  /**
   * 获取列表
   * @returns Promise<EntityItem[]>
   */
  getList: (): Promise<EntityItem[]> => {
    return http.get('/module/entity/list');
  },

  /**
   * 获取详情
   * @param id 实体ID
   */
  getDetail: (id: number): Promise<EntityItem> => {
    return http.get(`/module/entity/${id}`);
  },

  /**
   * 创建
   * @param data 创建数据
   */
  create: (data: Partial<EntityItem>): Promise<void> => {
    return http.post('/module/entity', data);
  },

  /**
   * 更新
   * @param id 实体ID
   * @param data 更新数据
   */
  update: (id: number, data: Partial<EntityItem>): Promise<void> => {
    return http.put(`/module/entity/${id}`, data);
  },

  /**
   * 删除
   * @param id 实体ID
   */
  delete: (id: number): Promise<void> => {
    return http.delete(`/module/entity/${id}`);
  }
};
```

## 命名规范

| 类型 | 规范 | 示例 |
|-----|------|------|
| API 变量 | 小写驼峰 + Api | `advisorApi`, `thesisApi` |
| 接口类型 | 大驼峰 | `AdvisorItem`, `ThesisItem` |
| 方法名 | 小驼峰 | `getList`, `create`, `update`, `delete` |
| API 路径 | 全小写 + 连字符 | `/internship/advisor/list` |
