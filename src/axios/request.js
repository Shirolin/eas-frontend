import axios from 'axios'
import router from '@/router/index.js'
import { useUserStore } from '@/stores/user'

// 创建axios实例
const request = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
})

let store = null

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    if (!store) store = useUserStore()
    const token = store.token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    console.error(error)
    return Promise.reject(error)
  },
)

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    let errorMessage = '系统错误'
    if (error.response) {
      // 服务器返回了错误响应
      errorMessage =
        error.response.data?.message ||
        error.response.data?.error ||
        `HTTP Error ${error.response.status}`
      if (error.response.status === 401) {
        if (error.response.data.data.isLogin) {
          errorMessage = error.response.data.message
        } else {
          // 处理 token 过期等情况，例如跳转到登录页面
          router.push('/login')
        }
      }
      if (error.response.status === 422) {
        // 处理表单校验错误
        const errors = error.response.data.errors
        if (errors) {
          errorMessage = Object.values(errors).flat().join('，')
        }
      }
      if (error.response.status === 404) {
        errorMessage = '请求的资源不存在'
      }
      if (error.response.status === 500) {
        errorMessage = '服务器内部错误'
      }
    } else if (error.request) {
      errorMessage = '请求发送失败，请检查网络连接'
    } else {
      errorMessage = error.message
    }

    // 将错误信息包装成统一的格式
    const formattedError = {
      message: errorMessage,
      status: error.response?.status,
    }

    return Promise.reject(formattedError)
  },
)

export default request
