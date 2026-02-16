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
 * 论文 API
 */
export const thesisApi = {
  /**
   * 获取论文列表
   * @returns Promise<ThesisItem[]>
   */
  getList: (): Promise<ThesisItem[]> => {
    return http.get('/internship/thesis/list');
  }
};
