<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();
const router = useRouter();
const welcomeMessage = ref('欢迎来到教育平台！');
const navigateToLogin = () => {
  router.push('/login');
};
const navigateToCourses = () => {
  router.push('/course');
};
</script>
<template>
  <div>
    <div class="page-title">首页</div>
    <div class="page-container">
      <div class="welcome">
        <!-- 首页内容 -->
        <p>{{ welcomeMessage }}</p>
        <button v-if="userStore.isAuthenticated()" @click="navigateToCourses" class="navigate-button">查看课程列表</button>
        <button v-else @click="navigateToLogin" class="navigate-button">登录使用</button>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
/** */
.page-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
}

.welcome-card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: @card-bg-color;
  border: 1px solid @card-border-color;
  border-radius: @card-radius;
  padding: @card-padding;
  box-shadow: @card-shadow;
  text-align: center;
  max-width: 30rem;
  width: 100%;
}

.navigate-button {
  background-color: @primary-color;
  color: @primary-color-text;
  border: none;
  border-radius: 0.25rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: @primary-color-hover;
  }

  &:active {
    background-color: @primary-color-active;
  }
}
</style>
