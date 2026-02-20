import axios from 'axios';
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { ElMessage, ElMessageBox } from 'element-plus';
import router from '@/router';

export class HttpService {
  private instance: AxiosInstance;

  constructor(baseURL: string) {
    this.instance = axios.create({
      baseURL,
      timeout: 10000,
    });

    this.setupInterceptors();
  }

  setupInterceptors() {
    // 请求拦截器
    this.instance.interceptors.request.use(
      (config) => {
        // 添加JWT token到请求头
        const token = localStorage.getItem('authorization');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error: any) => {
        return Promise.reject(error);
      }
    );

    // 响应拦截器
    this.instance.interceptors.response.use(
      (response: AxiosResponse) => {
        const result: any = response.data;

        switch (result.code) {
          case 200:
            return result.data;

          case 401:
            ElMessageBox.confirm('您尚未登录，请登录后再试', '提示', {
              confirmButtonText: '去登录',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              router.push('/login');
            });
            return Promise.reject(new Error(result.message || '未登录'));

          case 403:
            ElMessageBox.confirm('您没有权限访问该页面', '提示', {
              confirmButtonText: '去授权',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              router.push('/');
            });
            return Promise.reject(new Error(result.message || '无权限'));

          default:
            // 其他业务错误，统一弹窗提示
            ElMessage.error(result.message || '请求失败');
            return Promise.reject(new Error(result.message || '请求失败'));
        }
      },
      (error: any) => {
        // 网络/服务器错误
        const message = error.response?.data?.message || error.message || '网络请求失败';
        ElMessage.error(message);
        return Promise.reject(error);
      }
    );
  }

  async get(url: string, config?: AxiosRequestConfig): Promise<any> {
    return this.instance.get(url, config);
  }

  async post(url: string, data?: any, config?: AxiosRequestConfig): Promise<any> {
    return this.instance.post(url, data, config);
  }

  async put(url: string, data?: any, config?: AxiosRequestConfig): Promise<any> {
    return this.instance.put(url, data, config);
  }

  async delete(url: string, config?: AxiosRequestConfig): Promise<any> {
    return this.instance.delete(url, config);
  }

  async patch(url: string, data?: any, config?: AxiosRequestConfig): Promise<any> {
    return this.instance.patch(url, data, config);
  }
}

// 通用响应接口
export interface ApiResponse<T = any> {
  code: number;
  message: string;
  data: T;
}

// 默认导出实例
export const http: HttpService = new HttpService(import.meta.env.VITE_ADMIN_API_URL || '/');
export const authHttp: HttpService = new HttpService(import.meta.env.VITE_AUTH_API_URL || '/');
