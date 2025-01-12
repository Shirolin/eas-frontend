<script setup>
import { useModalStore } from '@/stores/modalStore';

const modalStore = useModalStore();

const closeModal = () => {
  modalStore.hide();
};

const handleConfirm = () => {
  if (modalStore.onConfirm) {
    modalStore.onConfirm();
  }
  closeModal();
};

const handleCancel = () => {
  if (modalStore.onCancel) {
    modalStore.onCancel();
  }
  closeModal();
};
</script>

<template>
  <div v-if="modalStore.isVisible" class="modal-overlay">
    <div class="modal">
      <div class="modal-header">
        <h3>{{ modalStore.title }}</h3>
        <button @click="closeModal">×</button>
      </div>
      <div class="modal-body">
        <p>{{ modalStore.content }}</p>
      </div>
      <div class="modal-footer">
        <button v-if="modalStore.showCancel" @click="handleCancel">
          {{ modalStore.cancelText }}
        </button>
        <button @click="handleConfirm">
          {{ modalStore.confirmText }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 样式略 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}

.modal {
  background-color: #fff;
  padding: 20px;
}
</style>
