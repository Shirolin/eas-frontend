import { defineStore } from 'pinia'
import { ref } from 'vue'
import request from '@/axios/request.js'

export const useStudentStore = defineStore(
  'student',
  () => {
    const DEFAULT_PAGE = 1
    const DEFAULT_PER_PAGE = 10

    const students = ref([])
    const currentPage = ref(DEFAULT_PAGE)
    const itemsPerPage = ref(DEFAULT_PER_PAGE)
    const totalPages = ref(1)

    // 获取学生列表
    const fetchStudents = async (page = DEFAULT_PAGE) => {
      try {
        const response = await request.get(
          `/api/students?page=${page}&per_page=${DEFAULT_PER_PAGE}`,
        )
        students.value = response.data.data
        currentPage.value = response.data.current_page
        itemsPerPage.value = response.data.per_page
        totalPages.value = response.data.last_page
      } catch (error) {
        console.error('Failed to fetch students:', error)
      }
    }

    return {
      students,
      currentPage,
      itemsPerPage,
      totalPages,
      fetchStudents,
    }
  },
  {
    persist: true,
  },
)
