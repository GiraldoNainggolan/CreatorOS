<template>
  <div class="fixed bottom-0 right-0 z-50 p-4 space-y-4 sm:p-6 w-full sm:max-w-sm pointer-events-none">
    <TransitionGroup
      enter-active-class="transform ease-out duration-300 transition"
      enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
      enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
      leave-active-class="transition ease-in duration-100"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-for="toast in toasts"
        :key="toast.id"
        class="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5"
      >
        <div class="p-4">
          <div class="flex items-start">
            <div class="flex-shrink-0">
              <CheckCircle v-if="toast.type === 'success'" class="h-6 w-6 text-green-400" />
              <AlertCircle v-else-if="toast.type === 'error'" class="h-6 w-6 text-red-400" />
              <Info v-else-if="toast.type === 'info'" class="h-6 w-6 text-blue-400" />
              <AlertTriangle v-else class="h-6 w-6 text-yellow-400" />
            </div>
            <div class="ml-3 w-0 flex-1 pt-0.5">
              <p class="text-sm font-medium text-gray-900">{{ toast.message }}</p>
            </div>
            <div class="ml-4 flex flex-shrink-0">
              <button
                @click="removeToast(toast.id)"
                class="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none"
              >
                <span class="sr-only">Close</span>
                <X class="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import { useToast } from '../../composables/useToast'
import { CheckCircle, AlertCircle, Info, AlertTriangle, X } from 'lucide-vue-next'

const { toasts, removeToast } = useToast()
</script>
