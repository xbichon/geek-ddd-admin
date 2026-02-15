import { authHttp } from '@/utils/http';

// 验证码响应类型
export interface CaptchaResponse {
  key: string;
  data: string;
}

// 登录请求类型
export interface LoginRequest {
  userType: 'TEACHER';
  identifier: string;
  password: string;
  captchaKey: string;
  captcha: string;
}

// 登录响应类型
export interface LoginResponse {
  token: string;
  refreshToken: string;
  expiresIn: number;
  // 可以根据实际响应结构调整
}

// 认证API服务
export const authApi = {
  /**
   * 获取验证码
   * @returns Promise<CaptchaResponse>
   */
  getCaptcha: (): Promise<CaptchaResponse> => {
    return authHttp.get('/auth/captcha');
  },

  /**
   * 用户登录
   * @param loginData 登录数据
   * @returns Promise<LoginResponse>
   */
  login: (loginData: LoginRequest): Promise<LoginResponse> => {
    loginData.userType = 'TEACHER'; // 设置为教师登录
    return authHttp.post('/auth/login', loginData);
  },

  /**
   * 用户登出
   * @returns Promise<void>
   */
  logout: (): Promise<void> => {
    return authHttp.post('/auth/logout');
  }
};