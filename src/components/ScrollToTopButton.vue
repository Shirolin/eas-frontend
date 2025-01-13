<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const showScrollButton = ref(false);

const handleScroll = () => {
  showScrollButton.value = window.scrollY > 200;
};

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
  <button v-if="showScrollButton" @click="scrollToTop" class="scroll-to-top">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
      class="size-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
    </svg>
  </button>
</template>

<style lang="less" scoped>
.scroll-to-top {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  background-color: @primary-color;
  color: @primary-color-text;
  border: none;
  border-radius: 50%;
  width: 3rem;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s;

  &:hover {
    background-color: @primary-color-hover;
  }

  &:active {
    background-color: @primary-color-active;
  }
}
</style>
