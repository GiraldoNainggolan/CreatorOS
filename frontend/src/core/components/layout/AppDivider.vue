<template>
  <div 
    role="separator" 
    :aria-orientation="orientation" 
    :class="[
      'shrink-0 bg-border',
      orientation === 'horizontal' ? 'h-[1px] w-full' : 'h-full w-[1px]',
      $attrs.class
    ]"
  />
</template>

<script setup lang="ts">
export interface AppDividerProps {
  orientation?: 'horizontal' | 'vertical'
}

withDefaults(defineProps<AppDividerProps>(), {
  orientation: 'horizontal'
})
</script>
