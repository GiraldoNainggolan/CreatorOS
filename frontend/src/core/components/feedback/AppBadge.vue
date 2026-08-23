<template>
  <div
    :class="[
      'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
      variantClasses[variant],
      $attrs.class
    ]"
    v-bind="badgeAttrs"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed, useAttrs } from 'vue'

export interface AppBadgeProps {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline' | 'success' | 'warning'
}

withDefaults(defineProps<AppBadgeProps>(), {
  variant: 'default'
})

const variantClasses = {
  default: 'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
  secondary: 'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
  destructive: 'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
  success: 'border-transparent bg-success text-success-foreground hover:bg-success/80 text-white',
  warning: 'border-transparent bg-warning text-warning-foreground hover:bg-warning/80 text-white',
  outline: 'text-foreground'
}

const attrs = useAttrs()
const badgeAttrs = computed(() => {
  const { class: _, ...rest } = attrs
  return rest
})
</script>

<script lang="ts">
export default {
  inheritAttrs: false
}
</script>
