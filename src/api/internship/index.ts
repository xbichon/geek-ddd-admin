/**
 * 实习模块 API 统一导出
 */

// 类型导出
export type { ThesisItem } from './thesis';
export type { SelectionRecord, PaginationData, SelectionQuery } from './selection';

// API 导出
import { advisorApi } from './advisor';
import { classApi } from './class';
import { thesisApi } from './thesis';
import { selectionApi } from './selection';

// 实习模块 API 统一入口
export const internshipApi = {
  advisor: advisorApi,
  class: classApi,
  thesis: thesisApi,
  selection: selectionApi
};
