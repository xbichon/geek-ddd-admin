import { fetchPage } from '@/utils/pagination';
import type { PageData, PageQuery } from '@/utils/pagination';

/**
 * 选题记录
 */
export interface SelectionRecord {
  selectionId: number;
  thesisId: number;
  thesisTitle: string;
  advisorName: string;
  achievementType: string;
  selectionType: string;
  studentName: string;
  studentNumber: string;
  groupMembers: string;
  className: string;
}


/**
 * 选题查询参数
 */
export interface SelectionQuery extends PageQuery {
  studentName?: string;
  advisorName?: string;
  className?: string;
  thesisId?: number | string;
}

/**
 * 选题 Service
 */
export const selectionService = {
  /**
   * 获取选题列表（带搜索条件）
   * @param params 搜索参数
   * @returns Promise<PageData<SelectionRecord>>
   */
  getList: (params: SelectionQuery = {}): Promise<PageData<SelectionRecord>> =>
    fetchPage<SelectionRecord, SelectionQuery>('/internship/selection/list', params)
};
