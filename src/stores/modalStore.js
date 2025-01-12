import { defineStore } from 'pinia'

export const useModalStore = defineStore('modal', {
  state: () => ({
    isVisible: false,
    title: '',
    content: '',
    confirmText: '确定',
    cancelText: '取消',
    showCancel: true,
    onConfirm: null,
    onCancel: null,
  }),
  actions: {
    show(options) {
      this.title = options.title || ''
      this.content = options.content || ''
      this.confirmText = options.confirmText || '确定'
      this.cancelText = options.cancelText || '取消'
      this.showCancel = options.showCancel !== false // 默认显示取消按钮
      this.onConfirm = options.onConfirm || null
      this.onCancel = options.onCancel || null
      this.isVisible = true
    },
    hide() {
      this.isVisible = false
      this.title = ''
      this.content = ''
      this.onConfirm = null
      this.onCancel = null
    },
  },
})
