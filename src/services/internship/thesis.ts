import { http } from '@/utils/http';

/**
 * 论文条目
 */
export interface ThesisItem {
  id: number;
  title: string;
  maxSelections: number;
  currentSelections: number;
  achievementTypes: string[];
}

/**
 * 论文选择排名
 */
export interface ThesisRanking {
  thesisId: number;
  thesisTitle: string;
  selectionCount: number;
  maxSelections: number;
}

/**
 * 论文 Service
 */
export const thesisService = {
  /**
   * 获取论文列表
   * @returns Promise<ThesisItem[]>
   */
  getList: (): Promise<ThesisItem[]> => {
    return http.get('/internship/thesis/list');
  },

  /**
   * 获取论文选择排名
   * @returns Promise<ThesisRanking[]>
   */
  getRanking: (): Promise<ThesisRanking[]> => {
    return http.get('/internship/statistics/thesis');
  }
};
