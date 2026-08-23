<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    :class="[
      'animate-spin',
      sizeClasses[size],
      $attrs.class
    ]"
  >
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </svg>
</template>

<script setup lang="ts">
export interface AppSpinnerProps {
  size?: 'sm' | 'default' | 'lg' | 'xl'
}

withDefaults(defineProps<AppSpinnerProps>(), {
  size: 'default'
})

const sizeClasses = {
  sm: 'h-4 w-4',
  default: 'h-6 w-6',
  lg: 'h-8 w-8',
  xl: 'h-12 w-12'
}
</script>
