import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { apiClient } from '../api/client'

export interface User {
  id: string | number
  email: string
  name?: string
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const token = ref<string | null>(localStorage.getItem('token'))

  const isAuthenticated = computed(() => !!token.value)

  function setToken(newToken: string) {
    token.value = newToken
    localStorage.setItem('token', newToken)
  }

  function clearAuth() {
    user.value = null
    token.value = null
    localStorage.removeItem('token')
  }

  async function fetchUser() {
    if (!token.value) return null
    try {
      const response = await apiClient.get('/user')
      user.value = response.data
      return user.value
    } catch (error) {
      clearAuth()
      throw error
    }
  }

  return {
    user,
    token,
    isAuthenticated,
    setToken,
    clearAuth,
    fetchUser
  }
})
