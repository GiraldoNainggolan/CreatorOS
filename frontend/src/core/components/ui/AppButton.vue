<template>
  <button
    :class="[
      'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
      variantClasses[variant],
      sizeClasses[size],
      $attrs.class
    ]"
    :disabled="disabled || loading"
    v-bind="$attrs"
  >
    <slot name="prefix">
      <component
        :is="icon"
        v-if="icon && !loading"
        class="mr-2 h-4 w-4"
      />
    </slot>
    
    <span v-if="loading" class="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
    
    <slot />
    
    <slot name="suffix" />
  </button>
</template>

<script setup lang="ts">
import { type Component } from 'vue'

export interface AppButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'destructive' | 'outline' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  disabled?: boolean
  loading?: boolean
  icon?: Component
}

withDefaults(defineProps<AppButtonProps>(), {
  variant: 'primary',
  size: 'default',
  disabled: false,
  loading: false
})

const variantClasses = {
  primary: 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm',
  secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
  destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-sm',
  outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground shadow-sm',
  ghost: 'hover:bg-accent hover:text-accent-foreground',
  link: 'text-primary underline-offset-4 hover:underline'
}

const sizeClasses = {
  default: 'h-9 px-4 py-2',
  sm: 'h-8 rounded-md px-3 text-xs',
  lg: 'h-10 rounded-md px-8',
  icon: 'h-9 w-9'
}
</script>

<script lang="ts">
export default {
  inheritAttrs: false
}
</script>
