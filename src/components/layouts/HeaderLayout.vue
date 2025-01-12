<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const isDropdownOpen = ref(false);
const dropdownRef = ref(null);

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const handleClickOutside = (event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    isDropdownOpen.value = false;
  }
};

let isLogin = true;

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>
<template>
  <header class="header">
    <div class="header-logo">
      <router-link class="link-no-style" to="/">EAS</router-link>
    </div>
    <nav class="header-nav">
      <ul>
        <li>
          <router-link to="/course" class="header-text-btn">课程</router-link>
        </li>
        <li>
          <router-link to="/invoice" class="header-text-btn">账单</router-link>
        </li>
        <li v-if="!isLogin">
          <router-link to="/login" href="#" class="primary-btn">登录</router-link>
        </li>
      </ul>
      <div v-if="isLogin" class="nav-item header-dropdown" ref="dropdownRef" @click="toggleDropdown">
        <span class="header-dropdown-separator">|</span>
        <a class="nav-link">
          Shirolin
        </a>
        <div class="header-dropdown-content" :class="{ show: isDropdownOpen }">
          <div class="header-dropdown-content-info-item">
            <div>shirolin@gmail.com</div>
            <div>管理员</div>
          </div>
          <router-link to="/profile">个人信息</router-link>
          <router-link to="/setting">设置</router-link>
          <router-link to="/logout">退出</router-link>
        </div>
      </div>
    </nav>
  </header>
</template>
<style lang="less" scoped>
/** */
</style>
