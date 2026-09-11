import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Session, User as SupabaseUser } from '@supabase/supabase-js'
import { supabase, isSupabaseConfigured } from '../api/supabase'
import { apiClient } from '../api/client'

export interface User {
  id: string | number
  email: string
  name?: string
  avatarUrl?: string
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const session = ref<Session | null>(null)
  const token = ref<string | null>(localStorage.getItem('token'))
  const isInitialized = ref(false)
  const isConfigured = computed(() => isSupabaseConfigured())

  const isAuthenticated = computed(() => !!session.value || !!token.value)

  function mapSupabaseUser(sbUser: SupabaseUser): User {
    return {
      id: sbUser.id,
      email: sbUser.email || '',
      name:
        sbUser.user_metadata?.full_name ||
        sbUser.user_metadata?.name ||
        sbUser.email?.split('@')[0] ||
        'Creator'
    }
  }

  function setSession(newSession: Session | null) {
    session.value = newSession
    if (newSession) {
      token.value = newSession.access_token
      localStorage.setItem('token', newSession.access_token)
      if (newSession.user) {
        user.value = mapSupabaseUser(newSession.user)
      }
    } else {
      token.value = null
      user.value = null
      localStorage.removeItem('token')
    }
  }

  function setToken(newToken: string) {
    token.value = newToken
    localStorage.setItem('token', newToken)
  }

  function clearAuth() {
    user.value = null
    session.value = null
    token.value = null
    localStorage.removeItem('token')
  }

  async function initializeAuth() {
    if (isInitialized.value) return
    isInitialized.value = true

    if (!isConfigured.value) {
      return
    }

    try {
      const { data, error } = await supabase.auth.getSession()
      if (error) {
        console.warn('Supabase getSession error:', error.message)
      } else if (data?.session) {
        setSession(data.session)
      }

      supabase.auth.onAuthStateChange((event, currentSession) => {
        if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED' || event === 'USER_UPDATED') {
          if (currentSession) setSession(currentSession)
        } else if (event === 'SIGNED_OUT') {
          clearAuth()
        } else if (currentSession) {
          setSession(currentSession)
        }
      })
    } catch (err) {
      console.warn('Auth initialization skipped:', err)
    }
  }

  async function loginWithSupabase(credentials: { email: string; password: string }) {
    if (!isConfigured.value) {
      throw new Error(
        'Supabase authentication is not configured. Please set VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY.'
      )
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password
    })

    if (error) {
      throw new Error(error.message || 'Authentication failed. Please check your credentials.')
    }

    if (data.session) {
      setSession(data.session)
    }

    return data
  }

  async function logout() {
    if (isConfigured.value) {
      try {
        await supabase.auth.signOut()
      } catch (err) {
        console.warn('Sign out error:', err)
      }
    }
    clearAuth()
  }

  // Backward compatibility with local API/Laravel flow if needed
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
    if (isConfigured.value) {
      return await loginWithSupabase(credentials)
    }

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
    session,
    token,
    isInitialized,
    isConfigured,
    isAuthenticated,
    setSession,
    setToken,
    clearAuth,
    initializeAuth,
    loginWithSupabase,
    logout,
    fetchUser,
    login
  }
})
