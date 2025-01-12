<script setup>
import { ref, watch, onMounted } from 'vue';
import { CheckCircleIcon, ExclamationTriangleIcon, XCircleIcon, InformationCircleIcon } from '@heroicons/vue/24/solid'

const props = defineProps({
  message: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: 'info',
    validator: (value) => ['info', 'success', 'warning', 'error'].includes(value),
  },
  duration: {
    type: Number,
    default: 3000,
  },
});

const emit = defineEmits(['update:visible']);

const visible = ref(false);

const icon = ref(null);
const typeIconMap = {
  'success': CheckCircleIcon,
  'warning': ExclamationTriangleIcon,
  'error': XCircleIcon,
  'info': InformationCircleIcon
}

watch(() => props.type, (newType) => {
  icon.value = typeIconMap[newType]
})

watch(() => props.message, () => {
  show()
})

const show = () => {
  visible.value = true;
  setTimeout(() => {
    visible.value = false;
    emit('update:visible', false);
  }, props.duration);
};

defineExpose({ show });
</script>
<template>
  <transition name="toast">
    <div v-if="visible" class="toast" :class="type">
      <div v-if="icon" class="toast-icon">
        <component :is="icon" />
      </div>
      <span class="toast-message">{{ message }}</span>
    </div>
  </transition>
</template>
<style scoped lang="less">
/* 样式部分与之前的代码相同 */
.toast {
  position: fixed;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  z-index: 9999;
  display: flex;
  align-items: center;
  white-space: nowrap; // 防止文字换行

  &.success {
    background-color: rgba(0, 128, 0, 0.7);
  }

  &.warning {
    background-color: rgba(255, 165, 0, 0.7);
  }

  &.error {
    background-color: rgba(255, 0, 0, 0.7);
  }

  .toast-icon {
    display: inline-flex;
    align-items: center;
    margin-right: .5rem;

    svg {
      width: 1rem;
      height: 1rem;
    }
  }
}

.toast-enter-active,
.toast-leave-active {
  transition: opacity 0.3s ease;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
}
</style>
