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
        <div class="modal-footer-right btn-group">
          <button class="secondary-btn" v-if="modalStore.showCancel" @click="handleCancel">
            {{ modalStore.cancelText }}
          </button>
          <button class="primary-btn" @click="handleConfirm">
            {{ modalStore.confirmText }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
/** */
.modal-footer-right {
  display: flex;
  justify-content: flex-end;
}

.btn-group {
  display: flex;
  gap: 10px;
}
</style>
