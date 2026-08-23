<template>
  <div
    role="alert"
    :class="[
      'relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground',
      variantClasses[variant],
      $attrs.class
    ]"
    v-bind="alertAttrs"
  >
    <slot name="icon" />
    <h5 v-if="title" class="mb-1 font-medium leading-none tracking-tight">
      {{ title }}
    </h5>
    <div class="text-sm [&_p]:leading-relaxed">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, useAttrs } from 'vue'

export interface AppAlertProps {
  title?: string
  variant?: 'default' | 'destructive' | 'success' | 'warning'
}

withDefaults(defineProps<AppAlertProps>(), {
  variant: 'default'
})

const variantClasses = {
  default: 'bg-background text-foreground',
  destructive: 'border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive',
  success: 'border-success/50 text-success dark:border-success [&>svg]:text-success',
  warning: 'border-warning/50 text-warning dark:border-warning [&>svg]:text-warning',
}

const attrs = useAttrs()
const alertAttrs = computed(() => {
  const { class: _, ...rest } = attrs
  return rest
})
</script>

<script lang="ts">
export default {
  inheritAttrs: false
}
</script>
