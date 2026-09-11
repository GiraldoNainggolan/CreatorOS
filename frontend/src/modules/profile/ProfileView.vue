<template>
  <div class="max-w-4xl space-y-8 pb-16">
    <!-- Header -->
    <div class="border-b border-border pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-3xl font-bold tracking-tight text-foreground">User Profile</h1>
        <p class="text-muted-foreground mt-1 text-sm">Manage your CreatorOS account identity and authenticated session.</p>
      </div>
      <div class="flex items-center gap-3">
        <AppButton 
          variant="outline" 
          class="text-red-500 hover:text-red-600 hover:bg-red-500/10 gap-1.5"
          :disabled="isLoggingOut"
          @click="handleSignOut"
        >
          <LogOut class="w-4 h-4" />
          {{ isLoggingOut ? 'Signing out...' : 'Sign Out' }}
        </AppButton>
      </div>
    </div>

    <!-- Profile Overview Card -->
    <AppCard class="p-6">
      <div class="flex flex-col sm:flex-row items-start sm:items-center gap-6">
        <div class="relative">
          <div class="h-20 w-20 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center text-primary font-bold text-2xl">
            {{ userInitials }}
          </div>
          <span class="absolute bottom-0 right-0 h-5 w-5 rounded-full bg-emerald-500 border-2 border-card"></span>
        </div>

        <div class="space-y-1 flex-1">
          <div class="flex items-center gap-3">
            <h2 class="text-xl font-bold text-foreground">{{ userDisplayName }}</h2>
            <AppBadge variant="default" class="text-xs">Creator Admin</AppBadge>
          </div>
          <p class="text-sm text-muted-foreground">{{ userEmail }}</p>
          <div class="flex items-center gap-2 pt-1 text-xs text-muted-foreground">
            <span class="inline-flex items-center gap-1">
              <ShieldCheck class="w-3.5 h-3.5 text-emerald-500" /> Supabase Authenticated
            </span>
            <span>•</span>
            <span class="font-mono text-[11px]">ID: {{ userId }}</span>
          </div>
        </div>
      </div>
    </AppCard>

    <!-- Account Details & Niche Settings -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <AppCard class="p-6 space-y-4">
        <h3 class="font-bold text-base text-foreground flex items-center gap-2">
          <User class="w-4 h-4 text-primary" /> Personal Information
        </h3>
        <div class="space-y-3 text-sm">
          <div>
            <div class="text-xs text-muted-foreground">Full Name</div>
            <div class="font-medium text-foreground">{{ userDisplayName }}</div>
          </div>
          <div>
            <div class="text-xs text-muted-foreground">Email Address</div>
            <div class="font-medium text-foreground">{{ userEmail }}</div>
          </div>
          <div>
            <div class="text-xs text-muted-foreground">Default Creator Niche</div>
            <div class="font-medium text-foreground">Software Engineering & AI Architecture</div>
          </div>
          <div>
            <div class="text-xs text-muted-foreground">Primary Channels</div>
            <div class="font-medium text-foreground">YouTube, Instagram Reels, LinkedIn</div>
          </div>
        </div>
      </AppCard>

      <AppCard class="p-6 space-y-4">
        <h3 class="font-bold text-base text-foreground flex items-center gap-2">
          <Key class="w-4 h-4 text-primary" /> Security & Session
        </h3>
        <div class="space-y-3 text-sm">
          <div>
            <div class="text-xs text-muted-foreground">Auth Provider</div>
            <div class="font-medium text-foreground">Supabase Identity Service</div>
          </div>
          <div>
            <div class="text-xs text-muted-foreground">Session Status</div>
            <div class="font-medium text-emerald-600 flex items-center gap-1">
              <span class="h-2 w-2 rounded-full bg-emerald-500"></span> Active & Verified
            </div>
          </div>
          <div>
            <div class="text-xs text-muted-foreground">Local Session Storage</div>
            <div class="font-mono text-xs text-foreground">Bearer Token Active</div>
          </div>
          <div class="pt-2">
            <AppButton variant="outline" size="sm" class="w-full text-xs">
              Change Account Password
            </AppButton>
          </div>
        </div>
      </AppCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { LogOut, ShieldCheck, User, Key } from 'lucide-vue-next'
import { useAuthStore } from '@/core/stores/auth'
import AppCard from '@/core/components/layout/AppCard.vue'
import AppButton from '@/core/components/ui/AppButton.vue'
import AppBadge from '@/core/components/feedback/AppBadge.vue'

const router = useRouter()
const authStore = useAuthStore()
const isLoggingOut = ref(false)

const userDisplayName = computed(() => {
  return authStore.user?.name || 'Creator'
})

const userEmail = computed(() => {
  return authStore.user?.email || 'authenticated@creatoros.com'
})

const userId = computed(() => {
  return authStore.user?.id ? String(authStore.user.id).substring(0, 18) + '...' : 'sb-auth-user'
})

const userInitials = computed(() => {
  const name = userDisplayName.value
  return name.substring(0, 2).toUpperCase()
})

async function handleSignOut() {
  if (isLoggingOut.value) return
  isLoggingOut.value = true
  try {
    await authStore.logout()
    router.push('/login')
  } catch (err) {
    console.error('Logout error:', err)
  } finally {
    isLoggingOut.value = false
  }
}
</script>
