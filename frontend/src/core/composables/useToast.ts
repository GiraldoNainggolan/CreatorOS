import { ref } from 'vue'

export type ToastType = 'success' | 'error' | 'info' | 'warning'

export interface Toast {
  id: string
  message: string
  type: ToastType
  duration?: number
}

// Global state for toasts
const toasts = ref<Toast[]>([])

export function useToast() {
  const addToast = (message: string, type: ToastType = 'info', duration = 3000) => {
    const id = Math.random().toString(36).substring(2, 9)
    toasts.value.push({ id, message, type, duration })

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id)
      }, duration)
    }
  }

  const removeToast = (id: string) => {
    toasts.value = toasts.value.filter(t => t.id !== id)
  }

  const success = (msg: string, duration?: number) => addToast(msg, 'success', duration)
  const error = (msg: string, duration?: number) => addToast(msg, 'error', duration)
  const info = (msg: string, duration?: number) => addToast(msg, 'info', duration)
  const warning = (msg: string, duration?: number) => addToast(msg, 'warning', duration)

  return {
    toasts,
    addToast,
    removeToast,
    success,
    error,
    info,
    warning
  }
}
