import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'
import request from '@/axios/request.js'

export const useCourseStore = defineStore(
  'course',
  () => {
    const DEFAULT_PAGE = 1
    const DEFAULT_PER_PAGE = 10

    const courses = ref([])
    const currentPage = ref(1)
    const itemsPerPage = ref(2)
    const totalPages = ref(1)

    // 获取课程列表
    const fetchCourses = async (page = DEFAULT_PAGE) => {
      try {
        const response = await request.get(`/api/courses?page=${page}&per_page=${DEFAULT_PER_PAGE}`)
        console.log('response:', response)
        courses.value = response.data.data
        currentPage.value = response.data.current_page
        itemsPerPage.value = response.data.per_page
        totalPages.value = response.data.last_page
      } catch (error) {
        console.error('Failed to fetch courses:', error)
      }
    }

    // 创建课程
    const createCourse = async (courseData) => {
      try {
        const response = await request.post('/api/courses', courseData)
        courses.value.push(response.data)
      } catch (error) {
        console.error('Failed to create course:', error)
      }
    }

    // 跳转到指定页
    const goToPage = (page) => {
      if (page >= 1 && page <= totalPages.value) {
        fetchCourses(page)
      }
    }

    return {
      courses,
      currentPage,
      itemsPerPage,
      totalPages,
      fetchCourses,
      goToPage,
      createCourse,
    }
  },
  {
    persist: true,
  },
)
