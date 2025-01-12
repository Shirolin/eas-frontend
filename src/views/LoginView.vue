<script setup></script>
<template>
  <header>
  </header>
  <div class="content">
    <div class="login-container">
      <h2>登录</h2>
      <form id="loginForm">
        <div class="form-group">
          <label for="username">用户名</label>
          <input type="username" id="username" name="username" required>
        </div>
        <div class="form-group">
          <label for="password">密码</label>
          <input type="password" id="password" name="password" required>
        </div>
        <div class="remember-me">
          <input type="checkbox" id="remember" name="remember">
          <label for="remember" style="margin-bottom: 0;">记住我</label>
        </div>
        <button type="submit">登录</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
body {
  font-family: sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f7fa;
  margin: 0;
}

.content {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
}

.login-container {
  background-color: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  /* 阴影效果 */
  width: 350px;
  /* 调整宽度 */
}

.login-container h2 {
  text-align: center;
  margin-bottom: 25px;
  color: #333;
  font-size: 1.8em;
  /* 增大标题字号 */
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 8px;
  color: #555;
  font-weight: 500;
  /* label加粗 */
}

input[type="username"],
/* 使用username类型 */
input[type="password"] {
  width: calc(100% - 16px);
  padding: 10px;
  border: 1px solid #ddd;
  /* 更淡的边框 */
  border-radius: 4px;
  box-sizing: border-box;
  outline: none;
  /* 去除focus时的默认外框 */
}

input[type="username"]:focus,
input[type="password"]:focus {
  border-color: #1D4ED8;
  /* focus时边框颜色 */
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.2);
  /* focus时阴影 */
}

button {
  width: 100%;
  padding: 12px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1.1em;
  /* 增大按钮字号 */
  font-weight: 500;
  transition: background-color 0.3s;
  /* 添加过渡效果 */
}

button:hover {
  background-color: #0056b3;
}

.remember-me {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.remember-me input[type="checkbox"] {
  margin-right: 8px;
}

.back-link {
  text-align: center;
  margin-top: 20px;
}

.back-link a {
  color: #007bff;
  text-decoration: none;
}
</style>
