<script setup>
import { useUserStore } from "@/stores/user";
const userStore = useUserStore()
</script>
<template>
  <div>
    <div class="page-title">个人信息</div>
    <div v-if="userStore.isAuthenticated()" class="page-container">
      <div class="profile-card">
        <div class="card">
          <div class="card-body">
            <img v-if="userStore.userData.avatar" :src="userStore.userData.avatar" class="avatar rounded" />
            <h3>{{ userStore.userData.nickname }}</h3>
            <div class="text-secondary">{{ userStore.userData.nickname }}</div>
            <div class="email-container">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                class="icon me-2 text-muted">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z"></path>
                <path d="M3 7l9 6l9 -6"></path>
              </svg>
              <span class="email">{{ userStore.userData.email }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
/** */
.email-container {
  display: flex;
  align-items: center;
}

.email {
  margin-left: 0.5rem;
}

.text-secondary {
  color: #6c7a91;
  margin-bottom: 1rem;
}
</style>
