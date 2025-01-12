<script setup>
import HeaderLayout from '@/components/layouts/HeaderLayout.vue';
import { useModalStore } from '@/stores/modalStore';

const modalStore = useModalStore();

const showModal = () => {
  modalStore.show({
    title: '提示',
    content: '这是一个使用 Pinia 管理的全局 Modal。',
    onConfirm: () => {
      console.log('点击了确定');
    },
    onCancel: () => {
      console.log('点击了取消')
    },
  });
};
</script>
<template>
  <main>
  </main>
</template>
<style lang="less" scoped>
.main {
  padding: 0px;
}
</style>
