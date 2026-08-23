<template>
  <div class="h-screen flex overflow-hidden bg-gray-50">
    <!-- Sidebar -->
    <AppSidebar class="hidden md:flex md:flex-shrink-0" />
    
    <div class="flex flex-col w-0 flex-1 overflow-hidden">
      <!-- Top Navigation -->
      <AppTopNav />

      <!-- Main Content -->
      <main class="flex-1 relative z-0 overflow-y-auto focus:outline-none">
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
import AppSidebar from '../components/layout/AppSidebar.vue'
import AppTopNav from '../components/layout/AppTopNav.vue'
</script>
