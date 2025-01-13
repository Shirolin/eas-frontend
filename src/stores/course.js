import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'
import request from '@/axios/request.js'
import { useUserStore } from '@/stores/user'
import { useToast } from '@/utils/useToast'
import router from '@/router'

export const useCourseStore = defineStore(
  'course',
  () => {
    const DEFAULT_PAGE = 1
    const DEFAULT_PER_PAGE = 10

    const courses = ref([])
    const currentPage = ref(1)
    const itemsPerPage = ref(2)
    const totalPages = ref(1)

    const userStore = useUserStore()
    const { showToast } = useToast()

    const checkPermission = (action) => {
      if (!userStore.isTeacher()) {
        showToast(`您没有权限${action}`, 'error')
        router.push('/course')
        return false
      }
      return true
    }

    // 获取课程列表
    const fetchCourses = async (page = DEFAULT_PAGE) => {
      try {
        const endpoint = userStore.isTeacher() ? '/api/courses' : '/api/my/courses'
        const response = await request.get(`${endpoint}?page=${page}&per_page=${DEFAULT_PER_PAGE}`)
        console.log('response:', response)
        courses.value = response.data.data
        currentPage.value = response.data.current_page
        itemsPerPage.value = response.data.per_page
        totalPages.value = response.data.last_page
      } catch (error) {
        throw error
      }
    }

    // 获取课程详情
    const fetchCourse = async (courseId) => {
      try {
        const endpoint = userStore.isTeacher() ? '/api/courses' : '/api/my/courses'
        const response = await request.get(`${endpoint}/${courseId}`)
        return response.data
      } catch (error) {
        throw error
      }
    }

    // 创建课程
    const createCourse = async (courseData) => {
      if (!checkPermission('创建课程')) return
      try {
        const response = await request.post('/api/courses', courseData)
      } catch (error) {
        throw error
      }
    }

    // 更新课程
    const updateCourse = async (courseId, courseData) => {
      if (!checkPermission('更新课程')) return
      try {
        const response = await request.put(`/api/courses/${courseId}`, courseData)
        const index = courses.value.findIndex((course) => course.id === courseId)
        courses.value[index] = response.data
      } catch (error) {
        console.error('Failed to update course:', error)
        throw error
      }
    }

    // 删除课程
    const deleteCourse = async (courseId) => {
      if (!checkPermission('删除课程')) return
      try {
        await request.delete(`/api/courses/${courseId}`)
        courses.value = courses.value.filter((course) => course.id !== courseId)
      } catch (error) {
        console.error('Failed to delete course:', error)
        throw error
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
      goToPage,
      fetchCourses,
      fetchCourse,
      createCourse,
      updateCourse,
      deleteCourse,
    }
  },
  {
    persist: true,
  },
)
