import { http, type ApiResponse } from '@/utils/http';

export interface User {
  id: number;
  username: string;
  email: string;
  phone?: string;
  avatar?: string;
  status: 'ACTIVE' | 'INACTIVE' | 'BANNED';
  roles: Role[];
  createdAt: string;
  updatedAt: string;
}

export interface Role {
  id: number;
  name: string;
  code: string;
  description?: string;
}

export interface LoginRequest {
  username: string;
  password: string;
  captcha?: string;
}

export interface LoginResponse {
  token: string;
  refreshToken: string;
  user: User;
  expiresIn: number;
}

export interface UserListQuery {
  page?: number;
  size?: number;
  username?: string;
  email?: string;
  status?: string;
}

// 用户API服务
export class UserService {
  /**
   * 用户登录
   * @param loginData 登录数据
   * @returns Promise<ApiResponse<LoginResponse>>
   */
  static async login(loginData: LoginRequest): Promise<ApiResponse<LoginResponse>> {
    return http.post('/auth/login', loginData);
  }

  /**
   * 用户登出
   * @returns Promise<ApiResponse<void>>
   */
  static async logout(): Promise<ApiResponse<void>> {
    return http.post('/auth/logout');
  }

  /**
   * 获取当前用户信息
   * @returns Promise<ApiResponse<User>>
   */
  static async getCurrentUser(): Promise<ApiResponse<User>> {
    return http.get('/user/profile');
  }

  /**
   * 获取用户列表
   * @param query 查询参数
   * @returns Promise<ApiResponse<{list: User[], total: number}>>
   */
  static async getUserList(query: UserListQuery = {}): Promise<ApiResponse<{list: User[], total: number}>> {
    return http.get('/user/list', { params: query });
  }

  /**
   * 创建用户
   * @param userData 用户数据
   * @returns Promise<ApiResponse<User>>
   */
  static async createUser(userData: Partial<User>): Promise<ApiResponse<User>> {
    return http.post('/user', userData);
  }

  /**
   * 更新用户
   * @param id 用户ID
   * @param userData 用户数据
   * @returns Promise<ApiResponse<User>>
   */
  static async updateUser(id: number, userData: Partial<User>): Promise<ApiResponse<User>> {
    return http.put(`/user/${id}`, userData);
  }

  /**
   * 删除用户
   * @param id 用户ID
   * @returns Promise<ApiResponse<void>>
   */
  static async deleteUser(id: number): Promise<ApiResponse<void>> {
    return http.delete(`/user/${id}`);
  }

  /**
   * 重置用户密码
   * @param id 用户ID
   * @param newPassword 新密码
   * @returns Promise<ApiResponse<void>>
   */
  static async resetPassword(id: number, newPassword: string): Promise<ApiResponse<void>> {
    return http.post(`/user/${id}/reset-password`, { password: newPassword });
  }
}

// 导出用户API实例
export const userApi = {
  login: UserService.login,
  logout: UserService.logout,
  getCurrentUser: UserService.getCurrentUser,
  getUserList: UserService.getUserList,
  createUser: UserService.createUser,
  updateUser: UserService.updateUser,
  deleteUser: UserService.deleteUser,
  resetPassword: UserService.resetPassword
};