<template>
  <div :class="['flex min-h-[400px] flex-col items-center justify-center rounded-md border border-dashed p-8 text-center animate-in fade-in-50', $attrs.class]">
    <div class="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
      <div v-if="$slots.icon" class="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
        <slot name="icon" />
      </div>
      
      <h3 v-if="title" class="mt-4 text-lg font-semibold">{{ title }}</h3>
      <p v-if="description" class="mb-4 mt-2 text-sm text-muted-foreground">
        {{ description }}
      </p>
      
      <div v-if="$slots.action" class="mt-4">
        <slot name="action" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
export interface AppEmptyStateProps {
  title?: string
  description?: string
}

defineProps<AppEmptyStateProps>()
</script>
