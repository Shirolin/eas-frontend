import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'
import request from '@/axios/request.js'
import router from '@/router/index.js'

export const useUserStore = defineStore(
  'user',
  () => {
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
          router.push({ path: '/home' })
        }, 1000)
      }
    }

    // 退出登录
    async function logout() {
      try {
        await request.post('/api/auth/logout')
        localStorage.removeItem('token')
        alert('退出登录成功, 现在将跳转到登录页')
        router.push('/login')
      } catch (error) {
        console.log({ msg: '退出登录失败', error })
        if (error.status == 401) {
          console.log('token已过期')
          localStorage.removeItem('token')
          console.log({
            msg: 'token已过期，已清除token和用户信息',
            token: localStorage.getItem('token'),
            userData,
          })
          router.push('/login')
        }
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
        console.log({ msg: '获取用户信息失败', error })
      }
    }

    // 检查用户是否已登录
    function isAuthenticated() {
      return token.value !== null
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
    }
  },
  {
    persist: true,
  },
)
