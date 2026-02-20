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

        <el-button type="primary" class="button" @click="handleSubmit">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, useTemplateRef, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { authService } from '@/services/security/auth'

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
  const response = await authService.getCaptcha()
  Object.assign(captchaData, response)
}

const handleSubmit = async () => {
  if (!loginFormRef.value || !(await loginFormRef.value.validate())) return;

  try {
    const response = await authService.login({
      identifier: loginInfo.username,
      password: loginInfo.password,
      captchaKey: captchaData.key,
      captcha: loginInfo.captcha
    });

    console.log('登录成功', response);
    localStorage.setItem('authorization', response);
    router.push('/');

  } catch (error: any) {
    // 登录失败时刷新验证码
    refreshCaptcha()

    localStorage.removeItem('authorization')
    ElMessage.error(error.message || '登录失败')
  }
};

</script>

<style scoped>
@import './Index.scss';
</style>