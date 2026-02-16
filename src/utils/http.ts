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
        let result: any = response.data;

        


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

            break;

          case 403:
            ElMessageBox.confirm('您没有权限访问该页面', '提示', {
              confirmButtonText: '去授权',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              router.push('/');
            });
            break;
          default:
            return Promise.reject({
              ...result,
            });
        }
      },
      (error: any) => {
        // 统一错误处理
        ElMessage.error("HTTP发生错误:" + error.response?.data?.message || '发生未知错误');
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
