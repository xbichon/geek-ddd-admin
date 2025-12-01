import { http } from '@/utils/http';

// 菜单相关接口类型定义
export interface MenuTreeResponse {
  code: number;
  message: string;
  data: MenuItem[];
}

export interface MenuItem {
  id: number;
  name: string;
  path: string;
  icon: string | null;
  parentId: number | null;
  level: number;
  type: 'DIRECTORY' | 'MENU';
  children: MenuItem[];
}

// 菜单API服务
export const menuApi = {
  /**
   * 获取菜单树
   * @returns Promise<MenuTreeResponse>
   */
  getMenuTree: (): Promise<MenuTreeResponse> => {
    return http.get('/manager/menu/tree');
  },

  /**
   * 根据用户ID获取菜单权限
   * @param userId 用户ID
   * @returns Promise<MenuTreeResponse>
   */
  getUserMenus: (userId: number): Promise<MenuTreeResponse> => {
    return http.get(`/manager/menu/user/${userId}`);
  },

  /**
   * 创建菜单
   * @param menuData 菜单数据
   * @returns Promise<any>
   */
  createMenu: (menuData: Partial<MenuItem>): Promise<any> => {
    return http.post('/manager/menu', menuData);
  },

  /**
   * 更新菜单
   * @param id 菜单ID
   * @param menuData 菜单数据
   * @returns Promise<any>
   */
  updateMenu: (id: number, menuData: Partial<MenuItem>): Promise<any> => {
    return http.put(`/manager/menu/${id}`, menuData);
  },

  /**
   * 删除菜单
   * @param id 菜单ID
   * @returns Promise<any>
   */
  deleteMenu: (id: number): Promise<any> => {
    return http.delete(`/manager/menu/${id}`);
  }
};