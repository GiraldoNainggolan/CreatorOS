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
  if (href === '/app' && route.path === '/app') return true
  if (href !== '/app' && route.path.startsWith(href)) return true
  return false
}

const primaryNavigation = ref([
  { name: 'Dashboard', href: '/app', icon: LayoutDashboard },
  { name: 'Generate', href: '/app/generate', icon: Sparkles },
  { name: 'Content Pipeline', href: '/app/content', icon: FolderKanban },
])

const workspaceGroups = ref([
  {
    name: 'Content System',
    items: [
      { name: 'Brand', href: '/app/workspace/brand' },
      { name: 'Audience', href: '/app/workspace/audience' },
      { name: 'Content System', href: '/app/workspace/system' },
    ]
  },
  {
    name: 'Production',
    items: [
      { name: 'Script', href: '/app/workspace/script' },
      { name: 'Recording', href: '/app/workspace/recording' },
      { name: 'Editing', href: '/app/workspace/editing' },
      { name: 'Posting', href: '/app/workspace/posting' },
    ]
  },
  {
    name: 'Intelligence',
    items: [
      { name: 'Analytics', href: '/app/workspace/analytics' },
      { name: 'Repurpose', href: '/app/workspace/repurpose' },
      { name: 'AI Library', href: '/app/workspace/ai' },
      { name: 'Knowledge Base', href: '/app/workspace/knowledge' },
    ]
  },
  {
    name: 'Business',
    items: [
      { name: 'Digital Product', href: '/app/workspace/products' },
      { name: 'Portfolio', href: '/app/workspace/portfolio' },
      { name: 'Business', href: '/app/workspace/business' },
    ]
  },
  {
    name: 'Operations',
    items: [
      { name: 'Asset Library', href: '/app/workspace/assets' },
      { name: 'Archive', href: '/app/workspace/archive' },
      { name: 'SOP', href: '/app/workspace/sop' },
    ]
  }
])
</script>
