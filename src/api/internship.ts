import { http } from '@/utils/http';

// 论文选题相关接口类型定义
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

export interface ThesisItem {
  id: number;
  title: string;
  maxSelections: number;
  currentSelections: number;
  achievementTypes: string[];
}

export interface PaginationData {
  records: SelectionRecord[];
  total: number;
  pageNum: number;
  pageSize: number;
  totalPages: number;
}

export interface SelectionQuery {
  studentName?: string;
  advisorName?: string;
  className?: string;
  thesisId?: number | string;

}

// 实习API服务
export const internshipApi = {
  /**
   * 获取指导教师名单
   * @returns Promise<string[]>
   */
  getAdvisorNames: (): Promise<string[]> => {
    return http.get('internship/thesis/advisorNames');
  },

  /**
   * 获取班级名称列表
   * @returns Promise<string[]>
   */
  getClassNames: (): Promise<string[]> => {
    return http.get('internship/thesis/classNames');
  },

  /**
   * 获取论文列表
   * @returns Promise<ThesisItem[]>
   */
  getThesisList: (): Promise<ThesisItem[]> => {
    return http.get('internship/thesis/list');
  },

  /**
   * 获取选题列表（带搜索条件）
   * @param params 搜索参数
   * @returns Promise<PaginationData>
   */
  getSelectionList: (params: SelectionQuery = {}): Promise<PaginationData> => {
    return http.get('internship/thesis/selectionList', { params });
  }
};