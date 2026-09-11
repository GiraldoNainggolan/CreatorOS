<template>
  <div class="h-screen flex overflow-hidden bg-background text-foreground">
    <!-- Desktop Sidebar -->
    <AppSidebar class="hidden md:flex md:flex-shrink-0" />

    <!-- Mobile Sidebar Drawer Overlay -->
    <div 
      v-if="isMobileOpen" 
      class="fixed inset-0 z-50 flex md:hidden"
    >
      <!-- Backdrop -->
      <div 
        class="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
        @click="isMobileOpen = false"
      ></div>

      <!-- Drawer Content -->
      <div class="relative flex-1 flex flex-col max-w-xs w-full bg-card shadow-2xl z-10">
        <div class="absolute top-3 right-3">
          <button 
            type="button" 
            class="p-2 rounded-md text-muted-foreground hover:text-foreground"
            @click="isMobileOpen = false"
          >
            <X class="w-5 h-5" />
          </button>
        </div>
        <AppSidebar class="w-full h-full" />
      </div>
    </div>
    
    <div class="flex flex-col w-0 flex-1 overflow-hidden">
      <!-- Top Navigation -->
      <AppTopNav @toggle-mobile-sidebar="isMobileOpen = !isMobileOpen" />

      <!-- Main Content -->
      <main class="flex-1 relative z-0 overflow-y-auto focus:outline-none custom-scrollbar">
        <div class="py-6">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <router-view />
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { X } from 'lucide-vue-next'
import AppSidebar from '../components/layout/AppSidebar.vue'
import AppTopNav from '../components/layout/AppTopNav.vue'

const route = useRoute()
const isMobileOpen = ref(false)

// Close mobile drawer on route change
watch(() => route.path, () => {
  isMobileOpen.value = false
})
</script>
