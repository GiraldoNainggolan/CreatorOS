<template>
  <div class="relative z-30 flex-shrink-0 flex h-16 bg-background shadow-sm border-b border-border">
    <div class="flex-1 px-4 sm:px-6 flex justify-between items-center">
      <!-- Left side: Mobile menu toggle & Breadcrumbs -->
      <div class="flex items-center gap-3">
        <button 
          type="button" 
          class="md:hidden p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
          @click="$emit('toggle-mobile-sidebar')"
        >
          <Menu class="h-5 w-5" aria-hidden="true" />
        </button>

        <div class="hidden sm:flex items-center gap-2 text-xs text-muted-foreground">
          <span class="font-medium text-foreground">CreatorOS</span>
          <span>/</span>
          <span class="capitalize">{{ currentRouteName }}</span>
        </div>
      </div>

      <!-- Right side: Notifications & User Profile Menu -->
      <div class="flex items-center gap-3">
        <!-- Notifications Button -->
        <button 
          type="button"
          class="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors relative"
          title="Notifications"
        >
          <Bell class="h-4 w-4" />
          <span class="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-background"></span>
        </button>

        <!-- User Profile Dropdown -->
        <div class="relative" ref="dropdownRef">
          <button 
            type="button" 
            class="flex items-center gap-2.5 p-1.5 rounded-lg hover:bg-secondary transition-colors focus:outline-none"
            @click="isDropdownOpen = !isDropdownOpen"
          >
            <div class="h-8 w-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold text-xs">
              {{ userInitials }}
            </div>
            <div class="hidden lg:flex flex-col text-left">
              <span class="text-xs font-semibold text-foreground leading-tight">{{ userName }}</span>
              <span class="text-[10px] text-muted-foreground leading-tight">{{ userEmailTruncated }}</span>
            </div>
            <ChevronDown class="w-3.5 h-3.5 text-muted-foreground hidden lg:block transition-transform duration-200" :class="{ 'rotate-180': isDropdownOpen }" />
          </button>

          <!-- Dropdown Menu -->
          <div 
            v-if="isDropdownOpen"
            class="absolute right-0 mt-2 w-64 rounded-xl bg-card border border-border shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
          >
            <!-- User Info Header -->
            <div class="px-4 py-2.5 border-b border-border">
              <div class="font-semibold text-sm text-foreground">{{ userName }}</div>
              <div class="text-xs text-muted-foreground truncate">{{ userEmail }}</div>
              <div class="mt-2 inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
                <span class="h-1.5 w-1.5 rounded-full bg-emerald-500"></span> Supabase Authenticated
              </div>
            </div>

            <!-- Menu Navigation Links -->
            <div class="py-1">
              <router-link 
                to="/app/profile" 
                class="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-foreground hover:bg-secondary transition-colors"
                @click="isDropdownOpen = false"
              >
                <User class="w-4 h-4 text-muted-foreground" />
                Profile & Account
              </router-link>

              <router-link 
                to="/app/settings" 
                class="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-foreground hover:bg-secondary transition-colors"
                @click="isDropdownOpen = false"
              >
                <Settings class="w-4 h-4 text-muted-foreground" />
                Settings & API
              </router-link>
            </div>

            <div class="border-t border-border my-1"></div>

            <!-- Logout Action -->
            <div class="px-2 py-1">
              <button 
                type="button"
                class="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-red-500 hover:text-red-600 hover:bg-red-500/10 rounded-lg transition-colors"
                :disabled="isLoggingOut"
                @click="handleLogout"
              >
                <LogOut class="w-4 h-4" />
                <span>{{ isLoggingOut ? 'Logging out...' : 'Log Out' }}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Bell, Menu, ChevronDown, User, Settings, LogOut } from 'lucide-vue-next'
import { useAuthStore } from '@/core/stores/auth'

defineEmits<{
  (e: 'toggle-mobile-sidebar'): void
}>()

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

const isDropdownOpen = ref(false)
const isLoggingOut = ref(false)
const dropdownRef = ref<HTMLElement | null>(null)

const currentRouteName = computed(() => {
  if (route.name) return String(route.name)
  const segments = route.path.split('/').filter(Boolean)
  return segments[segments.length - 1] || 'Dashboard'
})

const userName = computed(() => {
  return authStore.user?.name || 'Creator'
})

const userEmail = computed(() => {
  return authStore.user?.email || 'creator@creatoros.com'
})

const userEmailTruncated = computed(() => {
  const email = userEmail.value
  if (email.length > 20) {
    return email.substring(0, 18) + '...'
  }
  return email
})

const userInitials = computed(() => {
  const name = userName.value
  return name.substring(0, 2).toUpperCase()
})

async function handleLogout() {
  if (isLoggingOut.value) return
  isLoggingOut.value = true
  try {
    await authStore.logout()
    isDropdownOpen.value = false
    router.push('/login')
  } catch (err) {
    console.error('Logout failed:', err)
  } finally {
    isLoggingOut.value = false
  }
}

function handleClickOutside(e: MouseEvent) {
  if (dropdownRef.value && !dropdownRef.value.contains(e.target as Node)) {
    isDropdownOpen.value = false
  }
}

function handleKeyDown(e: KeyboardEvent) {
  if (e.key === 'Escape') {
    isDropdownOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  document.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  document.removeEventListener('keydown', handleKeyDown)
})
</script>
