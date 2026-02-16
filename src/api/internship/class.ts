import { http } from '@/utils/http';

/**
 * 班级 API
 */
export const classApi = {
  /**
   * 获取班级名称列表
   * @returns Promise<string[]>
   */
  getList: (): Promise<string[]> => {
    return http.get('/internship/class/list');
  }
};
