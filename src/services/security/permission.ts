import { authHttp } from '@/utils/http';

// 权限 Service
export const permissionService = {
  /**
   * 获取用户权限列表
   * @returns Promise<string[]>
   */
  getPermissions: (): Promise<string[]> => {
    return authHttp.get('/permission/getCurrent');
  }
};
