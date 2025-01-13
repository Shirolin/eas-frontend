import { ref } from 'vue'
import { defineStore } from 'pinia'
import request from '@/axios/request.js'
import { useUserStore } from '@/stores/user'
import { useToast } from '@/utils/useToast'
import router from '@/router'

export const useInvoiceStore = defineStore(
  'invoice',
  () => {
    const DEFAULT_PAGE = 1
    const DEFAULT_PER_PAGE = 10

    const invoices = ref([])
    const currentPage = ref(1)
    const itemsPerPage = ref(2)
    const totalPages = ref(1)

    const userStore = useUserStore()
    const { showToast } = useToast()

    const checkPermission = (action) => {
      if (!userStore.isTeacher()) {
        showToast(`您没有权限${action}`, 'error')
        router.push('/invoice')
        return false
      }
      return true
    }

    // 获取账单列表
    const fetchInvoices = async (page = DEFAULT_PAGE) => {
      try {
        const endpoint = userStore.isTeacher() ? '/api/invoices' : '/api/my/invoices'
        const response = await request.get(`${endpoint}?page=${page}&per_page=${DEFAULT_PER_PAGE}`)
        invoices.value = response.data.data
        currentPage.value = response.data.current_page
        itemsPerPage.value = response.data.per_page
        totalPages.value = response.data.last_page
      } catch (error) {
        console.error('Failed to fetch invoices:', error)
        throw error
      }
    }

    // 获取账单详情
    const fetchInvoice = async (invoiceId) => {
      try {
        const endpoint = userStore.isTeacher() ? '/api/invoices' : '/api/my/invoices'
        const response = await request.get(`${endpoint}/${invoiceId}`)
        return response.data
      } catch (error) {
        console.error('Failed to fetch invoice:', error)
        throw error
      }
    }

    // 创建账单
    const createInvoice = async (invoiceData) => {
      if (!checkPermission('创建账单')) return
      try {
        await request.post('/api/invoices', invoiceData)
      } catch (error) {
        console.error('Failed to create invoice:', error)
        throw error
      }
    }

    // 取消账单
    const cancelInvoice = async (invoiceId) => {
      if (!checkPermission('取消账单')) return
      try {
        await request.post(`/api/invoices/${invoiceId}/cancel`)
      } catch (error) {
        console.error('Failed to cancel invoice:', error)
        throw error
      }
    }

    // 发送账单
    const sendInvoice = async (invoiceId) => {
      if (!checkPermission('发送账单')) return
      try {
        await request.post(`/api/invoices/${invoiceId}/send`)
      } catch (error) {
        console.error('Failed to send invoice:', error)
        throw error
      }
    }

    // 支付账单
    const payInvoice = async (invoiceId) => {
      try {
        await request.post(`/api/invoices/${invoiceId}/pay`)
      } catch (error) {
        console.error('Failed to pay invoice:', error)
        throw error
      }
    }

    // 跳转到指定页
    const goToPage = (page) => {
      if (page >= 1 && page <= totalPages.value) {
        fetchInvoices(page)
      }
    }

    return {
      invoices,
      currentPage,
      itemsPerPage,
      totalPages,
      goToPage,
      fetchInvoices,
      fetchInvoice,
      createInvoice,
      cancelInvoice,
      sendInvoice,
    }
  },
  {
    persist: true,
  },
)
