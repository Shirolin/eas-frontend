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
    if (response.status === 200) {
      return response.data
    } else {
      router.push('/notFound')
    }
  },
  (error) => {
    if (error.response) {
      handleErrorResponse(error.response)
    }
    return Promise.reject(error)
  },
)

/**
 * 处理错误响应
 * @param {*} response
 */
function handleErrorResponse(response) {
  switch (response.status) {
    case 401:
      alert('登录已过期，请重新登录')
      // handleUnauthorized()
      break
    case 404:
      router.push('/notFound')
      break
    case 500:
      alert('服务器异常')
      break
    default:
      console.error({
        msg: '[响应拦截器]服务器异常',
        error: response,
      })
      alert('服务器异常')
  }
}

/**
 * 处理未授权
 */
function handleUnauthorized() {
  if (!store) store = useUserStore()
  store.token = null
  store.userData = {}
  router.push('/login')
}

export default request
