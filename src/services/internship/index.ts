/**
 * 实习模块 Service 统一导出
 */

// Service 导出
export { advisorService } from './advisor';
export { classService } from './class';
export { thesisService } from './thesis';
export { selectionService } from './selection';
export { internService } from './intern';

// 类型导出
export type { ThesisItem } from './thesis';
export type { SelectionRecord, PaginationData, SelectionQuery } from './selection';
export type { InternItem, InternQuery, InternPaginationData } from './intern';
