import axios from 'axios'
import router from '@/router/index.js'
import { useUserStore } from '@/stores/user'
import { useToast } from '@/utils/useToast'

const { showToast } = useToast()

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
    if (error.response) {
      handleErrorResponse(error.response)
    } else {
      showToast('网络错误，请稍后重试', 'error')
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
      handleUnauthorized(response)
      break
    case 404:
      showToast('请求资源不存在', 'error')
      break
    case 422:
      handleValidationError(response)
      break
    default:
      showToast('服务器异常', 'error')
  }
}

/**
 * 校验报错处理
 */
function handleValidationError(response) {
  try {
    let msg = Object.values(response.data.message).join('，')
    showToast(msg, 'error')
  } catch (e) {
    console.error('Validation error:', e)
  }
}

/**
 * 处理未授权
 */
function handleUnauthorized(response) {
  if (response.data.data.isLogin) {
    showToast(response.data.message, 'error')
  } else {
    showToast('未授权', 'error')
    if (!store) store = useUserStore()
    store.token = null
    store.userData = {}
    router.push('/login')
  }
}

export default request
