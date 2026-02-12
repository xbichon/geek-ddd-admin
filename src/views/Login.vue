<template>
  <div class="login-container">
    <el-form label-width="80px" class="login-form" :model="loginInfo" :rules="rules" ref="loginFormRef">
      <div class="login-title">
        <img class="logo" src="@/assets/logo.png" alt="logo">
        <span>极客学社</span>
      </div>
      <el-form-item label="账户" prop="username" :rules="rules.username">
        <el-input v-model="loginInfo.username" placeholder="请输入账户"></el-input>
      </el-form-item>

      <el-form-item label="密码" prop="password" :rules="rules.password">
        <el-input v-model="loginInfo.password" type="password" placeholder="请输入密码" show-password></el-input>
      </el-form-item>

      <el-form-item label="验证码" prop="captcha" :rules="rules.captcha">
        <div class="captcha-container">
          <el-input v-model="loginInfo.captcha" placeholder="请输入验证码" class="captcha-input"></el-input>
          <img :src="captchaData.data" alt="验证码" class="captcha-image" @click="refreshCaptcha">
        </div>
      </el-form-item>

      <el-form-item>

        <el-button type="primary" class="button" @click="submitForm">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { reactive, useTemplateRef, onMounted, ref } from 'vue';
import { http } from '@/utils/http';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';

const loginFormRef = useTemplateRef("loginFormRef");
const router = useRouter();

const rules = reactive({
  username: [
    { required: true, message: '请输入账户', trigger: 'blur' },
    { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
  ],
  captcha: [
    { required: true, message: '请输入验证码', trigger: 'blur' },
    { min: 4, max: 6, message: '长度在 4 到 6 个字符', trigger: 'blur' }
  ]
});

const loginInfo = reactive({
  username: '',
  password: '',
  captcha: ''
});

const captchaData = reactive({
  key: '',
  data: ''
});


// 页面加载时获取验证码
onMounted(() => {
  refreshCaptcha();
});

// 刷新验证码
const refreshCaptcha = async () => {
  try {
    const response = await http.get('/security/auth/captcha');
    captchaData.key = response.key;
    captchaData.data = response.data;
  } catch (error) {
    ElMessage.error('获取验证码失败: ' + error.message);
  }
};

const submitForm = async () => {
  if (!loginFormRef.value || !(await loginFormRef.value.validate())) return;

  try {
    const response = await http.post('/security/auth/login', {
      userType: 'TEACHER',
      identifier: loginInfo.username,
      password: loginInfo.password,
      captchaKey: captchaData.key,
      captcha: loginInfo.captcha
    });

    console.log('登录成功', response);
    localStorage.setItem('authorization', response);
    router.push('/');

  } catch (error) {
    // 登录失败时刷新验证码
    refreshCaptcha();

    localStorage.removeItem('authorization');
    ElMessage.error(error.message)
  }
};

</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 100vh;
  background: url('@/assets/login.jpeg') no-repeat center center;
  background-size: cover;
  padding: 0;
  overflow: hidden;
  position: relative;
}

.login-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 1;
}

.login-form {
  width: 100%;
  max-width: 380px;
  padding: 48px 40px;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  margin-right: 15%;
  position: relative;
  z-index: 2;
}

.login-title {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: 600;
  color: #000000;
  margin-bottom: 32px;
  letter-spacing: 1px;
  gap: 12px;
}

.login-title .logo {
  width: 60px;
  height: 60px;
  object-fit: contain;
}

.el-form-item {
  margin-bottom: 24px;
}

.el-form-item__label {
  font-weight: 500;
  color: #262626;
  margin-bottom: 8px;
}

.el-input {
  height: 40px;
}

.el-input__inner {
  height: 100%;
  border-radius: 6px;
  border: 1px solid #d9d9d9;
  transition: all 0.3s;
}

.el-input__inner:focus {
  border-color: #1890ff;
  box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
}

.captcha-container {
  display: flex;
  align-items: center;
  gap: 10px;
}

.captcha-input {
  flex: 1;
}

.captcha-image {
  width: 120px;
  height: 40px;
  cursor: pointer;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
}

.el-button {
  width: 100%;
  height: 40px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  background: #1890ff;
  border-color: #1890ff;
  transition: all 0.3s;
}

.el-button:hover {
  background: #40a9ff;
  border-color: #40a9ff;
}

.el-button:active {
  background: #096dd9;
  border-color: #096dd9;
}
</style>