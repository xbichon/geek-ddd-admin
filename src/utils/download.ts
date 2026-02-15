/**
 * Excel 文件下载
 * @param url 下载地址
 * @param params 查询参数
 * @param filename 文件名（不含扩展名，默认 'download'）
 */
export async function downloadExcel(
  url: string,
  params: Record<string, string | number | boolean | undefined> = {},
  filename: string = 'download'
): Promise<void> {
  const fullUrl = buildUrl(url, params);

  const response = await fetch(fullUrl, {
    method: 'GET',
    headers: {
      Accept: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      Authorization: `Bearer ${localStorage.getItem('authorization') || ''}`,
    },
  });

  if (!response.ok) {
    throw new Error(`下载失败: ${response.status}`);
  }

  const blob = await response.blob();
  const finalName = extractFilename(response) || `${filename}_${Date.now()}.xlsx`;

  triggerDownload(blob, finalName);
}

/** API 基础路径 */
const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL || '';
                  
/** 构造带查询参数的 URL */
function buildUrl(baseUrl: string, params: Record<string, string | number | boolean | undefined>): string {

  console.log('构建下载 URL:', { API_BASE_URL,baseUrl, params });

  const fullPath = API_BASE_URL + 'admin' + baseUrl;
  const url = new URL(fullPath, window.location.origin);
  Object.entries(params).forEach(([key, value]) => {
    if (value != null && value !== '') {
      url.searchParams.append(key, String(value));
    }
  });
  return url.toString();
}

/** 从响应头解析文件名 */
function extractFilename(response: Response): string | null {
  const header = response.headers.get('Content-Disposition');
  if (!header) return null;

  // 优先解析 filename*=UTF-8'' 格式
  const utf8Match = header.match(/filename\*=UTF-8''([^;]+)/);
  if (utf8Match) {
    try {
      return decodeURIComponent(utf8Match[1]);
    } catch {
      return null;
    }
  }

  // 解析普通 filename 格式
  const match = header.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/);
  if (match) {
    return match[1].replace(/['"]/g, '');
  }

  return null;
}

/** 触发浏览器下载 */
function triggerDownload(blob: Blob, filename: string): void {
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');

  link.href = url;
  link.download = filename.endsWith('.xlsx') ? filename : `${filename}.xlsx`;
  link.style.display = 'none';

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  window.URL.revokeObjectURL(url);
}