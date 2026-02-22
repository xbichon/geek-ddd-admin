/**
 * 实习模块 Service 统一导出
 */

import type { PageData, PageQuery } from '@/utils/pagination';
export type { PageData, PageQuery };

// Service 导出
export { advisorService } from './advisor';
export { classService } from './class';
export { thesisService } from './thesis';
export { selectionService } from './selection';
export { internService } from './intern';

// 类型导出
export type { ThesisItem } from './thesis';
export type { SelectionRecord, SelectionQuery } from './selection';
export type { InternItem, InternQuery } from './intern';
