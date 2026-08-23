<template>
  <div
    :class="[
      'relative flex shrink-0 overflow-hidden rounded-full',
      sizeClasses[size],
      $attrs.class
    ]"
  >
    <img
      v-if="src && !imageError"
      :src="src"
      :alt="alt"
      class="aspect-square h-full w-full object-cover"
      @error="imageError = true"
    />
    <div
      v-else
      class="flex h-full w-full items-center justify-center rounded-full bg-muted text-muted-foreground"
    >
      <span class="font-medium" :class="textClasses[size]">{{ fallbackText }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

export interface AppAvatarProps {
  src?: string
  alt?: string
  fallback?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

const props = withDefaults(defineProps<AppAvatarProps>(), {
  size: 'md',
  alt: 'Avatar'
})

const imageError = ref(false)

const fallbackText = computed(() => {
  if (props.fallback) return props.fallback.substring(0, 2).toUpperCase()
  if (props.alt && props.alt !== 'Avatar') return props.alt.substring(0, 2).toUpperCase()
  return '??'
})

const sizeClasses = {
  sm: 'h-8 w-8',
  md: 'h-10 w-10',
  lg: 'h-12 w-12',
  xl: 'h-16 w-16'
}

const textClasses = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-base',
  xl: 'text-lg'
}
</script>
