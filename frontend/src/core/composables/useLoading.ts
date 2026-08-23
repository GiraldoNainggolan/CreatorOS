import { ref } from 'vue'

const isLoading = ref(false)
const loadingMessage = ref('')

export function useLoading() {
  const showLoading = (msg = '') => {
    loadingMessage.value = msg
    isLoading.value = true
  }
  const hideLoading = () => {
    isLoading.value = false
    loadingMessage.value = ''
  }
  return { isLoading, loadingMessage, showLoading, hideLoading }
}
