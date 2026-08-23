<template>
  <div class="min-h-screen bg-gray-50 text-gray-900 font-sans antialiased">
    <router-view />
    <ToastContainer />
    <LoadingOverlay />
    <CommandPalette />
  </div>
</template>

<script setup lang="ts">
import ToastContainer from '../components/ui/ToastContainer.vue'
import LoadingOverlay from '../components/ui/LoadingOverlay.vue'
import CommandPalette from '../components/ui/CommandPalette.vue'
</script>
