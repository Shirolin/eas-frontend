<template>
  <div class="pagination">
    <button @click="changePage(currentPage - 1)" :disabled="currentPage === 1">上一页</button>
    <span>第 {{ currentPage }} 页，共 {{ totalPages }} 页</span>
    <button @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages">下一页</button>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  currentPage: {
    type: Number,
    required: true
  },
  totalPages: {
    type: Number,
    required: true
  }
});

const emits = defineEmits(['changePage']);

const changePage = (page) => {
  if (page > 0 && page <= props.totalPages) {
    emits('changePage', page);
  }
};
</script>

<style lang="less" scoped>
/** */
</style>
