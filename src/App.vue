<script setup>
import HeaderLayout from './components/layouts/HeaderLayout.vue';
import ModalComponent from './components/ModalComponent.vue';
</script>
<template>
  <HeaderLayout />
  <RouterView />
  <ModalComponent />
</template>

<style lang="less" src="@/assets/styles/base.less" scoped></style>
