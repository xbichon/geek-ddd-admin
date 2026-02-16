# HTTP 工具使用

## 已封装的实例

- `http` - 后台管理 API（使用 `VITE_ADMIN_API_URL`）
- `authHttp` - 认证安全 API（使用 `VITE_AUTH_API_URL`）

## 使用方式

```typescript
import { http } from '@/utils/http';

// GET 请求
http.get('/path');
http.get('/path', { params: { key: 'value' } });

// POST 请求
http.post('/path', data);

// PUT 请求
http.put('/path', data);

// DELETE 请求
http.delete('/path');
```

## 响应处理

- HTTP 层已统一处理 code 200/401/403
- 成功直接返回 data
- 失败自动提示错误信息

## 注意事项

不要在业务代码中处理通用的 401/403 错误，这些已在 `http.ts` 拦截器中统一处理。
