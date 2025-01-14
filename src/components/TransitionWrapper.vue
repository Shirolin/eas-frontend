<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const Component = computed(() => route.matched[0]?.components.default);

</script>
<template>
  <transition name="fade" mode="out-in">
    <component :is="Component">
      <slot />
    </component>
  </transition>
</template>
<style lang="less" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
