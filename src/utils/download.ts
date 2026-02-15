/**
 * 文件下载工具类
 * 提供统一的文件下载功能，支持Excel等二进制文件下载
 */

interface DownloadOptions {
  /** 请求URL */
  url: string;
  /** 查询参数 */
  params?: Record<string, string | number | boolean>;
  /** 请求头 */
  headers?: Record<string, string>;
  /** 默认文件名 */
  defaultFilename?: string;
  /** 文件扩展名 */
  extension?: string;
  /** 是否显示加载状态 */
  showLoading?: boolean;
}

/**
 * 通用文件下载工具类
 */
export class FileDownloader {
  private static isLoading = false;

  /**
   * 下载Excel文件
   * @param options 下载配置选项
   */
  static async downloadExcel(options: DownloadOptions): Promise<void> {
    const {
      url,
      params = {},
      headers = {},
      defaultFilename = 'download',
      extension = '.xlsx',
      showLoading = true
    } = options;

    // 防止重复下载
    if (this.isLoading) {
      throw new Error('文件下载中，请稍候...');
    }

    try {
      if (showLoading) {
        this.isLoading = true;
      }

      // 构造完整URL
      const fullUrl = this.buildUrl(url, params);
      
      // 获取认证token
      const token = localStorage.getItem('authorization');
      
      // 合并请求头
      const requestHeaders: Record<string, string> = {
        'Accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        ...headers
      };
      
      if (token) {
        requestHeaders['Authorization'] = `Bearer ${token}`;
      }

      // 发送下载请求
      const response = await fetch(fullUrl, {
        method: 'GET',
        headers: requestHeaders
      });

      // 检查响应状态
      if (!response.ok) {
        throw new Error(`下载失败: ${response.status} ${response.statusText}`);
      }

      // 获取文件名
      const filename = this.extractFilename(response, defaultFilename, extension);

      // 获取文件数据
      const blob = await response.blob();

      // 执行下载
      this.triggerDownload(blob, filename);

    } catch (error) {
      console.error('文件下载错误:', error);
      throw error;
    } finally {
      if (showLoading) {
        this.isLoading = false;
      }
    }
  }

  /**
   * 构造带参数的URL
   */
  private static buildUrl(baseUrl: string, params: Record<string, string | number | boolean>): string {
    const url = new URL(baseUrl, window.location.origin);
    
    Object.keys(params).forEach(key => {
      const value = params[key];
      if (value !== undefined && value !== null && value !== '') {
        url.searchParams.append(key, String(value));
      }
    });

    return url.toString();
  }

  /**
   * 从响应头中提取文件名
   */
  private static extractFilename(
    response: Response, 
    defaultName: string, 
    extension: string
  ): string {
    const contentDisposition = response.headers.get('Content-Disposition');
    let filename = `${defaultName}_${new Date().getTime()}${extension}`;

    if (contentDisposition) {
      // 优先处理 RFC 5987 格式 (filename*)
      const utf8FilenameMatch = contentDisposition.match(/filename\*=UTF-8''([^;]+)/);
      if (utf8FilenameMatch && utf8FilenameMatch[1]) {
        try {
          filename = decodeURIComponent(utf8FilenameMatch[1]);
        } catch (decodeError) {
          console.warn('UTF-8文件名解码失败:', decodeError);
        }
      } else {
        // 处理标准的filename参数
        const filenameMatch = contentDisposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/);
        if (filenameMatch && filenameMatch[1]) {
          filename = filenameMatch[1].replace(/['"]/g, '');
        }
      }
    }

    // 确保文件名有正确的扩展名
    if (!filename.endsWith(extension)) {
      const nameWithoutExt = filename.split('.')[0];
      filename = `${nameWithoutExt}${extension}`;
    }

    return filename;
  }

  /**
   * 触发浏览器下载
   */
  private static triggerDownload(blob: Blob, filename: string): void {
    const downloadUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    
    link.href = downloadUrl;
    link.download = filename;
    link.style.display = 'none';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // 清理内存
    window.URL.revokeObjectURL(downloadUrl);
  }

  /**
   * 检查是否正在下载
   */
  static get isDownloading(): boolean {
    return this.isLoading;
  }
}

/**
 * 快捷下载Excel函数
 * @param url 下载地址
 * @param params 查询参数
 * @param filename 文件名（不含扩展名）
 */
export async function downloadExcel(
  url: string, 
  params: Record<string, string | number | boolean> = {},
  filename: string = 'download'
): Promise<void> {
  return FileDownloader.downloadExcel({
    url,
    params,
    defaultFilename: filename,
    extension: '.xlsx'
  });
}

/**
 * 快捷下载任意文件函数
 * @param url 下载地址
 * @param params 查询参数
 * @param options 下载选项
 */
export async function downloadFile(
  url: string,
  params: Record<string, string | number | boolean> = {},
  options: Omit<DownloadOptions, 'url' | 'params'> = {}
): Promise<void> {
  return FileDownloader.downloadExcel({
    url,
    params,
    ...options
  });
}