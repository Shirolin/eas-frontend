<script setup>
import { ref, watch } from 'vue';
import { useToast } from '@/utils/useToast'; // 引入 useToast
import { useUserStore } from '@/stores/user';
import { useDebounce } from '@/utils/useDebounce';

const userStore = useUserStore();
const username = ref('');
const password = ref('');
const errorMessage = ref('');
const isSubmitting = ref(false); // 添加提交状态
const { showToast } = useToast(); // 使用 useToast

const handleSubmit = async () => {
  if (!username.value && !password.value) {
    errorMessage.value = '用户名和密码不能为空';
    return;
  }

  if (!username.value) {
    errorMessage.value = '用户名不能为空';
    return;
  }

  if (!password.value) {
    errorMessage.value = '密码不能为空';
    return;
  }
  console.log({
    username: username.value,
    password: password.value,
  });

  isSubmitting.value = true;
  let loginParams = {
    username: username.value,
    password: password.value,
  };

  await userStore.login(loginParams).then(() => {
    showToast('登录成功', 'success');
  }).catch((error) => {
    showToast(error.message, 'error');
  }).finally(() => {
    isSubmitting.value = false;
  });
};

const debouncedHandleSubmit = useDebounce(handleSubmit, 1000, true); // 传递 immediate 选项

// 监听 username 和 password 的变化，当两者中任意一个变化时，清空 errorMessage
watch([username, password], () => {
  errorMessage.value = '';
});
</script>
<template>
  <div class="center-content">
    <div class="card login-container">
      <div class="form-title">教务管理系统</div>
      <h2>登录</h2>
      <form id="loginForm" @submit.prevent="debouncedHandleSubmit">
        <div class="form-group">
          <label class="form-label" for="username">用户名</label>
          <input class="form-input" type="text" id="username" v-model="username" name="username" required>
        </div>
        <div class="form-group">
          <label class="form-label" for="password">密码</label>
          <input class="form-input" type="password" id="password" v-model="password" name="password" required>
        </div>
        <div class="form-error-message">{{ errorMessage }}</div>
        <div class="remember-me">
          <input class="form-checkbox" type="checkbox" id="remember" name="remember">
          <label for="remember" style="margin-bottom: 0;">记住我</label>
        </div>
        <div class="primary-btn" :class="{ 'disabled': isSubmitting }" @click="debouncedHandleSubmit">
          {{ isSubmitting ? '登录中...' : '登录' }}
        </div>
      </form>
    </div>
  </div>
</template>

<style lang="less" scoped>
.login-container {
  width: 22rem;
}

.login-container h2 {
  text-align: center;
  margin-bottom: 1.5rem;
  color: #333;
  font-size: 1.8em;
}

.remember-me {
  display: flex;
  align-items: center;
  margin-bottom: 1.25rem;
  color: @input-label-color;
}
</style>
