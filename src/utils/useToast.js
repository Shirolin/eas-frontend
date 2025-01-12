import { createApp, ref } from 'vue'
import Toast from '@/components/ToastComponent.vue'

export function useToast() {
  const toastInstance = ref(null)

  const showToast = (message, type = 'info', duration = 3000) => {
    if (!toastInstance.value) {
      const mountNode = document.createElement('div')
      document.body.appendChild(mountNode)
      const app = createApp(Toast, { message, type, duration })
      toastInstance.value = app.mount(mountNode)
    } else {
      toastInstance.value.message = message
      toastInstance.value.type = type
      toastInstance.value.duration = duration
      toastInstance.value.show()
    }
  }

  return { showToast }
}
