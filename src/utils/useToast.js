import { createApp, ref } from 'vue'
import Toast from '@/components/common/ToastComponent.vue'

export function useToast() {
  const toastInstance = ref(null)
  const mountNode = ref(null)

  const createToastInstance = (message, type, duration) => {
    const app = createApp(Toast, { message, type, duration })
    mountNode.value = document.createElement('div')
    document.body.appendChild(mountNode.value)
    toastInstance.value = app.mount(mountNode.value)
  }

  const showToast = (message, type = 'info', duration = 3000) => {
    if (toastInstance.value) {
      // 销毁之前的实例
      toastInstance.value.$el.remove()
      toastInstance.value.$.appContext.app.unmount()
      document.body.removeChild(mountNode.value)
    }
    createToastInstance(message, type, duration)
  }

  return { showToast }
}
