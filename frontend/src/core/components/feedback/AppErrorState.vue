<template>
  <div :class="['flex min-h-[400px] flex-col items-center justify-center rounded-md border border-destructive/20 bg-destructive/5 p-8 text-center animate-in fade-in-50', $attrs.class]">
    <div class="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
      <div class="flex h-20 w-20 items-center justify-center rounded-full bg-destructive/10 text-destructive mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-10 w-10"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
      </div>
      
      <h3 v-if="title" class="text-lg font-semibold text-destructive">{{ title }}</h3>
      <h3 v-else class="text-lg font-semibold text-destructive">Something went wrong</h3>
      
      <p v-if="description" class="mb-4 mt-2 text-sm text-muted-foreground">
        {{ description }}
      </p>
      
      <div v-if="$slots.action" class="mt-4">
        <slot name="action" />
      </div>
      <div v-else-if="retry" class="mt-4">
        <button 
          @click="$emit('retry')"
          class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-destructive text-destructive-foreground hover:bg-destructive/90 h-10 px-4 py-2"
        >
          Try again
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
export interface AppErrorStateProps {
  title?: string
  description?: string
  retry?: boolean
}

withDefaults(defineProps<AppErrorStateProps>(), {
  retry: false
})

defineEmits<{
  (e: 'retry'): void
}>()
</script>
