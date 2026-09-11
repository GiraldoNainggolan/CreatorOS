<template>
  <aside class="flex flex-col w-64 shrink-0 h-screen border-r border-border bg-card select-none">
    <!-- Header / Brand -->
    <div class="h-16 flex items-center justify-between px-5 border-b border-border">
      <router-link to="/app" class="flex items-center gap-2.5 group">
        <div class="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-extrabold text-sm shadow-sm group-hover:scale-105 transition-transform">
          GN
        </div>
        <div class="flex flex-col">
          <span class="text-base font-bold text-foreground tracking-tight leading-tight">CreatorOS</span>
          <span class="text-[10px] text-muted-foreground font-mono leading-tight">Operating System</span>
        </div>
      </router-link>
      <AppBadge variant="secondary" class="font-mono text-[10px] uppercase">v1.1</AppBadge>
    </div>
    
    <!-- Navigation Scroller -->
    <div class="flex-1 overflow-y-auto custom-scrollbar py-4 px-3 space-y-6">
      <!-- Primary Core Nav -->
      <div class="space-y-1">
        <router-link
          v-for="item in primaryNavigation"
          :key="item.name"
          :to="item.href"
          :class="[
            isRouteActive(item.href)
              ? 'bg-primary/10 text-primary font-semibold border-l-2 border-primary'
              : 'text-muted-foreground hover:bg-secondary hover:text-foreground font-medium',
            'group flex items-center px-3 py-2 text-xs rounded-md transition-colors'
          ]"
        >
          <component
            :is="item.icon"
            :class="[
              isRouteActive(item.href) ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground',
              'mr-2.5 flex-shrink-0 h-4 w-4 transition-colors'
            ]"
            aria-hidden="true"
          />
          <span class="flex-1">{{ item.name }}</span>
          <span v-if="item.badge" class="ml-auto text-[10px] font-mono px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
            {{ item.badge }}
          </span>
        </router-link>
      </div>

      <!-- Workspace Groups -->
      <div v-for="group in workspaceGroups" :key="group.name" class="space-y-1">
        <h3 class="px-3 text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1.5 flex items-center justify-between">
          <span>{{ group.name }}</span>
          <span class="font-mono text-[9px] text-muted-foreground/60">{{ group.items.length }}</span>
        </h3>
        <router-link
          v-for="item in group.items"
          :key="item.name"
          :to="item.href"
          :class="[
            isRouteActive(item.href)
              ? 'bg-primary/10 text-primary font-semibold border-l-2 border-primary'
              : 'text-muted-foreground hover:bg-secondary hover:text-foreground font-medium',
            'group flex items-center px-3 py-1.5 text-xs rounded-md transition-colors'
          ]"
        >
          <span class="truncate flex-1">{{ item.name }}</span>
          <span v-if="item.tag" class="text-[9px] font-mono px-1 rounded bg-secondary text-muted-foreground ml-1">
            {{ item.tag }}
          </span>
        </router-link>
      </div>
    </div>
    
    <!-- User Account Summary & Bottom Actions -->
    <div class="flex-shrink-0 border-t border-border p-3 space-y-1 bg-card">
      <!-- User Summary Card -->
      <div class="px-3 py-2 rounded-lg bg-secondary/50 flex items-center gap-2.5 mb-1.5">
        <div class="h-7 w-7 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold text-[11px] shrink-0">
          {{ userInitials }}
        </div>
        <div class="flex flex-col min-w-0 flex-1">
          <span class="text-xs font-semibold text-foreground truncate leading-tight">{{ userName }}</span>
          <span class="text-[10px] text-muted-foreground truncate leading-tight">{{ userEmail }}</span>
        </div>
      </div>

      <!-- Settings & Profile Links -->
      <router-link 
        to="/app/settings" 
        :class="[
          isRouteActive('/app/settings') ? 'bg-primary/10 text-primary font-semibold' : 'text-muted-foreground hover:bg-secondary hover:text-foreground',
          'group flex items-center px-3 py-1.5 text-xs font-medium rounded-md transition-colors'
        ]"
      >
        <Settings class="mr-2.5 h-4 w-4 text-muted-foreground group-hover:text-foreground" />
        Settings
      </router-link>

      <router-link 
        to="/app/profile" 
        :class="[
          isRouteActive('/app/profile') ? 'bg-primary/10 text-primary font-semibold' : 'text-muted-foreground hover:bg-secondary hover:text-foreground',
          'group flex items-center px-3 py-1.5 text-xs font-medium rounded-md transition-colors'
        ]"
      >
        <User class="mr-2.5 h-4 w-4 text-muted-foreground group-hover:text-foreground" />
        Profile
      </router-link>

      <!-- Logout Button -->
      <button 
        type="button"
        class="w-full group flex items-center px-3 py-1.5 text-xs font-medium text-red-500 hover:text-red-600 hover:bg-red-500/10 rounded-md transition-colors"
        :disabled="isLoggingOut"
        @click="handleLogout"
      >
        <LogOut class="mr-2.5 h-4 w-4 text-red-500" />
        {{ isLoggingOut ? 'Logging out...' : 'Log Out' }}
      </button>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { 
  LayoutDashboard, 
  Sparkles, 
  FolderKanban, 
  Settings, 
  User, 
  LogOut 
} from 'lucide-vue-next'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/core/stores/auth'
import AppBadge from '@/core/components/feedback/AppBadge.vue'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const isLoggingOut = ref(false)

