import { ref, onUnmounted } from 'vue'

export function useDebounce(func, delay = 300, immediate = false) {
  const debouncedFunc = ref(null)

  const debounced = (...args) => {
    if (debouncedFunc.value) {
      clearTimeout(debouncedFunc.value)
    }
    if (immediate && !debouncedFunc.value) {
      func.apply(this, args)
    }
    debouncedFunc.value = setTimeout(() => {
      if (!immediate) {
        func.apply(this, args)
      }
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
