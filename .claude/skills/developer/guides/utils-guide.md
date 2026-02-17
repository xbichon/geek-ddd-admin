# 工具类和 HTTP 使用规范

## HTTP 封装

### 已封装的实例

- `http` - 后台管理 API（使用 `VITE_ADMIN_API_URL`）
- `authHttp` - 认证安全 API（使用 `VITE_AUTH_API_URL`）

### 使用方式

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

### 响应处理

- HTTP 层已统一处理 code 200/401/403
- 成功直接返回 data
- 失败自动提示错误信息

### 注意事项

不要在业务代码中处理通用的 401/403 错误，这些已在 `http.ts` 拦截器中统一处理。

## 环境变量配置

### 配置文件

- `.env.development` - 开发环境
- `.env.production` - 生产环境

### 变量命名

必须以 `VITE_` 开头才能在客户端使用：

```env
VITE_ADMIN_API_URL=http://localhost:8080/api/teacher
VITE_AUTH_API_URL=http://localhost:8080/api/security
```

### URL 规范

**不要加末尾斜杠：**

- ✅ 正确：`http://localhost:8080/api/teacher`
- ❌ 错误：`http://localhost:8080/api/teacher/`

### 在代码中使用

```typescript
const apiUrl = import.meta.env.VITE_ADMIN_API_URL;
```

或在 `http.ts` 中已封装好，直接使用 `http` 实例即可。
