import type { App } from 'vue'
import { useToast } from '../composables/useToast'

export function setupErrorHandler(app: App) {
  app.config.errorHandler = (err: unknown, _instance, info) => {
    console.error('Global Error:', err, info)
    
    // Log to external service if needed
    
    // Show toast for user-facing errors
    const toast = useToast()
    
    // Simplistic heuristic: If it's an Axios error, might have response data
    let message = 'An unexpected error occurred.'
    if (err && typeof err === 'object') {
      const errorObj = err as Record<string, unknown>
      if (errorObj.isAxiosError && errorObj.response) {
        const response = errorObj.response as Record<string, unknown>
        if (response.data && typeof response.data === 'object' && 'message' in response.data) {
          message = String(response.data.message)
        }
      } else if ('message' in errorObj) {
        message = String(errorObj.message)
      }
    }
    
    toast.error(message)
  }

  window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled Rejection:', event.reason)
    const toast = useToast()
    toast.error('A network or server error occurred.')
  })
}
