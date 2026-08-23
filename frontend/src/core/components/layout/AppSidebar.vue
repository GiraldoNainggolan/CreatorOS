<template>
  <div class="flex flex-col w-64 shrink-0 h-screen">
    <div class="flex flex-col h-full flex-1 border-r border-border bg-card">
      <div class="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
        <div class="flex items-center flex-shrink-0 px-4 mb-6">
          <span class="text-xl font-bold text-foreground tracking-tight">TCOS</span>
        </div>
        
        <nav class="flex-1 px-3 space-y-6">
          
          <!-- Primary Navigation -->
          <div class="space-y-1">
            <router-link
              v-for="item in primaryNavigation"
              :key="item.name"
              :to="item.href"
              :class="[
                isRouteActive(item.href)
                  ? 'bg-primary/10 text-primary font-semibold'
                  : 'text-muted-foreground hover:bg-secondary hover:text-secondary-foreground font-medium',
                'group flex items-center px-3 py-2 text-sm rounded-md transition-colors'
              ]"
            >
              <component
                :is="item.icon"
                :class="[
                  isRouteActive(item.href) ? 'text-primary' : 'text-muted-foreground group-hover:text-secondary-foreground',
                  'mr-3 flex-shrink-0 h-5 w-5'
                ]"
                aria-hidden="true"
              />
              {{ item.name }}
            </router-link>
          </div>

          <!-- Workspace Groups -->
          <div v-for="group in workspaceGroups" :key="group.name" class="space-y-1">
            <h3 class="px-3 text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">
              {{ group.name }}
            </h3>
            <router-link
              v-for="item in group.items"
              :key="item.name"
              :to="item.href"
              :class="[
                isRouteActive(item.href)
                  ? 'bg-accent text-accent-foreground font-semibold'
                  : 'text-muted-foreground hover:bg-secondary hover:text-secondary-foreground font-medium',
                'group flex items-center px-3 py-1.5 text-sm rounded-md transition-colors'
              ]"
            >
              {{ item.name }}
            </router-link>
          </div>

        </nav>
      </div>
      
      <!-- Settings & Profile -->
      <div class="flex-shrink-0 border-t border-border p-4 space-y-1">
        <a href="#" class="group flex items-center px-3 py-2 text-sm font-medium text-muted-foreground rounded-md hover:bg-secondary hover:text-secondary-foreground">
          <Settings class="mr-3 h-5 w-5" />
          Settings
        </a>
        <a href="#" class="group flex items-center px-3 py-2 text-sm font-medium text-muted-foreground rounded-md hover:bg-secondary hover:text-secondary-foreground">
          <User class="mr-3 h-5 w-5" />
          Profile
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { LayoutDashboard, Sparkles, FolderKanban, Settings, User } from 'lucide-vue-next'
import { useRoute } from 'vue-router'

const route = useRoute()

const isRouteActive = (href: string) => {
  if (href === '/' && route.path === '/') return true
  if (href !== '/' && route.path.startsWith(href)) return true
  return false
}

const primaryNavigation = ref([
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Generate', href: '/generate', icon: Sparkles },
  { name: 'Content Pipeline', href: '/content', icon: FolderKanban },
])

const workspaceGroups = ref([
  {
    name: 'Content System',
    items: [
      { name: 'Brand', href: '/workspace/brand' },
      { name: 'Audience', href: '/workspace/audience' },
      { name: 'Content System', href: '/workspace/system' },
    ]
  },
  {
    name: 'Production',
    items: [
      { name: 'Script', href: '/workspace/script' },
      { name: 'Recording', href: '/workspace/recording' },
      { name: 'Editing', href: '/workspace/editing' },
      { name: 'Posting', href: '/workspace/posting' },
    ]
  },
  {
    name: 'Intelligence',
    items: [
      { name: 'Analytics', href: '/workspace/analytics' },
      { name: 'Repurpose', href: '/workspace/repurpose' },
      { name: 'AI Library', href: '/workspace/ai' },
      { name: 'Knowledge Base', href: '/workspace/knowledge' },
    ]
  },
  {
    name: 'Business',
    items: [
      { name: 'Digital Product', href: '/workspace/products' },
      { name: 'Portfolio', href: '/workspace/portfolio' },
      { name: 'Business', href: '/workspace/business' },
    ]
  },
  {
    name: 'Operations',
    items: [
      { name: 'Asset Library', href: '/workspace/assets' },
      { name: 'Archive', href: '/workspace/archive' },
      { name: 'SOP', href: '/workspace/sop' },
    ]
  }
])
</script>
