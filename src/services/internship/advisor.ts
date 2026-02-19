import { http } from '@/utils/http';

/**
 * 指导老师 Service
 */
export const advisorService = {
  /**
   * 获取指导教师名单
   * @returns Promise<string[]>
   */
  getList: (): Promise<string[]> => {
    return http.get('/internship/advisor/list');
  }
};
