<template>
  <Transition
    enter-active-class="transition-opacity duration-300"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition-opacity duration-300"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div v-if="isLoading" class="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50 backdrop-blur-sm">
      <div class="flex flex-col items-center">
        <Loader2 class="h-10 w-10 text-white animate-spin" />
        <span class="mt-4 text-white font-medium">{{ loadingMessage || 'Loading...' }}</span>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { Loader2 } from 'lucide-vue-next'
import { useLoading } from '../../composables/useLoading'

const { isLoading, loadingMessage } = useLoading()
</script>
