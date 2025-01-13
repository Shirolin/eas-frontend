import { ref } from 'vue'
import { defineStore } from 'pinia'
import request from '@/axios/request.js'

export const useInvoiceStore = defineStore(
  'invoice',
  () => {
    const DEFAULT_PAGE = 1
    const DEFAULT_PER_PAGE = 10

    const invoices = ref([])
    const currentPage = ref(1)
    const itemsPerPage = ref(2)
    const totalPages = ref(1)

    // 获取账单列表
    const fetchInvoices = async (page = DEFAULT_PAGE) => {
      try {
        const response = await request.get(
          `/api/invoices?page=${page}&per_page=${DEFAULT_PER_PAGE}`,
        )
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
        const response = await request.get(`/api/invoices/${invoiceId}`)
        return response.data
      } catch (error) {
        console.error('Failed to fetch invoice:', error)
        throw error
      }
    }

    // 创建账单
    const createInvoice = async (invoiceData) => {
      try {
        const response = await request.post('/api/invoices', invoiceData)
        invoices.value.push(response.data)
      } catch (error) {
        console.error('Failed to create invoice:', error)
        throw error
      }
    }

    // 取消账单
    const cancelInvoice = async (invoiceId) => {
      try {
        await request.post(`/api/invoices/${invoiceId}/cancel`)
      } catch (error) {
        console.error('Failed to cancel invoice:', error)
        throw error
      }
    }

    // 发送账单
    const sendInvoice = async (invoiceId) => {
      try {
        const response = await request.post(`/api/invoices/${invoiceId}/send`)
        const index = invoices.value.findIndex((invoice) => invoice.id === invoiceId)
        invoices.value[index] = response.data
      } catch (error) {
        console.error('Failed to send invoice:', error)
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
