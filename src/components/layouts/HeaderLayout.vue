<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useUserStore } from '@/stores/user'
const userStore = useUserStore()
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
        <li v-if="userStore.isAuthenticated()">
          <router-link to="/course" class="header-text-btn">课程</router-link>
        </li>
        <li v-if="userStore.isAuthenticated()">
          <router-link to="/invoice" class="header-text-btn">账单</router-link>
        </li>
        <li v-if="!userStore.isAuthenticated()">
          <router-link to="/login" href="#" class="primary-btn">登录</router-link>
        </li>
      </ul>
      <div v-if="userStore.isAuthenticated()" class="nav-item header-dropdown" ref="dropdownRef"
        @click="toggleDropdown">
        <span class="header-dropdown-separator">|</span>
        <a class="nav-link">
          {{ userStore.userData.nickname }}
        </a>
        <div class="header-dropdown-content" :class="{ show: isDropdownOpen }">
          <div class="header-dropdown-content-info-item">
            <div>{{ userStore.userData.email }}</div>
            <div>{{ userStore.userData.role_name }}</div>
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
