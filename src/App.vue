<script setup>
import { useRoute } from 'vue-router';
import HeaderLayout from './components/layouts/HeaderLayout.vue';
import ModalComponent from './components/ModalComponent.vue';
import ScrollToTopButton from './components/ScrollToTopButton.vue';
import TransitionWrapper from './components/TransitionWrapper.vue';

const route = useRoute();
</script>

<template>
  <HeaderLayout />
  <main>
    <TransitionWrapper>
      <RouterView :key="route.fullPath" />
    </TransitionWrapper>
    <ModalComponent />
    <ScrollToTopButton />
  </main>
</template>

<style lang="less" scoped>
/** */
</style>
