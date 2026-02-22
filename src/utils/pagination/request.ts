import { http } from '@/utils/http';
import type { PageData, PageQuery } from './types';

/**
 * 分页 GET 查询
 * @template T 记录类型
 * @template Q 查询参数类型
 * @param url API 地址
 * @param query 查询参数（含分页参数 pageNum、pageSize）
 * @returns Promise<PageData<T>>
 *
 * @example
 * // Service 中直接使用
 * export const internService = {
 *   getList: (query: InternQuery): Promise<PageData<InternItem>> =>
 *     fetchPage<InternItem, InternQuery>('/internship/intern/list', query)
 * };
 */
export function fetchPage<T, Q extends PageQuery = PageQuery>(url: string, query?: Q): Promise<PageData<T>> {
  return http.get(url, { params: query });
}
