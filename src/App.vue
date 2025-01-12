<script setup>
import HeaderLayout from './components/layouts/HeaderLayout.vue';
import ModalComponent from './components/ModalComponent.vue';
import ScrollToTopButton from './components/ScrollToTopButton.vue';
</script>

<template>
  <HeaderLayout />
  <main>
    <RouterView />
    <ModalComponent />
    <ScrollToTopButton />
  </main>
</template>

<style lang="less" scoped>
/** */
</style>
