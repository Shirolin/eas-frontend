<script setup></script>
<template>
  <div class="center-content">
    <div class="card login-container">
      <div class="form-title">教务管理系统</div>
      <h2>登录</h2>
      <form id="loginForm">
        <div class="form-group">
          <label class="form-label" for="username">用户名</label>
          <input class="form-input" type="username" id="username" name="username" required>
        </div>
        <div class="form-group">
          <label class="form-label" for="password">密码</label>
          <input class="form-input" type="password" id="password" name="password" required>
        </div>
        <div class="remember-me">
          <input class="form-checkbox" type="checkbox" id="remember" name="remember">
          <label for="remember" style="margin-bottom: 0;">记住我</label>
        </div>
        <div class="primary-btn">登录</div>
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
