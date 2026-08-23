<template>
  <div class="rounded-xl border bg-card text-card-foreground shadow">
    <div v-if="$slots.header || title || description" class="flex flex-col space-y-1.5 p-6">
      <slot name="header">
        <h3 v-if="title" class="font-semibold leading-none tracking-tight">
          {{ title }}
        </h3>
        <p v-if="description" class="text-sm text-muted-foreground">
          {{ description }}
        </p>
      </slot>
    </div>
    
    <div class="p-6 pt-0">
      <slot />
    </div>
    
    <div v-if="$slots.footer" class="flex items-center p-6 pt-0">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
export interface AppCardProps {
  title?: string
  description?: string
}

defineProps<AppCardProps>()
</script>
