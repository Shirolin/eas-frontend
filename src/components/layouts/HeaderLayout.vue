<script setup>
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
        <li>
          <router-link to="/login" href="#" class="primary-btn">登录</router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>
<style lang="less" scoped>
/** */
</style>
