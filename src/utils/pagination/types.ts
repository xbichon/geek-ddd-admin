/**
 * 基础分页查询参数
 */
export interface PageQuery {
  pageNum?: number;
  pageSize?: number;
}

/**
 * 通用分页响应结构
 * @template T 记录类型
 */
export interface PageData<T> {
  records: T[];
  total: number;
  pageNum: number;
  pageSize: number;
}
