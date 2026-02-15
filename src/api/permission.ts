import { authHttp } from '@/utils/http';

// 权限API服务
export const permissionApi = {
  /**
   * 获取用户权限列表
   * @returns Promise<string[]>
   */
  getPermissions: (): Promise<string[]> => {
    return authHttp.get('/permission');
  }
};