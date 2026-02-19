import { http } from '@/utils/http';

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
 * 分页数据
 */
export interface PaginationData {
  records: SelectionRecord[];
  total: number;
  pageNum: number;
  pageSize: number;
}

/**
 * 选题查询参数
 */
export interface SelectionQuery {
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
   * @returns Promise<PaginationData>
   */
  getList: (params: SelectionQuery = {}): Promise<PaginationData> => {
    return http.get('/internship/selection/list', { params });
  }
};