const userName = computed(() => {
  return authStore.user?.name || 'Creator'
})

const userEmail = computed(() => {
  return authStore.user?.email || 'creator@creatoros.com'
})

const userInitials = computed(() => {
  const name = userName.value
  return name.substring(0, 2).toUpperCase()
})

const isRouteActive = (href: string) => {
  if (href === '/app') {
    return route.path === '/app'
  }
  return route.path === href || route.path.startsWith(href + '/')
}

async function handleLogout() {
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

const primaryNavigation = [
  { name: 'Dashboard', href: '/app', icon: LayoutDashboard, badge: 'Home' },
  { name: 'Generate', href: '/app/generate', icon: Sparkles, badge: 'AI' },
  { name: 'Content Pipeline', href: '/app/content', icon: FolderKanban, badge: 'Kanban' },
]

const workspaceGroups = [
  {
    name: 'Content System',
    items: [
      { name: 'Brand', href: '/app/workspace/brand', tag: '01' },
      { name: 'Audience', href: '/app/workspace/audience', tag: '02' },
      { name: 'Content System', href: '/app/workspace/system', tag: '03' },
    ]
  },
  {
    name: 'Production',
    items: [
      { name: 'Script', href: '/app/workspace/script', tag: '04' },
      { name: 'Recording', href: '/app/workspace/recording', tag: '05' },
      { name: 'Editing', href: '/app/workspace/editing', tag: '06' },
      { name: 'Posting', href: '/app/workspace/posting', tag: '07' },
    ]
  },
  {
    name: 'Intelligence',
    items: [
      { name: 'Analytics', href: '/app/workspace/analytics', tag: '08' },
      { name: 'Repurpose', href: '/app/workspace/repurpose', tag: '11' },
      { name: 'AI Library', href: '/app/workspace/ai', tag: '13' },
      { name: 'Knowledge Base', href: '/app/workspace/knowledge', tag: '14' },
    ]
  },
  {
    name: 'Business',
    items: [
      { name: 'Digital Product', href: '/app/workspace/products', tag: '09' },
      { name: 'Portfolio', href: '/app/workspace/portfolio', tag: '10' },
      { name: 'Business', href: '/app/workspace/business', tag: '16' },
    ]
  },
  {
    name: 'Operations',
    items: [
      { name: 'Asset Library', href: '/app/workspace/assets', tag: '15' },
      { name: 'Archive', href: '/app/workspace/archive', tag: '12' },
      { name: 'SOP', href: '/app/workspace/sop', tag: '17' },
    ]
  }
]
</script>
