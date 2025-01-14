import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'
import request from '@/axios/request.js'
import router from '@/router/index.js'

export const useUserStore = defineStore(
  'user',
  () => {
    // 教师常量
    const ROLE_TEACHER = 1
    // 学生常量
    const ROLE_STUDENT = 2

    const resp_login = reactive({})
    const resp_getUserInfo = reactive({})

    const userData = reactive({})
    const token = ref(localStorage.getItem('token') || null)
    const isRemember = ref()

    // Passport 配置，从环境变量中获取
    const vite_passport_config = {
      grant_type: import.meta.env.VITE_PASSPORT_GRANT_TYPE,
      client_id: import.meta.env.VITE_PASSPORT_CLIENT_ID,
      client_secret: import.meta.env.VITE_PASSPORT_CLIENT_SECRET,
      scope: import.meta.env.VITE_PASSPORT_SCOPE,
    }

    // 登录
    async function login(data) {
      try {
        const params = { username: data.username, password: data.password, ...vite_passport_config }
        const response = await request.post('/api/auth/login', params)

        Object.assign(resp_login, response)
        token.value = resp_login.data.access_token
        isRemember.value = data.rememberMe

        if (token.value) {
          localStorage.setItem('token', token.value)
          if (localStorage.getItem('token') != null) {
            await getUserInfo()
          }
          console.log({ msg: '登录成功', token: token.value, userData })
          setTimeout(() => {
            router.push({ path: '/' })
          }, 1000)
        }
      } catch (error) {
        console.log({ msg: '登录失败', error })
        return Promise.reject(error)
      }
    }

    // 退出登录
    async function logout() {
      try {
        await request.get('/api/auth/logout')
      } catch (error) {
        if (error.status == 401) {
          clear()
        }
        console.log({ msg: '退出登录失败', error })
        return Promise.reject(error)
      }
    }

    // 获取用户信息
    async function getUserInfo() {
      try {
        const res = await request.get('/api/auth/user', { params: {} })
        console.log({ msg: '获取用户信息成功', data: res })
        Object.assign(resp_getUserInfo, res)
        Object.assign(userData, resp_getUserInfo.data)
      } catch (error) {
        if (error.status == 401) {
          clear()
        }
        console.log({ msg: '获取用户信息失败', error })
        return Promise.reject(error)
      }
    }

    // 检查用户是否已登录
    function isAuthenticated() {
      return token.value !== null
    }

    // 清除用户信息和 token
    function clear() {
      localStorage.removeItem('token')
      token.value = null
    }

    // 检查用户是否教师角色
    function isTeacher() {
      return userData.role === ROLE_TEACHER
    }

    // 检查用户是否学生角色
    function isStudent() {
      return userData.role === ROLE_STUDENT
    }

    return {
      resp_login,
      token,
      isRemember,
      userData,
      resp_getUserInfo,
      getUserInfo,
      login,
      logout,
      isAuthenticated,
      clear,
      isTeacher,
      isStudent,
    }
  },
  {
    persist: true,
  },
)
