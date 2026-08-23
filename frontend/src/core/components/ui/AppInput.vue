<template>
  <div class="space-y-2" :class="$attrs.class">
    <label v-if="label" :for="id" class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" :class="error ? 'text-destructive' : 'text-foreground'">
      {{ label }}
    </label>
    
    <div class="relative">
      <div v-if="$slots.prefix" class="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
        <slot name="prefix" />
      </div>
      
      <input
        :id="id"
        ref="inputRef"
        :type="type"
        :value="modelValue"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        :disabled="disabled"
        :class="[
          'flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50',
          error ? 'border-destructive focus-visible:ring-destructive' : 'border-input focus-visible:ring-ring',
          $slots.prefix ? 'pl-9' : '',
          $slots.suffix ? 'pr-9' : '',
          inputClass
        ]"
        v-bind="inputAttrs"
      />
      
      <div v-if="$slots.suffix" class="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
        <slot name="suffix" />
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

export interface AppInputProps {
  modelValue?: string | number
  id?: string
  label?: string
  type?: string
  error?: string
  hint?: string
  disabled?: boolean
  inputClass?: string
}

withDefaults(defineProps<AppInputProps>(), {
  modelValue: '',
  id: () => `input-${Math.random().toString(36).substring(2, 9)}`,
  type: 'text',
  disabled: false
})

defineEmits<{
  (e: 'update:modelValue', value: string | number): void
}>()

const attrs = useAttrs()
const inputAttrs = computed(() => {
  const { class: _, ...rest } = attrs
  return rest
})

const inputRef = ref<HTMLInputElement | null>(null)

defineExpose({
  focus: () => inputRef.value?.focus()
})
</script>

<script lang="ts">
export default {
  inheritAttrs: false
}
</script>
