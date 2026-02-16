# 环境变量配置

## 配置文件

- `.env.development` - 开发环境
- `.env.production` - 生产环境

## 变量命名

必须以 `VITE_` 开头才能在客户端使用：

```env
VITE_ADMIN_API_URL=http://localhost:8080/api/teacher
VITE_AUTH_API_URL=http://localhost:8080/api/security
```

## URL 规范

**不要加末尾斜杠：**

- ✅ 正确：`http://localhost:8080/api/teacher`
- ❌ 错误：`http://localhost:8080/api/teacher/`

## 在代码中使用

```typescript
const apiUrl = import.meta.env.VITE_ADMIN_API_URL;
```

或在 `http.ts` 中已封装好，直接使用 `http` 实例即可。
