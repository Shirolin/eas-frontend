<script setup>
console.log('HeaderLayout.vue');
</script>
<template>
  <header>
    <nav>
      <div class="brand">Brand</div>
      <div class="nav-links">
        <a href="#">Landing</a>
        <a href="#">Account</a>
        <a href="#">Work</a>
        <a href="#">Blog</a>
        <div class="dropdown">
          <a href="#">Dropdown ▼</a>
          <div class="dropdown-content">
            <a href="#">Link 1</a>
            <a href="#">Link 2</a>
            <a href="#">Link 3</a>
          </div>
        </div>
        <a href="#">Log in</a>
      </div>
    </nav>
  </header>
</template>
<style scoped>
nav {
  background-color: #f8f9fa;
  /* 浅灰色背景，类似图片 */
  padding: 10px 20px;
  /* 上下 10px，左右 20px 内边距 */
  display: flex;
  /* 使用 Flexbox 布局 */
  align-items: center;
  /* 垂直居中 */
  justify-content: space-between;
  /* 两端对齐 */
}

.brand {
  font-weight: bold;
  font-size: 1.2em;
}

.nav-links {
  display: flex;
  gap: 20px;
  /* 链接之间的间距 */
}

.nav-links a {
  text-decoration: none;
  /* 去除下划线 */
  color: #007bff;
  /* 蓝色链接颜色 */
}

.nav-links .dropdown {
  position: relative;
  display: inline-block;
}

.nav-links .dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

.nav-links .dropdown-content a {
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.nav-links .dropdown:hover .dropdown-content {
  display: block;
}
</style>
