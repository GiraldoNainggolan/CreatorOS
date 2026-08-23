<template>
  <div class="space-y-2" :class="$attrs.class">
    <label v-if="label" :for="id" class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" :class="error ? 'text-destructive' : 'text-foreground'">
      {{ label }}
    </label>
    
    <div class="relative">
      <select
        :id="id"
        ref="selectRef"
        :value="modelValue"
        @change="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
        :disabled="disabled"
        :class="[
          'flex h-9 w-full appearance-none rounded-md border bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50 pr-8',
          error ? 'border-destructive focus-visible:ring-destructive' : 'border-input focus-visible:ring-ring',
          selectClass
        ]"
        v-bind="selectAttrs"
      >
        <option v-if="placeholder" value="" disabled selected hidden>{{ placeholder }}</option>
        <option v-for="option in options" :key="typeof option === 'string' ? option : option.value" :value="typeof option === 'string' ? option : option.value">
          {{ typeof option === 'string' ? option : option.label }}
        </option>
      </select>
      
      <!-- Custom Chevron for Select -->
      <div class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4 opacity-50"><path d="m6 9 6 6 6-6"/></svg>
      </div>
    </div>
    
    <p v-if="error" class="text-[0.8rem] font-medium text-destructive">
      {{ error }}
    </p>
    <p v-else-if="hint" class="text-[0.8rem] text-muted-foreground">
      {{ hint }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, useAttrs } from 'vue'

export interface SelectOption {
  label: string
  value: string | number
}

export interface AppSelectProps {
  modelValue?: string | number
  options: (string | SelectOption)[]
  id?: string
  label?: string
  placeholder?: string
  error?: string
  hint?: string
  disabled?: boolean
  selectClass?: string
}

withDefaults(defineProps<AppSelectProps>(), {
  modelValue: '',
  id: () => `select-${Math.random().toString(36).substring(2, 9)}`,
  disabled: false
})

defineEmits<{
  (e: 'update:modelValue', value: string | number): void
}>()

const attrs = useAttrs()
const selectAttrs = computed(() => {
  const { class: _, ...rest } = attrs
  return rest
})

const selectRef = ref<HTMLSelectElement | null>(null)

defineExpose({
  focus: () => selectRef.value?.focus()
})
</script>

<script lang="ts">
export default {
  inheritAttrs: false
}
</script>
