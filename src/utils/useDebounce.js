import { ref, onUnmounted } from 'vue'

export function useDebounce(func, delay = 300) {
  const debouncedFunc = ref(null)

  const debounced = (...args) => {
    if (debouncedFunc.value) {
      clearTimeout(debouncedFunc.value)
    }
    debouncedFunc.value = setTimeout(() => {
      func.apply(this, args)
      debouncedFunc.value = null
    }, delay)
  }

  onUnmounted(() => {
    if (debouncedFunc.value) {
      clearTimeout(debouncedFunc.value)
    }
  })

  return debounced
}
