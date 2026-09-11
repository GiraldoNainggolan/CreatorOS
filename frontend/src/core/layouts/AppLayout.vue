<template>
  <div
    class="min-h-screen font-sans antialiased"
    :class="isDarkShell ? 'bg-[#060810] text-[#F8FAFF]' : 'bg-gray-50 text-gray-900'"
  >
    <router-view />
    <ToastContainer />
    <LoadingOverlay />
    <CommandPalette />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import ToastContainer from '../components/ui/ToastContainer.vue'
import LoadingOverlay from '../components/ui/LoadingOverlay.vue'
import CommandPalette from '../components/ui/CommandPalette.vue'

const route = useRoute()
const isDarkShell = computed(() =>
  route.path === '/' ||
  route.path === '/login' ||
  route.name === 'landing' ||
  route.name === 'login'
)
</script>
