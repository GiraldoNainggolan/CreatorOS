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

  async function login(credentials: { email: string; password: string }) {
    const response = await apiClient.post('/login', credentials)
    const authToken = response.data?.token || response.data?.access_token || response.data?.data?.token
    if (authToken) {
      setToken(authToken)
    }
    if (response.data?.user || response.data?.data?.user) {
      user.value = response.data?.user || response.data?.data?.user
    } else {
      await fetchUser().catch(() => {})
    }
    return response.data
  }

  return {
    user,
    token,
    isAuthenticated,
    setToken,
    clearAuth,
    fetchUser,
    login
  }
})
