<script setup>
console.log('HeaderLayout.vue');
</script>
<template>
  <header>
    <div class="logo">
      <router-link class="link-no-style" to="/">EAS</router-link>
    </div>
    <nav>
      <ul>
        <li><a href="#">课程</a></li>
        <li><a href="#">账单</a></li>
        <li>
          <router-link to="/login" href="#" class="cta-button">登录</router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>
<style scoped>
header {
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 100;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}



.logo {
  font-weight: bold;
  font-size: 1.2em;
}

nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
}

nav li {
  margin-left: 20px;
}

nav a {
  text-decoration: none;
  color: #333;
  padding: 8px 12px;
  border-radius: 4px;
  transition: background-color 0.3s;
}

nav a:hover {
  background-color: #f0f0f0;
}

.cta-button {
  background-color: #007bff;
  color: white;
  padding: 10px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-decoration: none;
  transition: background-color 0.3s;
}

.cta-button:hover {
  background-color: #0056b3;
}
</style>
